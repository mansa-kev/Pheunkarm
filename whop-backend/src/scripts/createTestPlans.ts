import { whop, getCompanyId } from '../config/whop';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const TEST_PLANS = [
  { code: 'test-2', name: 'Test Payment ($2)', price: 2, currency: 'usd' },
  { code: 'test-5', name: 'Test Payment ($5)', price: 5, currency: 'usd' },
];

async function run() {
  const companyId = getCompanyId();
  console.log(`Creating ${TEST_PLANS.length} test products on Whop company ${companyId}...`);

  // Load existing mapping
  const mappingPath = path.join(__dirname, 'plan-mapping.json');
  let mapping: Record<string, string> = {};
  if (fs.existsSync(mappingPath)) {
    mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
  }

  for (const plan of TEST_PLANS) {
    try {
      console.log(`Creating: ${plan.name}...`);
      const product = await whop.products.create({
        company_id: companyId,
        title: plan.name,
        plan_options: {
          plan_type: 'one_time',
          base_currency: plan.currency as any,
          initial_price: plan.price,
          release_method: 'buy_now',
          visibility: 'visible'
        }
      });
      console.log(`-> Product: ${product.id}`);

      const plans = await whop.plans.list({ company_id: companyId, product_ids: [product.id] });
      if (plans && plans.data && plans.data.length > 0) {
        const planId = plans.data[0].id;
        console.log(`-> Plan: ${planId}`);
        mapping[plan.code] = planId;
      }
    } catch (err: any) {
      console.error(`Error creating ${plan.code}:`, err?.message || err);
    }
  }

  // Save updated mapping
  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
  console.log('\nUpdated mapping:');
  console.log(JSON.stringify(mapping, null, 2));
}

run();
