import React, { useState } from 'react';
import { 
  Button, Input, SelectDropdown, Checkbox, RadioButton, ProgressBar, Badge, 
  GlassCard, FeatureCard, PricingCard, TestimonialCard, AssessmentCard,
  NotificationCard, AIInsightCard, StatCard, DashboardCard, FAQCard
} from '../../components/ui/ComponentLibrary';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { BrainCircuit, Award, Star, Settings, ClipboardCheck } from 'lucide-react';

export const DesignSystem: React.FC = () => {
  const [chkVal, setChkVal] = useState(false);
  const [radVal, setRadVal] = useState('opt1');

  const dropdownOpts = [
    { value: 'student', label: 'Student Diagnostic' },
    { value: 'school', label: 'School Admin' },
    { value: 'college', label: 'College Readiness' }
  ];

  const radarData = [
    { subject: 'Logical', score: 85 },
    { subject: 'Verbal', score: 70 },
    { subject: 'Quant', score: 95 },
    { subject: 'Spatial', score: 80 }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="rounded-full bg-brand-pink border border-red-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-brand-red">
              Design System
            </span>
            <span className="text-xs text-slate-400 font-bold">Version 1.0 (Stable)</span>
          </div>
          <h1 className="text-4xl font-black text-brand-slate tracking-tight">Torque Insights UI Foundation</h1>
          <p className="text-sm text-slate-500 font-medium mt-2 max-w-3xl leading-relaxed">
            Standardized reusable components, borders, and color tokens that form the UI foundation of the platform. All elements inherit spacing, corner radius (12px/16px/20px), and styling constraints.
          </p>
        </div>

        {/* Section 1: Color & Typography Tokens */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-black text-brand-slate border-l-4 border-brand-red pl-3 uppercase tracking-wider">01. Colors & Typography Tokens</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[16px] border border-slate-200 bg-white p-5 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-brand-red" />
              <div>
                <p className="text-xs font-black text-slate-400">Primary Deep Red</p>
                <p className="text-sm font-black text-brand-slate">#C62828</p>
              </div>
            </div>
            <div className="rounded-[16px] border border-slate-200 bg-white p-5 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-[#222222]" />
              <div>
                <p className="text-xs font-black text-slate-400">Secondary Text</p>
                <p className="text-sm font-black text-brand-slate">#222222</p>
              </div>
            </div>
            <div className="rounded-[16px] border border-slate-200 bg-white p-5 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-[#FAFAFA] border border-slate-200" />
              <div>
                <p className="text-xs font-black text-slate-400">Secondary Background</p>
                <p className="text-sm font-black text-brand-slate">#FAFAFA</p>
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Heading (H1)</p>
              <h1 className="text-3xl sm:text-4xl font-black text-brand-slate">The Quick Brown Fox Jumps Over The Lazy Dog</h1>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Section Title (H2)</p>
              <h2 className="text-2xl font-black text-brand-slate">The Quick Brown Fox Jumps Over The Lazy Dog</h2>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Body Text</p>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Buttons & Basic Inputs */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-black text-brand-slate border-l-4 border-brand-red pl-3 uppercase tracking-wider">02. Action Buttons & Input Selectors</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Buttons Grid */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Buttons Showcase</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Red</Button>
                <Button variant="secondary">Secondary Black</Button>
                <Button variant="outline">Outline Grey</Button>
                <Button variant="ghost">Ghost link</Button>
              </div>
            </div>

            {/* Inputs & Selectors */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Forms Inputs</h3>
              <div className="space-y-4">
                <Input label="Full Name Input" placeholder="e.g. Aarav Sharma" />
                <SelectDropdown label="User Track Profile" options={dropdownOpts} />
                
                <div className="flex items-center gap-6 pt-2">
                  <Checkbox 
                    label="Checkbox Label" 
                    checked={chkVal} 
                    onChange={() => setChkVal(!chkVal)} 
                  />
                  <div className="flex gap-4">
                    <RadioButton 
                      label="Option A" 
                      name="opts" 
                      checked={radVal === 'opt1'} 
                      onChange={() => setRadVal('opt1')} 
                    />
                    <RadioButton 
                      label="Option B" 
                      name="opts" 
                      checked={radVal === 'opt2'} 
                      onChange={() => setRadVal('opt2')} 
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Progress & Badges */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-black text-brand-slate border-l-4 border-brand-red pl-3 uppercase tracking-wider">03. Indicators & Status</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Progress indicators */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Progress bars</h3>
              <div className="space-y-4">
                <ProgressBar percentage={85} label="Strategic suitability matching" />
                <ProgressBar percentage={62} label="Analytical reasoning percentile" />
              </div>
            </div>

            {/* Status Badges */}
            <div className="rounded-[16px] border border-slate-200 bg-white p-6 space-y-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Status Badges</h3>
              <div className="flex flex-wrap gap-2.5">
                <Badge variant="primary" label="Diagnostic" />
                <Badge variant="success" label="Active license" />
                <Badge variant="warning" label="Pending feedback" />
                <Badge variant="info" label="NEP 2020" />
                <Badge variant="muted" label="Offline" />
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: Premium Cards */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-black text-brand-slate border-l-4 border-brand-red pl-3 uppercase tracking-wider">04. Cards & Pricing Matrices</h2>
          
          {/* 3 Column layouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<BrainCircuit className="h-6 w-6" />}
              title="Aptitude Testing"
              desc="Standardized verbal logical, spatial mapping, and numerical aptitude diagnostic modules."
            />
            <PricingCard 
              tier="School Pilot"
              price="₹699"
              period="/ seat / year"
              desc="Cohort billing key systems designed K-12 streams selection NEP 2020 integrations."
              features={["School counselor access", "Principal batch metrics", "All PDF report downloads"]}
              buttonText="Request School license"
              isPopular
            />
            <AssessmentCard 
              title="UG Business Aptitude Index"
              category="BBA / UG"
              questions={40}
              duration={45}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <GlassCard>
              <h3 className="text-base font-black text-brand-slate mb-2">Glassmorphic Container Overlay</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Used for side widgets, secondary overlays, or blurred backgrounds on rich analytics grids. Transparent borders.
              </p>
            </GlassCard>
            <TestimonialCard 
              quote="The RIASEC hexagons mapped Rohan's interests beautifully. We avoided a major stream misstep."
              author="Alok Sharma"
              title="Parent of Class XII Student Rohan"
            />
          </div>
        </div>

        {/* Section 5: AI Insights & Stat Metrics */}
        <div className="space-y-6 mb-16">
          <h2 className="text-xl font-black text-brand-slate border-l-4 border-brand-red pl-3 uppercase tracking-wider">05. AI Insights & Diagnostic Stat panels</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard label="Total assessments taken" num="52,431" change="12.5%" />
            <StatCard label="Counselor recommendations saved" num="1,498" change="2.3%" />
            <StatCard label="Corporate recruit matches" num="892" change="15.8%" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIInsightCard 
              prompt="Show analytical alignment recommendations for Aarav Sharma."
              insight="Aarav showcases high percentile rankings in logic strategy and numerical analytics. We recommend pursuing Consulting Strategy major paths over operations execution."
            />
            <NotificationCard 
              title="Assessment Session Autosaved"
              message="Your current cognitive testing items have been securely cached to local client storage. You can continue from item 14 if connection drops."
              type="info"
            />
          </div>
        </div>

        {/* Section 6: Dashboard Card Wrapper */}
        <div className="space-y-6">
          <h2 className="text-xl font-black text-brand-slate border-l-4 border-brand-red pl-3 uppercase tracking-wider">06. Analytics Dashboard Mock Wrappers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <DashboardCard title="Personality Diagnostic Radar" subtitle="Six-axis executive mbti profile mapping">
              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: '700' }} />
                    <Radar name="Aarav" dataKey="score" stroke="#C62828" fill="#C62828" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </DashboardCard>

            <div className="space-y-4">
              <FAQCard 
                q="How valid are the diagnostic aptitude tests?"
                a="Our tests are standard-designed in collaboration with university educational psychologists, mapping holland riasec interest constructs."
              />
              <FAQCard 
                q="How do bulk licenses keys operate?"
                a="Administrators generate seat activation keys, bypassing credit checkouts so student cohorts can log in and take tests immediately."
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
