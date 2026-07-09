import WhopAPI from '@whop/sdk';
import dotenv from 'dotenv';

dotenv.config();

const WHOP_API_KEY = process.env.WHOP_API_KEY;
const COMPANY_ID = process.env.WHOP_COMPANY_ID;

if (!WHOP_API_KEY) {
  console.warn('⚠️ WHOP_API_KEY is not set in the environment variables.');
}

if (!COMPANY_ID) {
  console.warn('⚠️ WHOP_COMPANY_ID is not set in the environment variables. (e.g., biz_...)');
}

// Initialize the Whop SDK
export const whop = new WhopAPI({
  apiKey: WHOP_API_KEY || '',
});

export const getCompanyId = () => {
  if (!COMPANY_ID) throw new Error('WHOP_COMPANY_ID is missing');
  return COMPANY_ID;
};
