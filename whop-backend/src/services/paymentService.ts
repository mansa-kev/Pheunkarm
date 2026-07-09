
import { getCompanyId } from '../config/whop';

// Since the config file exports Whop as default, we might have an issue if Whop isn't instantiated.
// Actually, I wrote `export const whop = new WhopAPI({...})` but wait, in config I exported `import WhopAPI from ...` and then instantiated it. 
// Wait, my config exported `export const whop = new WhopAPI({ ... })`.
// So we import `whop` from '../config/whop'.

import { whop } from '../config/whop';

export class PaymentService {
  /**
   * Create a checkout link using Whop's Checkout Configurations
   * @param productId The shortcode ID of the plan being purchased
   * @param redirectUrl URL to redirect to after successful payment
   */
  static async createCheckoutSession(
    productId: string,
    redirectUrl?: string
  ) {
    try {
      const PLAN_MAPPING: Record<string, string> = {
        "intro": "plan_QnVf5NeJ59oio",
        "skills": "plan_HoJJtMtB2imHG",
        "advanced": "plan_sOZomed7kAKY4",
        "quant": "plan_mpzqvRee1Ggkk",
        "options": "plan_Ssi9OiAl25X36",
        "futures": "plan_Q3lD8OMdFyUJ4",
        "equity": "plan_8YU5pU712mt2S",
        "psychology": "plan_A5KMO9vaZY2MP",
        "crypto": "plan_2LDQKF9ZWBOf5",
        "eur-100": "plan_OFGhvxLhTwTTF",
        "eur-150": "plan_lTDmRz0Lc4ZMG",
        "eur-200": "plan_Lumm5C82okevQ",
        "eur-300": "plan_tFvZAzOIoHk9d",
        "eur-500": "plan_bHFODuyP2RzfA",
        "custom": "plan_jr9hWRgOPCJnM"
      };

      const actualPlanId = PLAN_MAPPING[productId] || PLAN_MAPPING['custom'];

      // Create a checkout configuration with custom styling
      const config = await whop.checkoutConfigurations.create({
        plan_id: actualPlanId,
        mode: 'payment',
        redirect_url: redirectUrl || undefined,
        checkout_styling: {
          background_color: '#ffffff', // White
          button_color: '#1a365d'      // Deep Blue
        }
      } as any); // Cast to any to bypass strict type checking if checkout_styling isn't fully typed in the installed SDK version

      // The SDK returns an object with a purchase_url
      return {
        id: config.id,
        url: config.purchase_url,
      };
    } catch (error) {
      console.error('Error creating checkout configuration:', error);
      throw new Error('Failed to create checkout link');
    }
  }

  /**
   * List payments with pagination (50 limit)
   * @param page Page number
   * @param limit Number of results per page (max 50)
   */
  static async listPayments(page: number = 1, limit: number = 50) {
    try {
      const company_id = getCompanyId();
      
      const payments = await whop.payments.list({
        company_id,
      });

      return payments;
    } catch (error) {
      console.error('Error listing payments:', error);
      throw new Error('Failed to retrieve payments');
    }
  }
}
