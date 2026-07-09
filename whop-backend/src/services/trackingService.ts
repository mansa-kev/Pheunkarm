import { query } from '../config/db';

export class TrackingService {
  /**
   * Insert a new Whop payment record
   */
  static async recordPayment(paymentData: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    plan_id?: string;
    customer_email?: string;
  }) {
    const text = `
      INSERT INTO whop_payments (id, amount, currency, status, plan_id, customer_email)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE SET
        status = EXCLUDED.status,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;
    const values = [
      paymentData.id,
      paymentData.amount,
      paymentData.currency,
      paymentData.status,
      paymentData.plan_id || null,
      paymentData.customer_email || null,
    ];

    const result = await query(text, values);
    return result.rows[0];
  }

  /**
   * Update the status of an existing payment
   */
  static async updatePaymentStatus(id: string, status: string) {
    const text = `
      UPDATE whop_payments
      SET status = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *;
    `;
    const result = await query(text, [id, status]);
    return result.rows[0];
  }

  /**
   * Retrieve a payment by ID
   */
  static async getPayment(id: string) {
    const text = 'SELECT * FROM whop_payments WHERE id = $1;';
    const result = await query(text, [id]);
    return result.rows[0];
  }

  /**
   * List recent payments
   */
  static async listRecentPayments(limit: number = 50) {
    const text = 'SELECT * FROM whop_payments ORDER BY created_at DESC LIMIT $1;';
    const result = await query(text, [limit]);
    return result.rows;
  }
}
