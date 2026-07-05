/**
 * Pheunkarm Institute Performance Data Layer
 * Handles PMOR Strategy Performance Tracking
 * Isolated abstraction ready for Supabase migration.
 */

const STORAGE_KEY = 'pheunkarm_performance_log';

// Helper to simulate async network latency (can remove later, just to enforce async/await patterns)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all performance entries from localStorage.
 */
export async function getAllEntries() {
  await delay(100);
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error parsing performance data", e);
    return [];
  }
}

/**
 * Get only published entries (for the public PMOR page).
 */
export async function getPublishedEntries(strategySlug = 'pmor-breakout') {
  const all = await getAllEntries();
  return all.filter(entry => 
    entry.publishStatus === 'published' || 
    entry.publishStatus === 'corrected'
  ).filter(entry => entry.strategySlug === strategySlug)
   .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Add a new performance entry.
 */
export async function addEntry(entryData) {
  await delay(200);
  const entries = await getAllEntries();
  
  const newEntry = {
    ...entryData,
    id: 'trd_' + Date.now() + Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  entries.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return newEntry;
}

/**
 * Update an existing entry.
 */
export async function updateEntry(id, updates) {
  await delay(200);
  const entries = await getAllEntries();
  const index = entries.findIndex(e => e.id === id);
  
  if (index === -1) throw new Error("Entry not found");
  
  entries[index] = {
    ...entries[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return entries[index];
}

/**
 * Calculate statistics based on a set of entries.
 * Used to power the PMOR Dashboard metrics.
 */
export function calculateStats(entries) {
  let totalTrades = 0;
  let noTradeDays = 0;
  let wins = 0;
  let losses = 0;
  let cumulativeR = 0;
  let currentMonthR = 0;
  
  let grossProfit = 0;
  let grossLoss = 0;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Track max drawdown
  let peakR = 0;
  let currentDrawdown = 0;
  let maxDrawdown = 0;
  let runningR = 0;

  // Since entries are sorted descending (newest first), we should iterate backwards (oldest first) to calculate drawdown accurately.
  const chronological = [...entries].reverse();

  chronological.forEach(entry => {
    if (entry.direction === 'no_trade') {
      noTradeDays++;
    } else {
      totalTrades++;
      
      const r = parseFloat(entry.resultR) || 0;
      cumulativeR += r;
      runningR += r;

      if (r > 0) {
        wins++;
        grossProfit += r;
      } else if (r < 0) {
        losses++;
        grossLoss += Math.abs(r);
      }

      // Drawdown calc
      if (runningR > peakR) {
        peakR = runningR;
      }
      currentDrawdown = peakR - runningR;
      if (currentDrawdown > maxDrawdown) {
        maxDrawdown = currentDrawdown;
      }

      // Current month check
      const entryDate = new Date(entry.date);
      if (entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear) {
        currentMonthR += r;
      }
    }
  });

  const winRate = totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0;
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss).toFixed(2) : (grossProfit > 0 ? 'Infinite' : 0);
  const averageR = totalTrades > 0 ? (cumulativeR / totalTrades).toFixed(2) : 0;

  return {
    totalTrackedDays: entries.length,
    totalTrades,
    noTradeDays,
    winRate,
    profitFactor,
    averageR,
    cumulativeR: cumulativeR.toFixed(2),
    currentMonthR: currentMonthR.toFixed(2),
    maxDrawdown: maxDrawdown.toFixed(2)
  };
}
