import { STRATEGIES } from '/src/data/strategies.js';
import { getPublishedEntries, calculateStats } from '/src/data/performance.js';

/**
 * Main function to render a strategy detail page.
 * @param {string} slug - The strategy slug (e.g., 'pmor-breakout')
 */
export async function renderStrategyPage(slug) {
  const strategy = STRATEGIES.find(s => s.slug === slug);
  if (!strategy) {
    document.getElementById('strategy-root').innerHTML = `
      <div class="container" style="padding: 10rem 0; text-align: center;">
        <h2>Strategy not found.</h2>
        <a href="/strategies/" class="btn btn-cta" style="margin-top: 1rem;">Return to Library</a>
      </div>
    `;
    return;
  }

  // 1. Fetch shared header/footer from index.html (Simple Vanilla MPA approach)
  await injectSharedLayout();

  // 2. Build Core Strategy HTML
  let html = buildHeroSection(strategy);
  html += buildPhilosophyAndCore(strategy);
  html += buildRulesSection(strategy);
  
  // 3. If PMOR, append Performance Dashboard
  if (slug === 'pmor-breakout') {
    html += buildPMORDashboard();
  }

  // 4. Append Disclaimer
  html += `
    <section class="section" style="background-color: var(--color-light); border-top: 1px solid var(--color-border);">
      <div class="container">
        <div style="font-size: 0.85rem; color: var(--color-text-muted); text-align: center; max-width: 800px; margin: 0 auto; line-height: 1.6;">
          <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.25rem; color: #ffc107; margin-bottom: 0.5rem; display: block;"></i>
          ${slug.includes('options') 
            ? 'Options involve substantial risk and may result in the loss of the entire premium paid. This page is educational and does not recommend any contract, strike, expiry, or position.'
            : 'This framework is presented for education and research. It is not a signal service or financial advice. Trading involves substantial risk. Actual results may differ because of spread, slippage, broker pricing, execution speed, liquidity, market conditions, and individual risk management. Past performance does not guarantee future results.'
          }
        </div>
      </div>
    </section>
  `;

  document.getElementById('strategy-root').innerHTML = html;

  // 5. Initialize PMOR specific scripts (Charts, Data loading)
  if (slug === 'pmor-breakout') {
    await initPMORTracker(slug);
  }
}

// ------------------------------------------------------------------
// COMPONENT BUILDERS
// ------------------------------------------------------------------

