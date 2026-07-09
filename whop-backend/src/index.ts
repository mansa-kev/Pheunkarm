import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './config/db';
import { PaymentService } from './services/paymentService';
import { WebhookHandler } from './controllers/webhookHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Database connection and tables
initDb();

// Middleware
app.use(cors());

// Webhook endpoint
app.post('/api/webhooks/whop', express.json(), WebhookHandler.handleWhopWebhook);

// Add standard JSON parsing for other routes
app.use(express.json());

// ── API ROUTES ──

/**
 * Health check endpoint
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'whop-integration-backend' });
});

/**
 * Route to generate a Whop checkout link
 */
app.post('/api/checkout/create', async (req: Request, res: Response) => {
  try {
    const { productId, successUrl, cancelUrl, userEmail } = req.body;
    
    if (!productId || !successUrl || !cancelUrl) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const session = await PaymentService.createCheckoutSession(
      productId,
      successUrl
    );
    
    res.json({ success: true, session });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Route to list payments from Whop
 */
app.get('/api/payments', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;

    const payments = await PaymentService.listPayments(page, limit);
    res.json({ success: true, payments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Whop Integration Backend running on port ${PORT}`);
});
