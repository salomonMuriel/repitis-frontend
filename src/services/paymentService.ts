import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface CreateCheckoutRequest {
  title: string;
  quantity: number;
  unit_price: number; // Amount in COP (Colombian Pesos)
  description?: string;
}

export interface CheckoutResponse {
  checkout_url: string;
  preference_id: string;
}

export interface PaymentStatus {
  payment_id: string;
  status: string;
  status_detail?: string;
  amount: number;
  currency: string;
  payer_email?: string;
}

async function getHeaders() {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth header if user is authenticated (optional for payments)
  if (session) {
    headers['Authorization'] = `Bearer ${session.access_token}`;
  }

  return headers;
}

export const paymentService = {
  /**
   * Create a MercadoPago checkout session
   */
  createCheckout: async (data: CreateCheckoutRequest): Promise<CheckoutResponse> => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/v1/payments/checkout`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout');
    }

    return response.json();
  },

  /**
   * Check payment status by payment ID
   */
  getPaymentStatus: async (paymentId: string): Promise<PaymentStatus> => {
    const headers = await getHeaders();
    const response = await fetch(`${API_URL}/api/v1/payments/status/${paymentId}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payment status');
    }

    return response.json();
  },
};