function buildHeroSection(strategy) {
  const isFlagship = strategy.isFlagship;
  let badgesHtml = strategy.status.map(status => {
    let badgeClass = 's-badge';
    if(status === 'Flagship Strategy') badgeClass += ' flagship';
    if(status === 'Tracked') badgeClass += ' tracked';
    return `<span class="${badgeClass}">${status}</span>`;
  }).join('');

  return `
    <style>
      .strategy-hero {
        background-color: var(--color-primary);
        color: var(--color-white);
        padding: 6rem 0 4rem;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
      .strategy-hero h1 { font-size: 2.5rem; margin-bottom: 1rem; color: var(--color-white); }
      .strategy-hero p.lead { font-size: 1.15rem; color: rgba(255,255,255,0.7); max-width: 800px; line-height: 1.6; margin-bottom: 2rem; }
      
      .s-badge {
        font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 4px;
        text-transform: uppercase; letter-spacing: 0.5px; background: rgba(255,255,255,0.1); color: #fff;
      }
      .s-badge.flagship { background-color: var(--color-cta); color: var(--color-white); }
      .s-badge.tracked { background-color: var(--color-primary); color: var(--color-white); }
      
      .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; }
      .meta-item h4 { font-size: 0.8rem; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 0.5rem; letter-spacing: 1px; }
      .meta-item p { font-size: 1rem; font-weight: 600; color: #fff; }
    </style>
    <section class="strategy-hero">
      <div class="container">
        <a href="/strategies/" style="color: rgba(255,255,255,0.5); text-decoration: none; font-size: 0.85rem; margin-bottom: 1.5rem; display: inline-block;"><i class="fa-solid fa-arrow-left"></i> Back to Library</a>
        
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          ${badgesHtml}
        </div>
        
        <h1>${strategy.title}</h1>
        <p class="lead">${strategy.subtitle}</p>
        
        <div class="meta-grid">
          <div class="meta-item">
            <h4>Style</h4>
            <p>${strategy.style}</p>
          </div>
          <div class="meta-item">
            <h4>Primary Timeframes</h4>
            <p>${strategy.timeframes.join(', ')}</p>
          </div>
          <div class="meta-item">
            <h4>Best Assets</h4>
            <p>${strategy.preferredAssets.join('<br>')}</p>
          </div>
          <div class="meta-item">
            <h4>Difficulty</h4>
            <p>${strategy.difficulty}</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildPhilosophyAndCore(strategy) {
  let stepsHtml = '';
  if (strategy.stepByStepProcess && strategy.stepByStepProcess.length > 0) {
    stepsHtml = `
      <div style="margin-top: 3rem; background: var(--color-white); padding: 2rem; border-radius: 8px; border: 1px solid var(--color-border); box-shadow: 0 4px 10px rgba(0,0,0,0.01);">
        <h3 style="color: var(--color-primary); margin-bottom: 1.5rem;">Core Sequence</h3>
        <ol style="margin-left: 1.5rem; line-height: 1.8; color: var(--color-text-main); font-weight: 600;">
          ${strategy.stepByStepProcess.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    `;
  }

  return `
    <section class="section" style="background-color: var(--color-light);">
      <div class="container">
        <div class="grid-2-col" style="--grid-cols: 1.5fr 1fr; gap: 3rem; align-items: start;">
          <div>
            <h2 style="color: var(--color-primary); margin-bottom: 1rem;">Strategy Thesis</h2>
            <p style="font-size: 1.1rem; line-height: 1.7; color: var(--color-text-main); margin-bottom: 2rem;">
              ${strategy.thesis}
            </p>
            
            <h3 style="color: var(--color-primary); margin-bottom: 0.75rem; font-size: 1.25rem;">Market Behavior Targeted</h3>
            <p style="line-height: 1.7; color: var(--color-text-main);">
              ${strategy.marketBehavior}
            </p>
            
            ${stepsHtml}
          </div>
          
          <div>
            <div style="background-color: var(--color-white); padding: 2rem; border-radius: 8px; border: 1px solid var(--color-border); margin-bottom: 1.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.01);">
              <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;"><i class="fa-solid fa-shield-halved"></i> Risk Model</h4>
              <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.6; color: var(--color-text-main);">
                ${strategy.riskModel.map(r => `<li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem;"><i class="fa-solid fa-check" style="color: var(--color-status-success); margin-top: 0.25rem;"></i> <span>${r}</span></li>`).join('')}
              </ul>
            </div>
            
            <div style="background-color: var(--color-white); padding: 2rem; border-radius: 8px; border: 1px solid var(--color-border); box-shadow: 0 4px 10px rgba(0,0,0,0.01);">
              <h4 style="color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;"><i class="fa-solid fa-newspaper"></i> News Handling</h4>
              <p style="font-size: 0.9rem; line-height: 1.6; color: var(--color-text-main);">
                ${strategy.newsHandling.join(' ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildRulesSection(strategy) {
  const buildList = (arr) => arr.map(item => `<li style="margin-bottom: 0.75rem;">${item}</li>`).join('');
  
  return `
    <section class="section" style="background-color: var(--color-white);">
      <div class="container">
        <div class="section-header">
          <h2 style="color: var(--color-primary);">Execution Framework</h2>
          <p style="color: var(--color-text-main);">Mechanical rules mapping out valid setups and invalidation criteria.</p>
        </div>
        
        <div class="grid-2-col" style="--grid-cols: 1fr 1fr; gap: 2rem; align-items: stretch;">
          <div style="background: rgba(25, 135, 84, 0.03); border: 1px solid rgba(25, 135, 84, 0.2); padding: 2rem; border-radius: 8px;">
            <h3 style="color: var(--color-status-success); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-arrow-up-right-dots"></i> Buy Setup</h3>
            <ol style="margin-left: 1.25rem; color: var(--color-text-main); line-height: 1.6;">
              ${buildList(strategy.buySetup)}
            </ol>
          </div>
          
          <div style="background: rgba(220, 53, 69, 0.03); border: 1px solid rgba(220, 53, 69, 0.2); padding: 2rem; border-radius: 8px;">
            <h3 style="color: #dc3545; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-arrow-down-right-dots"></i> Sell Setup</h3>
            <ol style="margin-left: 1.25rem; color: var(--color-text-main); line-height: 1.6;">
              ${buildList(strategy.sellSetup)}
            </ol>
          </div>
        </div>
        
        <div style="background: rgba(255, 193, 7, 0.05); border: 1px solid rgba(255, 193, 7, 0.3); padding: 2rem; border-radius: 8px; margin-top: 2rem;">
          <h3 style="color: #b58100; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;"><i class="fa-solid fa-ban"></i> No-Trade Day Conditions</h3>
          <ul style="list-style: disc; margin-left: 1.5rem; color: var(--color-text-main); line-height: 1.6;">
            ${buildList(strategy.noTradeConditions)}
          </ul>
        </div>
      </div>
    </section>
  `;
}

function buildPMORDashboard() {
  return `
    <!-- Load Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
      .dashboard-section { background-color: #0b0f19; color: white; padding: 5rem 0; border-top: 1px solid rgba(255,255,255,0.1); }
      .dashboard-header { margin-bottom: 3rem; text-align: center; }
      .dashboard-header h2 { font-size: 2rem; color: white; margin-bottom: 0.5rem; }
      
      .stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 3rem; }
      .stat-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 1.5rem; text-align: center; }
      .stat-card h4 { font-size: 0.75rem; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 0.5rem; letter-spacing: 1px; }
      .stat-card .val { font-size: 1.8rem; font-weight: 700; color: white; }
      .stat-card .val.positive { color: #10b981; }
      .stat-card .val.negative { color: #ef4444; }
      
      .chart-container { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 1.5rem; height: 350px; }
      
      .log-table-wrapper { overflow-x: auto; margin-top: 4rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; }
      .log-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
      .log-table th { background: rgba(255,255,255,0.05); padding: 1rem; text-align: left; font-weight: 600; color: rgba(255,255,255,0.7); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; border-bottom: 1px solid rgba(255,255,255,0.1); }
      .log-table td { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); color: rgba(255,255,255,0.9); }
      .log-table tr:hover { background: rgba(255,255,255,0.02); }
      .badge { padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
      .badge.long { background: rgba(16, 185, 129, 0.2); color: #10b981; }
      .badge.short { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
      .badge.notrade { background: rgba(255, 255, 255, 0.1); color: #aaa; }
    </style>
    
    <section class="dashboard-section" id="pmor-dashboard">
      <div class="container">
        <div class="dashboard-header">
          <h2>PMOR Performance Monitor</h2>
          <p style="color: rgba(255,255,255,0.6);">Live tracked mechanical data log for the Flagship PMOR Breakout setup.</p>
        </div>
        
        <div class="stat-grid">
          <div class="stat-card"><h4>Total Trades</h4><div class="val" id="pmor-total-trades">-</div></div>
          <div class="stat-card"><h4>Win Rate</h4><div class="val" id="pmor-win-rate">-</div></div>
          <div class="stat-card"><h4>Profit Factor</h4><div class="val" id="pmor-profit-factor">-</div></div>
          <div class="stat-card"><h4>Average R</h4><div class="val" id="pmor-avg-r">-</div></div>
          <div class="stat-card"><h4>Max Drawdown</h4><div class="val negative" id="pmor-max-dd">-</div></div>
          <div class="stat-card" style="border-color: var(--color-cta);"><h4>Cumulative R</h4><div class="val positive" id="pmor-cum-r">-</div></div>
        </div>
        
        <div class="grid-2-col" style="--grid-cols: 2fr 1fr; gap: 2rem;">
          <div class="chart-container">
            <canvas id="pmorCurveChart"></canvas>
          </div>
          <div class="chart-container">
            <div style="text-align: center; color: rgba(255,255,255,0.5); padding-top: 40%; font-size: 0.9rem;">
              <i class="fa-solid fa-chart-pie" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
              Market Distribution<br>(Requires more data)
            </div>
          </div>
        </div>
        
        <div class="log-table-wrapper">
          <table class="log-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Market</th>
                <th>Direction</th>
                <th>PMOR Size</th>
                <th>Entry</th>
                <th>Exit</th>
                <th>Result R</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody id="pmor-log-body">
              <tr><td colspan="8" style="text-align:center; padding: 2rem; color: rgba(255,255,255,0.5);">Loading performance data...</td></tr>
            </tbody>
          </table>
        </div>
        
        <div style="margin-top: 3rem; background: rgba(255,255,255,0.03); padding: 2rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
          <h3 style="color: var(--color-white); margin-bottom: 1rem; font-size: 1.25rem;">How Performance Is Calculated</h3>
          <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 0.9rem;">
            Performance is tracked in <strong>R multiples</strong> so that results can be compared across markets with different point values. A +2R trade means the model achieved twice the initial risk. A -1R trade means the predefined stop was hit. Timed exits are calculated from the actual exit price at the model’s time limit. No-trade days are recorded for transparency but do not add or subtract R.
          </p>
        </div>
      </div>
    </section>
  `;
}

// ------------------------------------------------------------------
// LOGIC INITS
// ------------------------------------------------------------------

async function injectSharedLayout() {
  try {
    const res = await fetch('/');
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    const topBar = doc.querySelector('.top-bar');
    const header = doc.querySelector('.header');
    const footer = doc.querySelector('.footer');
    
    // Inject if containers exist (we'll add them to the strategy template)
    if(topBar && header) {
      const hContainer = document.getElementById('shared-header-container');
      if (hContainer) {
        hContainer.appendChild(topBar.cloneNode(true));
        hContainer.appendChild(header.cloneNode(true));
      }
    }
    if(footer) {
      const fContainer = document.getElementById('shared-footer-container');
      if (fContainer) {
        fContainer.appendChild(footer.cloneNode(true));
      }
    }
  } catch (e) {
    console.error("Failed to inject layout", e);
  }
}

async function initPMORTracker(slug) {
  // Ensure Chart.js is loaded
  if (typeof Chart === 'undefined') {
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }

  const entries = await getPublishedEntries(slug);
  const stats = calculateStats(entries);
  
  // Populate Stat Cards
  document.getElementById('pmor-total-trades').innerText = stats.totalTrades;
  document.getElementById('pmor-win-rate').innerText = stats.winRate + '%';
  document.getElementById('pmor-profit-factor').innerText = stats.profitFactor;
  document.getElementById('pmor-avg-r').innerText = stats.averageR;
  document.getElementById('pmor-max-dd').innerText = stats.maxDrawdown;
  document.getElementById('pmor-cum-r').innerText = '+' + stats.cumulativeR;
  
  // Populate Table
  const tbody = document.getElementById('pmor-log-body');
  if (entries.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem; color: rgba(255,255,255,0.5);">No performance entries published yet.</td></tr>`;
  } else {
    tbody.innerHTML = entries.map(entry => {
      let dirClass = 'notrade';
      let dirText = 'No Trade';
      if (entry.direction === 'long') { dirClass = 'long'; dirText = 'Long'; }
      if (entry.direction === 'short') { dirClass = 'short'; dirText = 'Short'; }
      
      let rText = entry.resultR ? parseFloat(entry.resultR).toFixed(2) : '0.00';
      let rColor = rText > 0 ? '#10b981' : (rText < 0 ? '#ef4444' : 'rgba(255,255,255,0.5)');
      if (rText > 0) rText = '+' + rText;
      
      return `
        <tr>
          <td>${entry.date}</td>
          <td><strong>${entry.market}</strong></td>
          <td><span class="badge ${dirClass}">${dirText}</span></td>
          <td>${entry.pmorSize || '-'}</td>
          <td>${entry.entryPrice || '-'}</td>
          <td>${entry.exitPrice || '-'}</td>
          <td style="color: ${rColor}; font-weight: 700;">${rText} R</td>
          <td><span style="font-size:0.75rem; color: rgba(255,255,255,0.6);">${entry.exitReason.replace(/_/g, ' ').toUpperCase()}</span></td>
        </tr>
      `;
    }).join('');
  }

  // Draw Chart
  const ctx = document.getElementById('pmorCurveChart');
  if (ctx && entries.length > 0) {
    // Reverse for chronological charting
    const chron = [...entries].reverse().filter(e => e.direction !== 'no_trade');
    let runningR = 0;
    const labels = chron.map(e => e.date);
    const data = chron.map(e => {
      runningR += parseFloat(e.resultR || 0);
      return runningR;
    });

    // Start at 0
    labels.unshift('Start');
    data.unshift(0);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Cumulative R',
          data: data,
          borderColor: '#0dcaf0',
          backgroundColor: 'rgba(13, 202, 240, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.1,
          pointRadius: 2,
          pointBackgroundColor: '#0dcaf0'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (ctx) => `Cumulative R: ${ctx.parsed.y.toFixed(2)}`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: 'rgba(255,255,255,0.5)' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: 'rgba(255,255,255,0.5)' }
          }
        }
      }
    });
  }
}
