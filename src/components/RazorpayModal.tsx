import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import { useAuth } from '../context/AuthContext';
import { X, CreditCard, CheckCircle2, Ticket, Check, ShieldCheck, Download } from 'lucide-react';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (txId: string) => void;
  planName: string;
  price: number;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  planName,
  price
}) => {
  const { user } = useAuth();
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [gstin, setGstin] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [txDetails, setTxDetails] = useState<any>(null);

  if (!isOpen) return null;

  const basePrice = price;
  const discountAmount = Math.floor(basePrice * discount);
  const taxableValue = basePrice - discountAmount;
  const gstAmount = Math.floor(taxableValue * 0.18); // 18% GST standard in India
  const totalAmount = taxableValue + gstAmount;

  const handleApplyCoupon = () => {
    const code = coupon.toUpperCase().trim();
    if (code === 'LAUNCH50') {
      setDiscount(0.5);
      setAppliedCoupon('LAUNCH50 (50% Off)');
      setCoupon('');
    } else if (code === 'TORQUE100') {
      setDiscount(1.0);
      setAppliedCoupon('TORQUE100 (100% Off)');
      setCoupon('');
    } else {
      alert('Invalid coupon code! Try "LAUNCH50" or "TORQUE100"');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const txId = `pay_${Math.random().toString(36).substring(2, 11)}`;
    const invoiceNum = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const transaction = {
      id: txId,
      userId: user.id,
      userName: user.name,
      planName,
      amount: totalAmount,
      gst: gstAmount,
      couponCode: appliedCoupon || undefined,
      timestamp: Date.now(),
      invoiceNumber: invoiceNum,
      paymentMethod: paymentMethod.toUpperCase(),
      status: 'captured' as const
    };

    // Save payment to DB
    const payments = dbService.getPayments();
    dbService.savePayments([...payments, transaction]);

    setTxDetails(transaction);
    setStep('success');
  };

  const handleSuccessClose = () => {
    if (txDetails) {
      onSuccess(txDetails.id);
    }
    setStep('checkout');
    setAppliedCoupon(null);
    setDiscount(0);
    onClose();
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl animate-fade-in-up overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-brand-slate">
              {step === 'checkout' ? 'Secure Checkout' : 'Payment Success'}
            </h3>
            <p className="text-xs text-brand-gray">Razorpay Integrated Gateway</p>
          </div>
          <button
            onClick={step === 'checkout' ? onClose : handleSuccessClose}
            className="rounded-xl p-1.5 hover:bg-slate-100 text-brand-gray transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <form onSubmit={handlePaymentSubmit} className="mt-4 space-y-4">
            {/* Plan Info */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-brand-slate uppercase tracking-wider">{planName} Pack</span>
                <span className="text-lg font-extrabold text-brand-red">₹{price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Billing details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-brand-slate mb-1">Billing Name</label>
                <input
                  type="text"
                  required
                  defaultValue={user?.name}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-brand-red focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-slate mb-1">GSTIN (Optional)</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  placeholder="e.g. 07AAAAA1111A1Z1"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm uppercase placeholder:normal-case focus:border-brand-red focus:outline-none"
                />
              </div>
            </div>

            {/* Coupons */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-brand-slate">Promo Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket className="absolute left-3 top-2.5 h-4 w-4 text-brand-gray" />
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter Coupon (e.g., LAUNCH50)"
                    className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-sm focus:border-brand-red focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="rounded-xl bg-brand-slate px-4 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold mt-1">
                  <Check className="h-3.5 w-3.5" />
                  <span>Coupon applied: {appliedCoupon}</span>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-brand-slate">Payment Mode</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-xs font-semibold transition-all ${
                    paymentMethod === 'card'
                      ? 'border-brand-red bg-brand-pink text-brand-red'
                      : 'border-slate-200 bg-white text-brand-slate hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mb-1" />
                  Card / Debit
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-xs font-semibold transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-brand-red bg-brand-pink text-brand-red'
                      : 'border-slate-200 bg-white text-brand-slate hover:bg-slate-50'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider mb-2 border border-current px-1 rounded">UPI</span>
                  Google Pay / UPI
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-2.5 text-xs font-semibold transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-brand-red bg-brand-pink text-brand-red'
                      : 'border-slate-200 bg-white text-brand-slate hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="h-5 w-5 mb-1" />
                  Net Banking
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-sm text-brand-gray">
              <div className="flex justify-between">
                <span>Base Amount</span>
                <span>₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Discount</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-2 text-base font-extrabold text-brand-slate">
                <span>Total Amount</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-brand-red py-3 text-sm font-semibold text-white shadow-lg shadow-red-500/20 hover:bg-brand-redhover transition-colors"
            >
              Pay ₹{totalAmount.toLocaleString('en-IN')} via Razorpay
            </button>
          </form>
        ) : (
          /* Step Success / Invoice */
          <div className="mt-6 text-center space-y-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-brand-slate">Payment Successful!</h4>
              <p className="text-sm text-brand-gray mt-1">Thank you. Your assessment seats have been updated.</p>
            </div>

            {/* Receipt Summary */}
            <div className="rounded-2xl border border-slate-200 p-4 text-left space-y-3 bg-white">
              <div className="flex justify-between text-xs font-semibold text-brand-gray border-b border-slate-100 pb-2">
                <span>Invoice: {txDetails?.invoiceNumber}</span>
                <span>Txn ID: {txDetails?.id}</span>
              </div>
              
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-brand-slate">
                  <span>Product:</span>
                  <span className="font-bold">{txDetails?.planName} Pack</span>
                </div>
                <div className="flex justify-between text-brand-slate">
                  <span>Paid via:</span>
                  <span className="font-semibold">{txDetails?.paymentMethod}</span>
                </div>
                {gstin && (
                  <div className="flex justify-between text-brand-slate text-xs">
                    <span>GSTIN:</span>
                    <span className="font-semibold uppercase">{gstin}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-brand-red text-base">
                  <span>Amount Paid:</span>
                  <span>₹{txDetails?.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={printInvoice}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl border border-slate-200 py-2.5 text-sm font-semibold text-brand-slate hover:bg-slate-50 transition-colors"
              >
                <Download className="h-4 w-4" />
                Print Invoice
              </button>
              <button
                onClick={handleSuccessClose}
                className="flex-1 rounded-2xl bg-brand-slate py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
