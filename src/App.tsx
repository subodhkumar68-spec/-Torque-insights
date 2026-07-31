import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAssessment } from './context/AssessmentContext';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { AssessmentProvider } from './context/AssessmentContext';
import { ChatProvider } from './context/ChatContext';

// Layout Shared Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { ProtectedRoute } from './components/ProtectedRoute';

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

// Helper component to redirect /dashboard based on role
const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'student': return <Navigate to="/dashboard/student" replace />;
    case 'parent': return <Navigate to="/dashboard/parent" replace />;
    case 'counselor': return <Navigate to="/dashboard/counselor" replace />;
    case 'school_admin': return <Navigate to="/dashboard/school" replace />;
    case 'college_admin': return <Navigate to="/dashboard/college" replace />;
    case 'corporate_hr': return <Navigate to="/dashboard/corporate" replace />;
    case 'admin': return <Navigate to="/dashboard/admin" replace />;
    default: return <Navigate to="/dashboard/student" replace />;
  }
};

// Helper component to start an assessment directly and redirect
const AssessmentDirectStart: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { startAssessment } = useAssessment();

  useEffect(() => {
    if (id) {
      let category: 'Class XI-XII' | 'BBA' | 'MBA' = 'MBA';
      let title = 'AI Career Assessment';
      if (id.includes('aptitude') || id.includes('learning') || id.includes('xi')) {
        category = 'Class XI-XII';
        title = id.includes('aptitude') ? 'High School Career Aptitude Test' : 'Cognitive Learning Style Diagnostic';
      } else if (id.includes('employability') || id.includes('critical') || id.includes('bba')) {
        category = 'BBA';
        title = id.includes('employability') ? 'Corporate Talent Employability Blueprint' : 'Critical Logic & Analytical Aptitude';
      } else {
        category = 'MBA';
        if (id.includes('personality')) title = '16-Personality Archetype Map';
        else if (id.includes('leadership')) title = 'Executive Leadership Suitability Index';
        else if (id.includes('eq')) title = 'EQ & Emotional Intelligence Diagnostics';
        else if (id.includes('communication')) title = 'Business & Verbal Communication Audit';
      }

      startAssessment(category, title);
      navigate('/dashboard/student');
    }
  }, [id, startAssessment, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" />
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

                {/* Secure Redirect Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
                <Route path="/assessment/:id" element={<ProtectedRoute><AssessmentDirectStart /></ProtectedRoute>} />
                <Route path="/report" element={<ProtectedRoute><AIReports /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Navigate to="/dashboard/settings" replace /></ProtectedRoute>} />

                 {/* Dashboard Portal Routes */}
                <Route path="/dashboard/student" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/parent" element={<ProtectedRoute><ParentDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/counselor" element={<ProtectedRoute><CounselorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/school" element={<ProtectedRoute><SchoolDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/college" element={<ProtectedRoute><CollegeDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/corporate" element={<ProtectedRoute><CorporateDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/billing" element={<ProtectedRoute><BillingDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/communication" element={<ProtectedRoute><CommunicationHub /></ProtectedRoute>} />
                <Route path="/dashboard/analytics" element={<ProtectedRoute><BiDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/developer" element={<ProtectedRoute><DeveloperMarketplace /></ProtectedRoute>} />
                <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsCenter /></ProtectedRoute>} />
                
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
