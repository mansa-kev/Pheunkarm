import { whop, getCompanyId } from '../config/whop';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const COURSE_PRICES = [
  { code: 'intro', name: 'Intro to Financial Markets', price: 299, currency: 'usd' },
  { code: 'skills', name: 'Trading Skills Course', price: 999, currency: 'usd' },
  { code: 'advanced', name: 'Advanced Trading Course', price: 2499, currency: 'usd' },
  { code: 'quant', name: 'Quantitative Trading & Algorithmic Strategy', price: 999, currency: 'usd' },
  { code: 'options', name: 'Options Trading Course', price: 499, currency: 'usd' },
  { code: 'futures', name: 'Futures Trading Techniques', price: 499, currency: 'usd' },
  { code: 'equity', name: 'Equity Investing & Wealth', price: 499, currency: 'usd' },
  { code: 'psychology', name: 'Trading Psychology Workshop', price: 299, currency: 'usd' },
  { code: 'crypto', name: 'Crypto Asset Portfolio Management', price: 499, currency: 'usd' },
  // New EUR Plans
  { code: 'eur-100', name: 'Basic Financial Literacy', price: 100, currency: 'eur' },
  { code: 'eur-150', name: 'Introduction to Technical Analysis', price: 150, currency: 'eur' },
  { code: 'eur-200', name: 'Intermediate Charting & Patterns', price: 200, currency: 'eur' },
  { code: 'eur-300', name: 'Risk Management & Sizing', price: 300, currency: 'eur' },
  { code: 'eur-500', name: 'Professional Mentorship Program', price: 500, currency: 'eur' },
  { code: 'custom', name: 'Custom Trading Service', price: 0, currency: 'usd' }
];

async function run() {
  const companyId = getCompanyId();
  if (!companyId) {
    console.error('Missing WHOP_COMPANY_ID');
    process.exit(1);
  }

  console.log(`Setting up ${COURSE_PRICES.length} products on Whop company ${companyId}...`);
  const mapping: Record<string, string> = {};

  for (const course of COURSE_PRICES) {
    try {
      console.log(`Creating product for: ${course.name}...`);
      
      const product = await whop.products.create({
        company_id: companyId,
        title: course.name,
        plan_options: {
          plan_type: 'one_time',
          base_currency: course.currency as any,
          initial_price: course.price,
          release_method: 'buy_now',
          visibility: 'visible'
        }
      });

      console.log(`-> Created Product: ${product.id}`);

      // Now we must find the plan that was auto-generated
      const plans = await whop.plans.list({ company_id: companyId, product_ids: [product.id] });
      if (plans && plans.data && plans.data.length > 0) {
        const planId = plans.data[0].id;
        console.log(`-> Found Plan: ${planId}`);
        mapping[course.code] = planId;
      } else {
        console.log(`-> Could not find plan for product ${product.id}, creating one manually...`);
        const manualPlan = await whop.plans.create({
           company_id: companyId,
           product_id: product.id,
           plan_type: 'one_time',
           currency: course.currency as any,
           initial_price: course.price,
           release_method: 'buy_now',
           visibility: 'visible',
           title: course.name
        });
        console.log(`-> Created Manual Plan: ${manualPlan.id}`);
        mapping[course.code] = manualPlan.id;
      }

    } catch (err: any) {
      console.error(`Error creating ${course.code}:`, err?.message || err);
    }
  }

  console.log('\n=======================================');
  console.log('✅ PLAN MAPPING JSON:');
  console.log(JSON.stringify(mapping, null, 2));
  console.log('=======================================\n');

  // Save the mapping to a JSON file so we can update our frontend with it
  const outputPath = path.join(__dirname, 'plan-mapping.json');
  fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2));
  console.log(`Mapping saved to ${outputPath}`);
}

run();
