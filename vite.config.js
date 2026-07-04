import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        courses: resolve(__dirname, 'courses/index.html'),
        about: resolve(__dirname, 'about-us/index.html'),
        advanced_trading: resolve(__dirname, 'courses/advanced-trading-course/index.html'),
        contact: resolve(__dirname, 'contact-us/index.html'),
        trading_skills: resolve(__dirname, 'courses/trading-skills-course/index.html'),
        intro_markets: resolve(__dirname, 'courses/introduction-to-financial-markets/index.html'),
        options_trading: resolve(__dirname, 'courses/options-trading-course/index.html'),
        futures_techniques: resolve(__dirname, 'courses/futures-trading-techniques/index.html'),
        equity_wealth: resolve(__dirname, 'courses/equity-investing-and-wealth/index.html'),
        psychology_workshop: resolve(__dirname, 'courses/trading-psychology-workshop/index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        checkout: resolve(__dirname, 'checkout/index.html'),
        resources: resolve(__dirname, 'resources/index.html'),
        events: resolve(__dirname, 'events/index.html'),
        quant_strategy: resolve(__dirname, 'courses/quantitative-trading-and-algorithmic-strategy/index.html'),
        crypto_portfolio: resolve(__dirname, 'courses/crypto-asset-class-portfolio-management/index.html'),
      }
    }
  }
});
