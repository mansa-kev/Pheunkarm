import { Request, Response } from 'express';
import { TrackingService } from '../services/trackingService';

export class WebhookHandler {
  /**
   * Handle incoming webhooks from Whop
   */
  static async handleWhopWebhook(req: Request, res: Response) {
    try {
      // In production, verify the webhook signature here!
      // const signature = req.headers['x-whop-signature'];
      
      const payload = req.body;
      console.log('Received Whop webhook:', payload.action);

      // We are primarily interested in payment events
      if (payload.action === 'payment.succeeded') {
        const paymentData = payload.data;
        
        await TrackingService.recordPayment({
          id: paymentData.id,
          amount: paymentData.amount_after_fees || paymentData.total, // Depending on payload structure
          currency: paymentData.currency,
          status: 'paid', // Or paymentData.status
          plan_id: paymentData.plan?.id,
          customer_email: paymentData.user?.email || 'N/A'
        });
        
        console.log(`Successfully processed payment: ${paymentData.id}`);
      } else if (payload.action === 'payment.failed') {
        const paymentData = payload.data;
        await TrackingService.recordPayment({
          id: paymentData.id,
          amount: paymentData.total || 0,
          currency: paymentData.currency || 'usd',
          status: 'failed',
          plan_id: paymentData.plan?.id,
          customer_email: paymentData.user?.email || 'N/A'
        });
        console.log(`Logged failed payment: ${paymentData.id}`);
      }

      // Always return 200 OK so Whop knows we received it
      res.status(200).json({ success: true, message: 'Webhook received' });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ success: false, message: 'Webhook processing error' });
    }
  }
}
