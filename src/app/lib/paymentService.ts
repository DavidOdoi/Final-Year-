// Simulated Payment System - Free to use!
// This is a fake payment gateway for development/testing

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED';
  transactionId: string;
  timestamp: number;
  completedAt?: number;
  description: string;
}

export interface PaymentResult {
  success: boolean;
  payment: Payment;
  message: string;
}

class PaymentService {
  private payments: Map<string, Payment> = new Map();

  /**
   * Initiate a payment (simulated)
   * Flow: PENDING -> PROCESSING -> PAID (after 3-5 seconds)
   */
  async initiatePayment(
    amount: number,
    currency: string = 'UGX',
    description: string = 'Truck Booking'
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const payment: Payment = {
        id: `PAY_${Date.now()}`,
        amount,
        currency,
        status: 'PENDING',
        transactionId,
        timestamp: Date.now(),
        description,
      };

      // Store payment
      this.payments.set(payment.id, payment);

      // Simulate payment processing - starts as PENDING
      console.log(`💳 Payment Initiated: ${transactionId}`);
      console.log(`   Amount: ${amount} ${currency}`);
      console.log(`   Status: ${payment.status}`);

      // After 2 seconds, move to PROCESSING
      setTimeout(() => {
        payment.status = 'PROCESSING';
        console.log(`⏳ Payment Processing: ${transactionId}`);
      }, 2000);

      // After 4-5 seconds, mark as PAID
      setTimeout(() => {
        payment.status = 'PAID';
        payment.completedAt = Date.now();
        console.log(`✅ Payment Completed: ${transactionId}`);
        
        // Resolve promise when payment is complete
        resolve({
          success: true,
          payment,
          message: `Payment of ${amount} ${currency} has been processed successfully!`,
        });
      }, 4000 + Math.random() * 1000);
    });
  }

  /**
   * Check payment status
   */
  getPaymentStatus(paymentId: string): Payment | null {
    return this.payments.get(paymentId) || null;
  }

  /**
   * Get all payments
   */
  getAllPayments(): Payment[] {
    return Array.from(this.payments.values());
  }

  /**
   * Get user's recent payments
   */
  getRecentPayments(limit: number = 10): Payment[] {
    return Array.from(this.payments.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  /**
   * Calculate total paid
   */
  getTotalPaid(): number {
    return Array.from(this.payments.values())
      .filter(p => p.status === 'PAID')
      .reduce((sum, p) => sum + p.amount, 0);
  }

  /**
   * Simulate payment failure (for testing)
   */
  async simulateFailedPayment(
    amount: number,
    currency: string = 'UGX',
    description: string = 'Truck Booking'
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      const transactionId = `TXN_${Date.now()}_FAIL`;
      
      const payment: Payment = {
        id: `PAY_${Date.now()}`,
        amount,
        currency,
        status: 'FAILED',
        transactionId,
        timestamp: Date.now(),
        completedAt: Date.now(),
        description,
      };

      this.payments.set(payment.id, payment);

      setTimeout(() => {
        resolve({
          success: false,
          payment,
          message: 'Payment failed. Please try again.',
        });
      }, 2000);
    });
  }
}

// Export singleton instance
export const paymentService = new PaymentService();

/**
 * Example usage:
 * 
 * // Initiate payment
 * const result = await paymentService.initiatePayment(50000, 'UGX', 'Truck Booking');
 * if (result.success) {
 *   console.log(`Payment successful: ${result.payment.transactionId}`);
 * }
 * 
 * // Check status
 * const payment = paymentService.getPaymentStatus(paymentId);
 * console.log(`Status: ${payment?.status}`);
 * 
 * // Get total paid
 * const total = paymentService.getTotalPaid();
 * console.log(`Total paid: ${total}`);
 */
