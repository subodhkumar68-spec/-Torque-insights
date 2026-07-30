import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { ChatProvider } from './context/ChatContext';

// Layout Shared Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

// Public Landing Website Pages
import { Home } from './features/landing/Home';
import { About } from './features/landing/About';
import { Assessments } from './features/landing/Assessments';
import { Pricing } from './features/landing/Pricing';
import { Blog } from './features/landing/Blog';
import { BlogDetail } from './features/landing/BlogDetail';
import { FAQ } from './features/landing/FAQ';
import { Contact } from './features/landing/Contact';

// New Sections
import { AIReports } from './features/landing/AIReports';
import { Schools } from './features/landing/Schools';
import { Colleges } from './features/landing/Colleges';
import { Resources } from './features/landing/Resources';
import { DesignSystem } from './features/landing/DesignSystem';

// Auth Pages
import { Login } from './features/auth/Login';
import { SignUp } from './features/auth/SignUp';

// Dashboards Portal Pages
import { StudentDashboard } from './features/student/StudentDashboard';
import { ParentDashboard } from './features/parent/ParentDashboard';
import { CounselorDashboard } from './features/counselor/CounselorDashboard';
import { SchoolDashboard } from './features/school/SchoolDashboard';
import { CollegeDashboard } from './features/college/CollegeDashboard';
import { CorporateDashboard } from './features/corporate/CorporateDashboard';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { BillingDashboard } from './features/billing/BillingDashboard';
import { CommunicationHub } from './features/communication/CommunicationHub';
import { BiDashboard } from './features/analytics/BiDashboard';
import { DeveloperMarketplace } from './features/developer/DeveloperMarketplace';
import { SettingsCenter } from './features/settings/SettingsCenter';

// Helper to scroll window to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Global Layout wrapper
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // Clean up printable view for reports: Hide Navbar, Footer, and Coach widget when printing invoices or reports
  const isPrintMode = location.pathname.includes('/reports') && window.matchMedia('print').matches;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {!isPrintMode && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
      {!isPrintMode && <Footer />}
      {!isPrintMode && <ChatWidget />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AssessmentProvider>
          <ChatProvider>
            <ScrollToTop />
            <LayoutWrapper>
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/assessments" element={<Assessments />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* New Section Routes */}
                <Route path="/ai-reports" element={<AIReports />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/colleges" element={<Colleges />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/solutions" element={<Colleges />} />
                <Route path="/reports" element={<AIReports />} />
                <Route path="/design-system" element={<DesignSystem />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Dashboard Portal Routes */}
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/parent" element={<ParentDashboard />} />
                <Route path="/dashboard/counselor" element={<CounselorDashboard />} />
                <Route path="/dashboard/school" element={<SchoolDashboard />} />
                <Route path="/dashboard/college" element={<CollegeDashboard />} />
                <Route path="/dashboard/corporate" element={<CorporateDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/billing" element={<BillingDashboard />} />
                <Route path="/dashboard/communication" element={<CommunicationHub />} />
                <Route path="/dashboard/analytics" element={<BiDashboard />} />
                <Route path="/dashboard/developer" element={<DeveloperMarketplace />} />
                <Route path="/dashboard/settings" element={<SettingsCenter />} />
                
                {/* Fallback redirect */}
                <Route path="*" element={<Home />} />
              </Routes>
            </LayoutWrapper>
          </ChatProvider>
        </AssessmentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
