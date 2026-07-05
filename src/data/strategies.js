/**
 * Pheunkarm Institute Strategy Data Layer
 */

export const STRATEGIES = [
  {
    slug: "pmor-breakout",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "PMOR Breakout Model",
    subtitle: "Pheunkarm’s flagship pre-market opening range model for structured index trading.",
    status: ["Flagship Strategy", "Preferred Model", "Tracked", "Index Strategy"],
    style: "Breakout",
    preferredAssets: ["DAX / GER40", "FTSE 100 / UK100", "S&P 500 / US500"],
    supportedAssets: [],
    timeframes: ["5m primary", "15m and 1H context"],
    tradingWindows: ["02:50–08:00 New York time"],
    difficulty: "Intermediate",
    isFlagship: true,
    isPreferred: true,
    isTopPerforming: true,
    summary: "The PMOR Breakout Model studies whether pre-market compression creates a tradable expansion opportunity once price breaks beyond the defined range.",
    thesis: "The PMOR Breakout Model is built on the idea that pre-market price action creates a measurable range of liquidity, volatility compression, and directional tension before the main trading window. When price breaks beyond that range under defined conditions, the model seeks to capture controlled expansion while using the internal range structure to define risk.",
    marketBehavior: "Index markets often compress before major session opens, leading to aggressive expansion once institutional volume enters.",
    stepByStepProcess: [
      "Define PMOR range",
      "Measure range size",
      "Apply market filters",
      "Set breakout trigger",
      "Define stop placement",
      "Define target",
      "Apply timed exit",
      "Record result"
    ],
    buySetup: [
      "PMOR session completes.",
      "PMOR range size passes the model filter.",
      "Price enters the trade window.",
      "Buy trigger is placed above PMOR High plus the market buffer.",
      "If price breaks upward and fills the long trigger, the short trigger is cancelled.",
      "Stop is placed using the quarter-level stop structure.",
      "Target is calculated at 2R from entry.",
      "If neither target nor stop is reached within the time limit, the trade exits at timed close."
    ],
    sellSetup: [
      "PMOR session completes.",
      "PMOR range size passes the model filter.",
      "Price enters the trade window.",
      "Sell trigger is placed below PMOR Low minus the market buffer.",
      "If price breaks downward and fills the short trigger, the long trigger is cancelled.",
      "Stop is placed using the quarter-level stop structure.",
      "Target is calculated at 2R from entry.",
      "If neither target nor stop is reached within the time limit, the trade exits at timed close."
    ],
    noTradeConditions: [
      "A no-trade day is valid and must be recorded. The model does not trade when the PMOR range fails the size filter, when no breakout trigger is reached inside the trade window, when price action is abnormal, when spread conditions are unacceptable, or when the setup is marked for manual review."
    ],
    newsHandling: [
      "The baseline PMOR model is mechanical and does not attempt to predict news outcomes. Admins must mark whether the day contained major news. News days can be filtered in analytics to compare performance between normal days and catalyst days."
    ],
    riskModel: ["Quarter-level range stop logic", "Fixed 2R target"],
    bestFor: ["Trending days", "High volume open"],
    notIdealFor: ["Choppy markets", "Bank holidays"]
  },
  {
    slug: "liquidity-sweep-reversal",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Liquidity Sweep Reversal Model",
    subtitle: "Reversal modeling based on structural sweeps.",
    status: ["Research Model"],
    style: "Reversal",
    preferredAssets: ["Gold / XAUUSD", "DAX / GER40", "FTSE 100", "S&P 500", "Major FX pairs"],
    supportedAssets: [],
    timeframes: ["1H map", "15m setup", "5m execution", "1m refinement only after setup exists"],
    tradingWindows: [],
    difficulty: "Advanced",
    summary: "Waits for obvious liquidity levels to be swept before entering reversals.",
    thesis: "Markets often move beyond obvious highs or lows to trigger liquidity before reversing. This model waits for the sweep to happen first, then requires a reclaim and displacement before considering entry. It does not enter before liquidity has been taken.",
    marketBehavior: "Retail stop hunting and institutional accumulation/distribution at key structural extremes.",
    stepByStepProcess: [],
    buySetup: [
      "1. Mark an obvious liquidity low: previous day low, Asian low, London low, session low, or equal lows.",
      "2. Price trades below the liquidity low.",
      "3. Price closes back above the swept level.",
      "4. Bullish displacement appears.",
      "5. Optional bullish FVG forms.",
      "6. Price retraces into the execution zone.",
      "7. Enter long.",
      "8. Stop goes below the sweep low.",
      "9. Target is next liquidity above or fixed R."
    ],
    sellSetup: [
      "1. Mark an obvious liquidity high: previous day high, Asian high, London high, session high, or equal highs.",
      "2. Price trades above the liquidity high.",
      "3. Price closes back below the swept level.",
      "4. Bearish displacement appears.",
      "5. Optional bearish FVG forms.",
      "6. Price retraces into the execution zone.",
      "7. Enter short.",
      "8. Stop goes above the sweep high.",
      "9. Target is next liquidity below or fixed R."
    ],
    noTradeConditions: [
      "No obvious liquidity level.",
      "Price is in the middle of the range.",
      "Sweep happens but no reclaim.",
      "Reclaim happens but no displacement.",
      "FVG is too far from price.",
      "Reward-to-risk is below minimum.",
      "Spread is abnormal.",
      "Trader missed the entry and would have to chase."
    ],
    newsHandling: [
      "Do not enter directly into major news. On news days, wait until the first volatility spike completes. Require reclaim and displacement after the spike."
    ],
    riskModel: ["Stop beyond sweep extreme", "Target next opposing liquidity"],
    bestFor: ["Ranging markets", "High volatility"],
    notIdealFor: ["Strong one-way trends"]
  },
  {
    slug: "gold-liquidity-raid-fvg",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Gold Liquidity Raid FVG Model",
    subtitle: "Advanced reversal model specifically tuned for XAUUSD.",
    status: ["Research Model", "Advanced Model"],
    style: "Reversal",
    preferredAssets: ["XAUUSD", "Gold futures later"],
    supportedAssets: [],
    timeframes: ["4H major liquidity", "1H daily map", "15m setup", "5m execution", "1m refinement only after 5m zone exists"],
    tradingWindows: [],
    difficulty: "Advanced",
    summary: "Gold specific liquidity raid into Fair Value Gap (FVG) entries.",
    thesis: "Gold is a liquidity raid and macro repricing market. The model waits for Gold to raid a major intraday or previous-day level, reclaim the level, displace away from the raid, create an imbalance, and return into that imbalance for controlled entry.",
    marketBehavior: "Aggressive stops sweeps characteristic of precious metals.",
    stepByStepProcess: [],
    buySetup: [
      "1. Mark Asian Low, London Low, Previous Day Low, Daily Open, and obvious equal lows.",
      "2. Price sweeps one of those lows.",
      "3. Price closes back above the swept level.",
      "4. Bullish displacement breaks short-term structure.",
      "5. Bullish FVG forms.",
      "6. Price retraces into the FVG.",
      "7. Enter long from FVG midpoint or boundary.",
      "8. Stop goes below the sweep low.",
      "9. Target next liquidity high or 2R."
    ],
    sellSetup: [
      "1. Mark Asian High, London High, Previous Day High, Daily Open, and obvious equal highs.",
      "2. Price sweeps one of those highs.",
      "3. Price closes back below the swept level.",
      "4. Bearish displacement breaks short-term structure.",
      "5. Bearish FVG forms.",
      "6. Price retraces into the FVG.",
      "7. Enter short from FVG midpoint or boundary.",
      "8. Stop goes above the sweep high.",
      "9. Target next liquidity low or 2R."
    ],
    noTradeConditions: [
      "Gold is in the middle of the range.",
      "No sweep of meaningful liquidity.",
      "Sweep occurs but price does not reclaim.",
      "Displacement is weak.",
      "FVG is unclear or too wide.",
      "Stop would be too large.",
      "Spread is wide.",
      "News is imminent.",
      "One valid trade has already been taken."
    ],
    newsHandling: [
      "Gold is highly sensitive to CPI, NFP, FOMC, PPI, Fed speeches, dollar shocks, yield shocks, and geopolitical shocks. Do not trade the first news candle. Wait for the news spike, then wait for displacement and FVG return."
    ],
    riskModel: [
      "Risk per trade: 0.25% to 0.50%.",
      "Maximum trades per day: 1.",
      "Maximum daily loss: 0.75% to 1%.",
      "No adding to losers.",
      "No revenge trades."
    ],
    bestFor: ["Precious metals", "High liquidity days"],
    notIdealFor: ["Low volume holiday trading"]
  },
  {
    slug: "session-raid-continuation",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Session Raid Continuation Model",
    subtitle: "New York continuation after London sweeps.",
    status: ["Research Model"],
    style: "Continuation",
    preferredAssets: ["Gold", "DAX", "FTSE 100", "S&P 500", "Major FX pairs"],
    supportedAssets: [],
    timeframes: ["1H context", "15m session structure", "5m entry"],
    tradingWindows: [],
    difficulty: "Intermediate",
    summary: "Trades New York session continuation of London's established trend post-raid.",
    thesis: "Sometimes London or an earlier session reveals the real directional intent before New York opens. Instead of fading every sweep, this model studies whether New York continues the direction already established by the prior session after a controlled pullback.",
    marketBehavior: "Inter-session liquidity cycles where London establishes the daily trend.",
    stepByStepProcess: [],
    buySetup: [
      "1. Asian session forms a range.",
      "2. London sweeps Asian Low.",
      "3. London displaces upward.",
      "4. A bullish FVG or pullback zone forms.",
      "5. New York pulls back into that zone.",
      "6. Price holds above the prior displacement low.",
      "7. Enter long.",
      "8. Stop goes below the pullback or London sweep low.",
      "9. Target London High, Previous Day High, or 2R."
    ],
    sellSetup: [
      "1. Asian session forms a range.",
      "2. London sweeps Asian High.",
      "3. London displaces downward.",
      "4. A bearish FVG or pullback zone forms.",
      "5. New York pulls back into that zone.",
      "6. Price holds below the prior displacement high.",
      "7. Enter short.",
      "8. Stop goes above the pullback or London sweep high.",
      "9. Target London Low, Previous Day Low, or 2R."
    ],
    noTradeConditions: [
      "London is choppy.",
      "London does not sweep Asian liquidity.",
      "London displacement is unclear.",
      "New York opens in the middle of the range.",
      "Pullback does not reach the execution zone.",
      "Reward-to-risk is poor.",
      "Major news is too close."
    ],
    newsHandling: [
      "If major US news occurs inside the New York window, pause the model until the first news reaction has completed."
    ],
    riskModel: ["Stop beyond pullback structure", "Target 2R"],
    bestFor: ["Trending days initiated in London"],
    notIdealFor: ["Range bound days across all sessions"]
  },
  {
    slug: "macro-displacement",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Macro Displacement Model",
    subtitle: "Trading the post-news directional bias.",
    status: ["Advanced Model", "Research Model"],
    style: "Macro",
    preferredAssets: ["Gold", "S&P 500", "NASDAQ", "DAX", "EURUSD", "GBPUSD", "USDJPY"],
    supportedAssets: [],
    timeframes: ["1H macro context", "15m reaction", "5m execution"],
    tradingWindows: [],
    difficulty: "Advanced",
    summary: "Filters out news event volatility to catch the secondary, true macro-driven trend.",
    thesis: "Major economic events often create accumulation before the release, manipulation during the first spike, and distribution after the market chooses direction. This model avoids the first candle and waits for post-news displacement before entry.",
    marketBehavior: "Manipulation algorithms seeking liquidity on news release before institutional repositioning.",
    stepByStepProcess: [],
    buySetup: [
      "1. Identify scheduled catalyst: CPI, NFP, FOMC, PPI, GDP, central bank speech, or major policy event.",
      "2. Do not enter before the release.",
      "3. Do not trade the first spike.",
      "4. Wait for price to sweep downside liquidity.",
      "5. Wait for bullish displacement after the spike.",
      "6. Mark the post-news bullish FVG or pullback zone.",
      "7. Enter long on retracement.",
      "8. Stop below the news spike low.",
      "9. Target 2R or next liquidity above."
    ],
    sellSetup: [
      "1. Identify scheduled catalyst.",
      "2. Do not enter before the release.",
      "3. Do not trade the first spike.",
      "4. Wait for price to sweep upside liquidity.",
      "5. Wait for bearish displacement after the spike.",
      "6. Mark the post-news bearish FVG or pullback zone.",
      "7. Enter short on retracement.",
      "8. Stop above the news spike high.",
      "9. Target 2R or next liquidity below."
    ],
    noTradeConditions: [
      "News reaction is two-sided and chaotic.",
      "Spread widens abnormally.",
      "No clear displacement after the spike.",
      "Price does not retrace.",
      "Stop distance is too wide.",
      "Direction is unclear after 15–30 minutes."
    ],
    newsHandling: [
      "This model is only active on catalyst days. It must include a news flag and event name in the trade log."
    ],
    riskModel: ["Reduced sizing", "Stop beyond news wick extreme"],
    bestFor: ["High impact macro events (CPI, FOMC, NFP)"],
    notIdealFor: ["Low impact news", "Quiet market days"]
  },
  {
    slug: "correlated-market-divergence",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Correlated Market Divergence Model",
    subtitle: "Using intermarket relationships to filter fakeouts.",
    status: ["Advanced Model", "Educational Framework"],
    style: "Divergence",
    preferredAssets: ["NASDAQ vs S&P 500", "DAX vs FTSE 100", "Dow vs S&P 500", "Gold vs DXY or yields", "BTC vs ETH"],
    supportedAssets: [],
    timeframes: ["1H context", "15m divergence", "5m execution"],
    tradingWindows: [],
    difficulty: "Advanced",
    summary: "Capitalizes on structural disagreements between highly correlated markets.",
    thesis: "Correlated assets often move together. When one market sweeps liquidity but the related market fails to confirm, the divergence may reveal weakness in the move. This model uses intermarket disagreement as a filter before entering a reversal or continuation trade.",
    marketBehavior: "Intermarket latency and liquidity imbalances.",
    stepByStepProcess: [],
    buySetup: [
      "1. Select a correlated pair.",
      "2. Identify downside liquidity on the primary asset.",
      "3. Primary asset sweeps a low.",
      "4. Correlated asset does not make a matching lower low or shows relative strength.",
      "5. Primary asset reclaims the swept level.",
      "6. Bullish displacement appears.",
      "7. Enter long on retracement or confirmation.",
      "8. Stop below the sweep low.",
      "9. Target prior high, session liquidity, or 2R."
    ],
    sellSetup: [
      "1. Select a correlated pair.",
      "2. Identify upside liquidity on the primary asset.",
      "3. Primary asset sweeps a high.",
      "4. Correlated asset does not make a matching higher high or shows relative weakness.",
      "5. Primary asset reclaims downward.",
      "6. Bearish displacement appears.",
      "7. Enter short on retracement or confirmation.",
      "8. Stop above the sweep high.",
      "9. Target prior low, session liquidity, or 2R."
    ],
    noTradeConditions: [
      "Correlation is weak or broken.",
      "Both markets confirm the breakout.",
      "No liquidity sweep.",
      "No reclaim.",
      "No displacement.",
      "Markets are reacting to different catalysts.",
      "Data feed is delayed or unreliable."
    ],
    newsHandling: [
      "Use caution around major news because correlation can temporarily break. Admin should tag catalyst events and review divergence trades separately."
    ],
    riskModel: ["Standard R model"],
    bestFor: ["Highly correlated indices or forex pairs"],
    notIdealFor: ["Isolated idiosyncratic assets"]
  },
  {
    slug: "auction-balance-rotation",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Auction Balance Rotation Model",
    subtitle: "Trading value area extremes.",
    status: ["Educational Framework", "Research Model"],
    style: "Auction",
    preferredAssets: ["S&P 500", "DAX", "Gold", "Crude Oil", "Major futures", "Liquid indices"],
    supportedAssets: [],
    timeframes: ["1H market state", "30m balance structure", "5m or 15m execution"],
    tradingWindows: [],
    difficulty: "Advanced",
    summary: "Reverting from outside of value back to the midpoint.",
    thesis: "Markets alternate between balance and imbalance. When price is accepted inside a range, it often rotates between value extremes. When price fails outside balance, it can return toward the midpoint or opposite side of the range.",
    marketBehavior: "Volume profiling and market auction theory logic applied to ranged environments.",
    stepByStepProcess: [],
    buySetup: [
      "1. Identify a clear balance range.",
      "2. Price trades below the lower edge of balance.",
      "3. Breakdown fails.",
      "4. Price reclaims the lower edge.",
      "5. Bullish structure forms inside balance.",
      "6. Enter long.",
      "7. Stop below the failed breakdown low.",
      "8. Target midpoint of balance first, then upper edge."
    ],
    sellSetup: [
      "1. Identify a clear balance range.",
      "2. Price trades above the upper edge of balance.",
      "3. Breakout fails.",
      "4. Price reclaims below the upper edge.",
      "5. Bearish structure forms inside balance.",
      "6. Enter short.",
      "7. Stop above the failed breakout high.",
      "8. Target midpoint of balance first, then lower edge."
    ],
    noTradeConditions: [
      "Market is trending strongly.",
      "Balance range is unclear.",
      "Breakout is accepted outside value.",
      "Midpoint target is too close.",
      "Volume profile data is unavailable or unreliable."
    ],
    newsHandling: [
      "Avoid balance-rotation entries immediately before major news because news can convert balance into expansion."
    ],
    riskModel: ["Stop below false breakdown", "Scaling out at midpoint"],
    bestFor: ["Consolidation days", "Summer trading months"],
    notIdealFor: ["Trending environments", "High momentum periods"]
  },
  {
    slug: "opening-bell-range-breakout",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Opening Bell Range Breakout Model",
    subtitle: "Capturing the cash session expansion.",
    status: ["Research Model"],
    style: "Breakout",
    preferredAssets: ["DAX", "Dow", "FTSE 100", "S&P 500", "NASDAQ, research only"],
    supportedAssets: [],
    timeframes: ["1m to 5m execution", "15m context"],
    tradingWindows: [],
    difficulty: "Intermediate",
    summary: "Straddling the opening range for a quick directional push.",
    thesis: "The opening bell often releases trapped orders and creates short-term expansion from the pre-open range. The model marks a defined observation window before the cash/session open, then places breakout triggers at the high and low of that range.",
    marketBehavior: "Cash open liquidity rushes and index arbitrage.",
    stepByStepProcess: [],
    buySetup: [
      "1. Define the pre-open observation window.",
      "2. Mark the high and low of that window.",
      "3. Place buy trigger at range high plus buffer.",
      "4. If buy trigger is filled, cancel sell trigger.",
      "5. Stop is defined by fixed points or opposite-side logic.",
      "6. Target is fixed R, fixed points, or timed exit."
    ],
    sellSetup: [
      "1. Define the pre-open observation window.",
      "2. Mark the high and low of that window.",
      "3. Place sell trigger at range low minus buffer.",
      "4. If sell trigger is filled, cancel buy trigger.",
      "5. Stop is defined by fixed points or opposite-side logic.",
      "6. Target is fixed R, fixed points, or timed exit."
    ],
    noTradeConditions: [
      "Range is too wide.",
      "Range is too narrow.",
      "Spread is abnormal.",
      "Both sides trigger too quickly.",
      "Price gaps through the trigger.",
      "No follow-through after open.",
      "Major news distorts the open."
    ],
    newsHandling: [
      "If the open coincides with major scheduled news, mark the day as catalyst-driven and analyze it separately."
    ],
    riskModel: ["Fixed points stop", "Mechanical 1-cancels-other"],
    bestFor: ["London and New York cash opens"],
    notIdealFor: ["Pre-holiday low volume sessions"]
  },
  {
    slug: "opening-signal-bar-expansion",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Opening Signal-Bar Expansion Model",
    subtitle: "Trading the immediate battle of the opening candle.",
    status: ["Research Model", "Intermediate"],
    style: "Breakout",
    preferredAssets: ["DAX", "Dow", "S&P 500", "FTSE 100", "NASDAQ, research only"],
    supportedAssets: [],
    timeframes: ["5m", "15m"],
    tradingWindows: [],
    difficulty: "Intermediate",
    summary: "Utilizing the very first 5m candle of the session as the entire structure.",
    thesis: "The opening session often produces a signal candle that defines a short-term battle between buyers and sellers. Instead of using the full pre-open range, this model uses a specific opening signal bar and trades expansion beyond its high or low.",
    marketBehavior: "Initial balance setting during early session auctions.",
    stepByStepProcess: [],
    buySetup: [
      "1. Wait for the defined opening signal candle to close.",
      "2. Mark the high and low of that candle.",
      "3. Place buy trigger above the signal bar high plus buffer.",
      "4. Stop goes below the signal bar low or structure low.",
      "5. Target is managed by fixed R, trailing logic, or timed exit.",
      "6. Trade only if spread and range are acceptable."
    ],
    sellSetup: [
      "1. Wait for the defined opening signal candle to close.",
      "2. Mark the high and low of that candle.",
      "3. Place sell trigger below the signal bar low minus buffer.",
      "4. Stop goes above the signal bar high or structure high.",
      "5. Target is managed by fixed R, trailing logic, or timed exit.",
      "6. Trade only if spread and range are acceptable."
    ],
    noTradeConditions: [
      "Signal candle is too large.",
      "Signal candle is too small.",
      "Signal candle has long wicks both sides.",
      "Price remains inside the signal bar.",
      "Breakout occurs too late.",
      "Spread is wide.",
      "Market is already extended before signal bar forms."
    ],
    newsHandling: [
      "If major news occurs during or immediately after the signal bar, tag the trade as news-affected or skip it."
    ],
    riskModel: ["Stop below signal bar", "Trailing target logic"],
    bestFor: ["Clean opening prints"],
    notIdealFor: ["Doji opening bars"]
  },
  {
    slug: "accumulation-distribution-volume",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Accumulation-Distribution Volume Model",
    subtitle: "Validating price action with institutional participation.",
    status: ["Educational Framework", "Advanced Model"],
    style: "Volume",
    preferredAssets: ["Stocks", "ETFs", "Index futures", "Commodity futures", "Crypto futures with reliable exchange volume"],
    supportedAssets: [],
    timeframes: ["Daily and weekly for position context", "1H and 4H for swing structure", "15m and 5m for intraday execution only if volume is reliable"],
    tradingWindows: [],
    difficulty: "Advanced",
    summary: "Trading the divergences and convergences of price against volume profiles.",
    thesis: "Price alone can mislead. Volume helps reveal whether a move is supported by institutional participation or whether the move is weak. The model studies accumulation, distribution, volume confirmation, volume exhaustion, and divergence between price and participation.",
    marketBehavior: "Institutional footprinting across structured phases.",
    stepByStepProcess: [],
    buySetup: [
      "1. Price forms a base or range after a decline.",
      "2. Down moves show reduced volume or rejection.",
      "3. Up moves begin to show stronger volume.",
      "4. Price reclaims the range midpoint or breaks the accumulation range high.",
      "5. Breakout occurs with volume above average.",
      "6. Enter long on breakout confirmation or pullback retest.",
      "7. Stop goes below the accumulation range or failed breakout low.",
      "8. Target next resistance, measured move, or fixed R."
    ],
    sellSetup: [
      "1. Price forms a topping range after an advance.",
      "2. Up moves show weak volume or rejection.",
      "3. Down moves begin to show stronger volume.",
      "4. Price loses the range midpoint or breaks the distribution range low.",
      "5. Breakdown occurs with volume above average.",
      "6. Enter short on breakdown confirmation or pullback retest.",
      "7. Stop goes above the distribution range or failed breakdown high.",
      "8. Target next support, measured move, or fixed R."
    ],
    noTradeConditions: [
      "Volume data is unreliable.",
      "Price is moving but volume is not confirming.",
      "No clear base or distribution range.",
      "Breakout occurs on weak volume.",
      "Volume spike is caused by known one-off event.",
      "Reward-to-risk is poor."
    ],
    newsHandling: [
      "Earnings, central bank decisions, ETF flows, and macro shocks can distort volume. Mark these days separately."
    ],
    riskModel: ["Standard R model", "Volume invalidation exits"],
    bestFor: ["Centralized exchange assets"],
    notIdealFor: ["Spot forex", "CFD-only symbols with unreliable volume"]
  },
  {
    slug: "defined-risk-options-momentum",
    media: { screenshotUrl: "", videoWalkthroughUrl: "" },
    title: "Defined-Risk Options Momentum Model",
    subtitle: "Trading underlying structure via derivative leverage.",
    status: ["Advanced Model", "Educational Framework"],
    style: "Options",
    preferredAssets: ["SPY options", "QQQ options", "Highly liquid mega-cap stock options", "Index options for advanced users"],
    supportedAssets: [],
    timeframes: ["Daily context", "1H market structure", "15m setup", "5m execution"],
    tradingWindows: [],
    difficulty: "Advanced",
    summary: "Translating clean price action setups into asymmetric options plays.",
    thesis: "This model treats options as a defined-risk expression of an underlying price-action thesis. The edge is not in buying random calls or puts. The edge is in combining clean underlying momentum, key levels, strict contract selection, fixed risk, and post-trade journaling.",
    marketBehavior: "Delta expansion during high momentum bursts.",
    stepByStepProcess: [],
    buySetup: [
      "1. Underlying asset has bullish market structure.",
      "2. Price is above VWAP or key session level.",
      "3. Market index context supports upside.",
      "4. Price breaks or reclaims a key level with momentum.",
      "5. Select liquid call contract with tight spread and acceptable delta.",
      "6. Define maximum premium risk before entry.",
      "7. Enter only after confirmation.",
      "8. Stop is based on underlying invalidation, not emotion.",
      "9. Target is fixed R, premium expansion, or underlying target."
    ],
    sellSetup: [
      "1. Underlying asset has bearish market structure.",
      "2. Price is below VWAP or key session level.",
      "3. Market index context supports downside.",
      "4. Price breaks or rejects a key level with momentum.",
      "5. Select liquid put contract with tight spread and acceptable delta.",
      "6. Define maximum premium risk before entry.",
      "7. Enter only after confirmation.",
      "8. Stop is based on underlying invalidation.",
      "9. Target is fixed R, premium expansion, or underlying target."
    ],
    noTradeConditions: [
      "Option spread is too wide.",
      "Volume/open interest is too low.",
      "Implied volatility is too inflated.",
      "Underlying price is in the middle of the range.",
      "No clean catalyst or momentum.",
      "Contract selection is unclear.",
      "Trader cannot define risk before entry."
    ],
    newsHandling: [
      "Avoid holding short-dated options through earnings or major macro events unless the model is specifically built for event volatility. For educational use, tag all options trades with event exposure, expiration date, premium risk, and planned R."
    ],
    riskModel: ["Fixed premium risk", "Underlying structure stops"],
    bestFor: ["High liquidity mega-caps (AAPL, TSLA, SPY)"],
    notIdealFor: ["Illiquid options", "Pre-earnings IV crush scenarios"]
  }
];
