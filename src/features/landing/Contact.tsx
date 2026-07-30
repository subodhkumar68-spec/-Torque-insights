import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API form submission
    setTimeout(() => {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="rounded-full bg-brand-pink px-3.5 py-1.5 text-xs font-bold text-brand-red uppercase tracking-wider">
            Get in touch
          </span>
          <h1 className="text-3xl font-black text-brand-slate sm:text-5xl tracking-tight mt-2">
            Contact Support & Sales
          </h1>
          <p className="text-sm text-brand-gray max-w-sm mx-auto">
            Have questions about group seat packages or career counsel bookings? Let our mentors help you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 max-w-5xl mx-auto items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 bg-brand-slate text-white p-8 rounded-3xl space-y-8 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-brand-red/15 blur-3xl" />
            
            <div>
              <h3 className="text-xl font-bold">Torque Learning HQ</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Connect with our academic board, support staff, or enterprise billing coordinators.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-300">Torque Learning Towers, Block E, Connaught Place, New Delhi, 110001, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span className="text-xs md:text-sm text-slate-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-brand-red shrink-0" />
                <span className="text-xs md:text-sm text-slate-300">support@careerdna.ai</span>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-6">
              <p className="text-xs font-semibold text-slate-400">Response Guarantee</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Our support tickets are responded to within 12 working hours (excluding national holidays).</p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-brand-slate">Query Logged Successfully!</h3>
                <p className="text-xs text-brand-gray max-w-xs mx-auto">Thank you. A Torque career coordinator will reach out to your registered email shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-brand-slate hover:bg-slate-50"
                >
                  Send another query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-brand-slate mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-red focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-slate mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-slate mb-1">Your Role / Profile</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-red focus:outline-none"
                  >
                    <option value="student">Student (Class 10-12 / Undergrad)</option>
                    <option value="parent">Parent</option>
                    <option value="school">School Representative</option>
                    <option value="college">College Representative</option>
                    <option value="counselor">Career Counselor</option>
                    <option value="corporate">Corporate HR Representative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-slate mb-1">How can we help?</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message or inquiry here..."
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-red focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-red py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-redhover transition-colors"
                >
                  <Send className="h-4.5 w-4.5" />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
