# MercadoPago Payment Integration - Frontend Guide

This guide outlines the steps to integrate MercadoPago Checkout Pro payments in the Repitis frontend.

## Backend Endpoints Available

The backend provides three payment endpoints (all work without authentication):

1. **`POST /api/v1/payments/checkout`** - Create checkout preference
2. **`POST /api/v1/payments/webhook`** - Receive payment notifications (backend only)
3. **`GET /api/v1/payments/status/{payment_id}`** - Check payment status

## Implementation Steps

### 1. Create Payment Service

Create `src/services/paymentService.ts`:

```typescript
import { apiClient } from './api';

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

export const paymentService = {
  /**
   * Create a MercadoPago checkout session
   */
  createCheckout: async (data: CreateCheckoutRequest): Promise<CheckoutResponse> => {
    const response = await apiClient.post('/payments/checkout', data);
    return response.data;
  },

  /**
   * Check payment status by payment ID
   */
  getPaymentStatus: async (paymentId: string): Promise<PaymentStatus> => {
    const response = await apiClient.get(`/payments/status/${paymentId}`);
    return response.data;
  },
};
```

### 2. Create Payment Pages/Components

#### A. Payment Selection Page

Create a page where users can select a subscription plan:

```typescript
// src/pages/PricingPage.tsx
import { useState } from 'react';
import { paymentService } from '../services/paymentService';

export const PricingPage = () => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (planTitle: string, price: number) => {
    setLoading(true);
    try {
      const { checkout_url } = await paymentService.createCheckout({
        title: planTitle,
        quantity: 1,
        unit_price: price, // Price in COP
        description: `Repitis Premium - ${planTitle}`,
      });

      // Redirect to MercadoPago checkout
      window.location.href = checkout_url;
    } catch (error) {
      console.error('Failed to create checkout:', error);
      alert('Error creating payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-container">
      <h1>Choose Your Plan</h1>

      <div className="pricing-card">
        <h2>Monthly Plan</h2>
        <p className="price">$50,000 COP/month</p>
        <button
          onClick={() => handlePurchase('Monthly Subscription', 50000)}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
      </div>

      <div className="pricing-card">
        <h2>Annual Plan</h2>
        <p className="price">$500,000 COP/year</p>
        <p className="savings">Save 17%!</p>
        <button
          onClick={() => handlePurchase('Annual Subscription', 500000)}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Subscribe Now'}
        </button>
      </div>
    </div>
  );
};
```

#### B. Payment Success Page

Create `src/pages/PaymentSuccessPage.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentService } from '../services/paymentService';

export const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<string>('loading');

  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    if (status === 'approved' && paymentId) {
      // Optionally verify payment status with backend
      paymentService
        .getPaymentStatus(paymentId)
        .then((data) => {
          setPaymentStatus(data.status);
        })
        .catch(() => {
          setPaymentStatus('error');
        });
    } else {
      setPaymentStatus('approved');
    }
  }, [searchParams]);

  const handleContinue = () => {
    // Redirect to app home or profile
    navigate('/');
  };

  return (
    <div className="payment-success-container">
      <div className="success-icon">✓</div>
      <h1>Payment Successful!</h1>
      <p>Thank you for subscribing to Repitis Premium.</p>
      <p>You now have access to all premium features.</p>
      <button onClick={handleContinue}>Continue to App</button>
    </div>
  );
};
```

#### C. Payment Failure Page

Create `src/pages/PaymentFailurePage.tsx`:

```typescript
import { useNavigate } from 'react-router-dom';

export const PaymentFailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-failure-container">
      <div className="error-icon">✗</div>
      <h1>Payment Failed</h1>
      <p>We couldn't process your payment.</p>
      <p>Please try again or contact support if the problem persists.</p>
      <button onClick={() => navigate('/pricing')}>Try Again</button>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};
```

#### D. Payment Pending Page

Create `src/pages/PaymentPendingPage.tsx`:

```typescript
import { useNavigate } from 'react-router-dom';

export const PaymentPendingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-pending-container">
      <div className="pending-icon">⏳</div>
      <h1>Payment Pending</h1>
      <p>Your payment is being processed.</p>
      <p>You'll receive an email confirmation once it's complete.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};
```

### 3. Add Routes

Update your router configuration (e.g., `src/App.tsx` or router file):

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PricingPage } from './pages/PricingPage';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { PaymentFailurePage } from './pages/PaymentFailurePage';
import { PaymentPendingPage } from './pages/PaymentPendingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Existing routes */}
        <Route path="/" element={<HomePage />} />

        {/* Payment routes */}
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/failure" element={<PaymentFailurePage />} />
        <Route path="/payment/pending" element={<PaymentPendingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 4. Optional: Create Gift Purchase Flow

For unauthenticated gift purchases:

```typescript
// src/pages/GiftPurchasePage.tsx
import { useState } from 'react';
import { paymentService } from '../services/paymentService';

export const GiftPurchasePage = () => {
  const [loading, setLoading] = useState(false);

  const handleGiftPurchase = async () => {
    setLoading(true);
    try {
      const { checkout_url } = await paymentService.createCheckout({
        title: 'Repitis Premium - Gift',
        quantity: 1,
        unit_price: 50000,
        description: 'Gift subscription for 1 month',
      });

      window.location.href = checkout_url;
    } catch (error) {
      console.error('Failed to create gift checkout:', error);
      alert('Error creating gift payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gift-purchase-container">
      <h1>Gift Repitis Premium</h1>
      <p>Purchase a subscription as a gift for someone special!</p>
      <button onClick={handleGiftPurchase} disabled={loading}>
        {loading ? 'Processing...' : 'Purchase Gift'}
      </button>
    </div>
  );
};
```

## Important Notes

### URL Parameters

After payment, MercadoPago redirects to your success/failure/pending URLs with these query parameters:

- `collection_id` - Payment ID
- `collection_status` - Payment status
- `payment_id` - Payment ID (same as collection_id)
- `status` - approved/rejected/pending
- `external_reference` - User ID (if user was authenticated)
- `preference_id` - Preference ID

Example:
```
https://www.repitis.com/payment/success?collection_id=123&status=approved&payment_id=123
```

### Currency

All prices are in **COP (Colombian Pesos)** as integers. For example:
- $50,000 COP = `50000`
- $500,000 COP = `500000`

### Authentication

The payment endpoints work **without authentication**. This is intentional to support:
- Gift purchases
- Users who want to subscribe before creating an account

If a user is authenticated, their `user_id` will be automatically attached to the payment as `external_reference`.

### Testing

To test payments:
1. Use the test access token (already configured in backend)
2. Visit the checkout URL
3. MercadoPago will provide test credit card numbers
4. Complete the test payment flow

## Styling Recommendations

Consider using Framer Motion for smooth transitions:

```typescript
import { motion } from 'framer-motion';

export const PaymentSuccessPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="payment-success-container"
    >
      {/* Content */}
    </motion.div>
  );
};
```

## Next Steps

1. Create the payment pages/components
2. Add routes to your router
3. Style the pages to match Repitis design
4. Test the full flow with MercadoPago test environment
5. Handle webhook notifications (backend will process these)
6. Update user premium status based on successful payments

## Security Considerations

- Never store credit card information
- All payment processing happens on MercadoPago's secure servers
- Backend validates all webhook notifications
- Use HTTPS in production

## Support

For MercadoPago documentation:
- [Checkout Pro Integration](https://www.mercadopago.com/developers/en/docs/checkout-pro/landing)
- [Testing](https://www.mercadopago.com/developers/en/docs/checkout-pro/additional-content/test-cards)
