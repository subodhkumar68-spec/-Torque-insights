import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Check, Info, ShieldAlert } from 'lucide-react';
import { RazorpayModal } from '../../components/RazorpayModal';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [selectedPlan, setSelectedPlan] = useState<{ planName: string; price: number } | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  const plans = [
    {
      name: 'Free Starter',
      price: 0,
      period: 'lifetime',
      desc: 'Discover basic interests and explore the career library.',
      features: [
        'Holland RIASEC Basic Test',
        '2-page Career Interest Summary',
        'Access to public blog resources',
        'Web-only dashboard access'
      ],
      buttonText: 'Start Free Assessment',
      isPopular: false
    },
    {
      name: 'Premium AI Report',
      price: 1999,
      period: 'per test session',
      desc: 'Complete psychometric blueprint with personalized roadmap recommendations.',
      features: [
        'Full Category Test (XI-XII / BBA / MBA)',
        '15+ Page In-depth AI Analysis Report',
        'Myers-Briggs MBTI Personality Map',
        'Targeted Degree & Certification Lists',
        'Downloadable PDF Tax Invoice',
        'AI Career Coach widget chat bounds'
      ],
      buttonText: 'Purchase Premium Access',
      isPopular: true
    },
    {
      name: 'Institution Licence',
      price: 24999,
      period: 'annually (up to 100 students)',
      desc: 'Designed for high schools and college divisions.',
      features: [
        'Bulk seat credentials generator',
        'Institutional Management Dashboard',
        'Student analytics & leadership matrices',
        'Consolidated batch CSV downloads',
        'Standard counseling schedule link',
        '18% GST invoice generation'
      ],
      buttonText: 'Buy Institutional Pack',
      isPopular: false
    },
    {
      name: 'Enterprise Custom',
      price: 79999,
      period: 'annually',
      desc: 'For universities and corporate recruiting programs.',
      features: [
        'Unlimited student/talent screenings',
        'Complete recruitment pipeline tracking',
        'Placement readiness & skill gaps analysis',
        'Custom white-labeled portal URL',
        'Dedicated senior counseling panel',
        'API integration with active HR systems'
      ],
      buttonText: 'Contact Enterprise Sales',
      isPopular: false
    }
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.price === 0) {
      navigate('/assessments');
      return;
    }

    if (plan.name === 'Enterprise Custom') {
      navigate('/contact');
      return;
    }

    if (!user) {
      alert('Please register or log in first to purchase an assessment package!');
      navigate('/login');
      return;
    }

    setSelectedPlan({ planName: plan.name, price: plan.price });
    setIsPayModalOpen(true);
  };

  const handlePaymentSuccess = (txId: string) => {
    setIsPayModalOpen(false);
    alert(`Payment successful! Transaction ID: ${txId}. Your plan has been activated.`);
    navigate('/dashboard/student');
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-16">
          <h1 className="text-3xl font-black text-brand-slate sm:text-5xl tracking-tight">
            Transparent Pricing Plans
          </h1>
          <p className="text-sm text-brand-gray max-w-md mx-auto">
            Choose individual diagnostics or scale across schools, colleges, and corporate pipelines.
          </p>
        </div>

        {/* Pricing grids */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-6 flex flex-col justify-between relative transition-all duration-200 ${
                plan.isPopular
                  ? 'border-brand-red shadow-lg shadow-red-500/5 bg-brand-pink/10 ring-1 ring-brand-red'
                  : 'border-slate-200 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 right-6 rounded-full bg-brand-red px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  Recommended
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-brand-slate">{plan.name}</h3>
                <p className="text-xs text-brand-gray mt-1.5 leading-relaxed min-h-[40px]">{plan.desc}</p>
                
                {/* Price */}
                <div className="my-6">
                  {plan.price > 0 ? (
                    <div className="flex items-baseline">
                      <span className="text-3xl font-black text-brand-slate">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-brand-gray ml-1 font-semibold">/{plan.period.split(' ')[0]}</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-black text-brand-slate">Free</span>
                  )}
                  <p className="text-[10px] text-brand-gray mt-1 font-medium italic">
                    {plan.price > 0 ? '+ 18% GST (Invoices generated)' : 'No billing details required'}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 border-t border-slate-100 pt-5 mt-5">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-brand-gray leading-relaxed">
                      <Check className="h-4 w-4 text-brand-red shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`mt-8 w-full rounded-2xl py-3 text-xs font-bold transition-all ${
                  plan.isPopular
                    ? 'bg-brand-red text-white hover:bg-brand-redhover shadow-md shadow-red-500/10'
                    : plan.price === 0
                    ? 'border border-slate-200 bg-white text-brand-slate hover:bg-slate-50'
                    : 'bg-brand-slate text-white hover:bg-slate-800'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* GST & Invoicing note */}
        <div className="mt-16 rounded-2xl bg-slate-50 border border-slate-150 p-4 max-w-2xl mx-auto flex items-start gap-3">
          <Info className="h-5 w-5 text-brand-slate shrink-0 mt-0.5" />
          <div className="text-xs text-brand-gray leading-relaxed">
            <p className="font-bold text-brand-slate">GST & Institutional Invoicing Compliance</p>
            <p className="mt-0.5">
              All transactions in India are processed in INR and include a formal tax invoice quoting GST numbers. During checkout, institutions can enter their official GSTIN to claim Input Tax Credit (ITC) benefits. Contact support if you need custom quote approvals or vendor registrations.
            </p>
          </div>
        </div>

      </div>

      {/* Razorpay simulation overlay */}
      {selectedPlan && (
        <RazorpayModal
          isOpen={isPayModalOpen}
          onClose={() => setIsPayModalOpen(false)}
          onSuccess={handlePaymentSuccess}
          planName={selectedPlan.planName}
          price={selectedPlan.price}
        />
      )}
    </div>
  );
};
