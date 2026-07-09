export interface WhopPayment {
  id: string;
  status: 'succeeded' | 'failed' | 'pending' | 'refunded';
  amount: number;
  currency: string;
  created_at: string;
  checkout_session_id?: string;
  product_id?: string;
  user_email?: string;
}

export interface CheckoutSessionRequest {
  productId: string;
  successUrl: string;
  cancelUrl: string;
  userEmail?: string;
}

export interface CheckoutSessionResponse {
  id: string;
  url: string;
}

export interface WhopWebhookPayload {
  id: string;
  type: string;
  created_at: string;
  data: {
    object: {
      id: string;
      status: string;
      amount: number;
      currency: string;
      metadata?: Record<string, any>;
      [key: string]: any;
    };
  };
}
