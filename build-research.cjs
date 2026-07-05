const fs = require('fs');
const indexContent = fs.readFileSync('index.html', 'utf8');

// Find end of header (</header>)
const headerEndIdx = indexContent.indexOf('</header>') + 9;
const headerContent = indexContent.substring(0, headerEndIdx);

// Find start of footer (<footer class="footer")
const footerStartIdx = indexContent.indexOf('<footer class="footer"');
if (footerStartIdx === -1) {
    console.error("Footer not found!");
    process.exit(1);
}
const footerContent = indexContent.substring(footerStartIdx);

// Make sure path references are absolute since we are in /market-research/
let newHeader = headerContent.replace(/href="\.\/style\.css"/g, 'href="/style.css"');
let newFooter = footerContent.replace(/src="\.\/main\.js"/g, 'src="/main.js"');

const hubContent = `
  <!-- ==========================================
       MARKET RESEARCH HUB HERO
       ========================================== -->
  <section class="hero" style="background: #0b0f19; padding: 10rem 0 5rem 0; text-align: center; color: white;">
    <div class="container">
      <h1 style="color: var(--color-cta); margin-bottom: 1rem; font-size: 3rem; text-transform: uppercase; letter-spacing: 2px;">Market Research & Insights</h1>
      <p style="color: rgba(255,255,255,0.8); max-width: 700px; margin: 0 auto 2rem auto; font-size: 1.2rem;">Institutional analysis, daily breakdowns, live execution logs, and macro podcast discussions.</p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="#daily-insights" class="btn btn-cta">Daily Insights</a>
        <a href="#podcasts" class="btn" style="border: 1px solid var(--color-cta); color: var(--color-cta);">Macro Podcasts</a>
        <a href="#trade-logs" class="btn" style="border: 1px solid rgba(255,255,255,0.5); color: white;">Live Trade Logs</a>
      </div>
    </div>
  </section>

  <!-- ==========================================
       DAILY INSIGHTS
       ========================================== -->
  <section id="daily-insights" class="section" style="background-color: var(--color-light);">
    <div class="container">
      <div class="section-header">
        <h2 style="color: var(--color-primary);">Daily Institutional Insights</h2>
        <p style="color: var(--color-text-main);">Technical and fundamental breakdowns of order flow across indices and FX.</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <!-- Card 1 -->
        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--color-border);">
          <div style="height: 200px; background: #0b0f19; display: flex; align-items: center; justify-content: center;">
             <i class="fa-solid fa-chart-candlestick" style="font-size: 4rem; color: rgba(255,255,255,0.1);"></i>
          </div>
          <div style="padding: 1.5rem;">
            <span style="font-size: 0.8rem; color: var(--color-cta); font-weight: bold; text-transform: uppercase;">Technical Analysis</span>
            <h3 style="margin: 0.5rem 0; color: var(--color-primary);">EUR/USD Liquidity Sweep Analysis</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1rem;">A breakdown of how the London session engineered a buy-side raid before the major NY reversal.</p>
            <a href="#" style="color: #0b9bd9; text-decoration: none; font-weight: bold;">Read Breakdown &rarr;</a>
          </div>
        </div>
        <!-- Card 2 -->
        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--color-border);">
          <div style="height: 200px; background: #0b0f19; display: flex; align-items: center; justify-content: center;">
             <i class="fa-solid fa-globe" style="font-size: 4rem; color: rgba(255,255,255,0.1);"></i>
          </div>
          <div style="padding: 1.5rem;">
            <span style="font-size: 0.8rem; color: var(--color-cta); font-weight: bold; text-transform: uppercase;">Macro</span>
            <h3 style="margin: 0.5rem 0; color: var(--color-primary);">CPI Print Expectations</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1rem;">Preparing for Thursday's inflation data and mapping the potential S&P 500 reaction zones.</p>
            <a href="#" style="color: #0b9bd9; text-decoration: none; font-weight: bold;">Read Breakdown &rarr;</a>
          </div>
        </div>
        <!-- Card 3 -->
        <div style="background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid var(--color-border);">
          <div style="height: 200px; background: #0b0f19; display: flex; align-items: center; justify-content: center;">
             <i class="fa-solid fa-bolt" style="font-size: 4rem; color: rgba(255,255,255,0.1);"></i>
          </div>
          <div style="padding: 1.5rem;">
            <span style="font-size: 0.8rem; color: var(--color-cta); font-weight: bold; text-transform: uppercase;">Execution</span>
            <h3 style="margin: 0.5rem 0; color: var(--color-primary);">DAX PMOR Expansion</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1rem;">Reviewing yesterday's textbook PMOR expansion on the German 40 index.</p>
            <a href="#" style="color: #0b9bd9; text-decoration: none; font-weight: bold;">Read Breakdown &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================
       PODCASTS & VIDEO RECAPS
       ========================================== -->
  <section id="podcasts" class="section" style="background-color: var(--color-white); border-top: 1px solid var(--color-border);">
    <div class="container">
      <div class="section-header text-center">
        <h2 style="color: var(--color-primary);">Macro Podcasts & Video Recaps</h2>
        <p style="color: var(--color-text-main);">Watch our latest YouTube discussions covering structural bias and trade psychology.</p>
      </div>
      
      <!-- Featured Video -->
      <div style="max-width: 900px; margin: 0 auto 3rem auto;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; box-shadow: 0 15px 35px rgba(0,0,0,0.1); border: 4px solid #0b0f19;">
          <!-- Placeholder for YouTube embed -->
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #0b0f19; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white;">
            <i class="fa-brands fa-youtube" style="font-size: 4rem; color: #ff0000; margin-bottom: 1rem;"></i>
            <h3 style="color: white; margin-bottom: 0.5rem;">The Institutional Shift - Episode 12</h3>
            <p style="color: rgba(255,255,255,0.6);">[YouTube Embed Placeholder]</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================
       LIVE TRADE LOGS
       ========================================== -->
  <section id="trade-logs" class="section" style="background-color: #0b0f19; color: white;">
    <div class="container">
      <div class="section-header text-center">
        <h2 style="color: white;">Live Institutional Trade Logs</h2>
        <p style="color: rgba(255,255,255,0.7);">Recent executions from our top analysts and PMOR algorithms.</p>
      </div>
      <div style="max-width: 1000px; margin: 0 auto; overflow-x: auto; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead style="background: rgba(0,0,0,0.5);">
            <tr>
              <th style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--color-cta);">Date</th>
              <th style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--color-cta);">Asset</th>
              <th style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--color-cta);">Model</th>
              <th style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--color-cta);">Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">July 5, 2026</td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);"><strong>US500</strong></td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">PMOR Breakout</td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: #10b981;">+2.00 R</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">July 4, 2026</td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);"><strong>XAUUSD</strong></td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">Liquidity Sweep</td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: #10b981;">+3.15 R</td>
            </tr>
            <tr>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">July 3, 2026</td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);"><strong>GER40</strong></td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">PMOR Breakout</td>
              <td style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: #ef4444;">-1.00 R</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="text-align: center; margin-top: 2rem;">
        <a href="/strategies/pmor-breakout/" class="btn" style="border: 1px solid rgba(255,255,255,0.2); color: white;">View Full Strategy Dashboard</a>
      </div>
    </div>
  </section>
`;

fs.writeFileSync('market-research/index.html', newHeader + hubContent + '\n' + newFooter);
console.log('Fixed market-research/index.html');
