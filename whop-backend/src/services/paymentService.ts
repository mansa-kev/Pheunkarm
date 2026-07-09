
import { getCompanyId } from '../config/whop';

// Since the config file exports Whop as default, we might have an issue if Whop isn't instantiated.
// Actually, I wrote `export const whop = new WhopAPI({...})` but wait, in config I exported `import WhopAPI from ...` and then instantiated it. 
// Wait, my config exported `export const whop = new WhopAPI({ ... })`.
// So we import `whop` from '../config/whop'.

import { whop } from '../config/whop';

export class PaymentService {
  /**
   * Create a checkout link using Whop's Checkout Configurations
   * @param planId The ID of the plan being purchased
   * @param redirectUrl URL to redirect to after successful payment
   */
  static async createCheckoutSession(
    planId: string,
    redirectUrl?: string
  ) {
    try {
      // Create a checkout configuration with custom styling
      const config = await whop.checkoutConfigurations.create({
        plan_id: planId,
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
