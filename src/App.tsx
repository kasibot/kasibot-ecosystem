import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from '@clerk/clerk-react';
import { useUserMetadata, isAdmin } from '@/lib/clerk';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ClientEcosystemEntry } from '@/components/ClientEcosystemEntry';
import { ClientDashboardPage } from '@/components/ClientDashboardPage';
import { DashboardEcosystem } from '@/components/DashboardEcosystem';
import { VoiceAgentDashboard } from '@/components/VoiceAgentDashboard';
import { EmailAgentDashboard } from '@/components/EmailAgentDashboard';
import { FulfillmentDashboard } from '@/components/FulfillmentDashboard';
import { ConstructionWarning } from '@/components/ConstructionWarning';
import Settings from '@/pages/Settings';
import AdminDashboard from '@/pages/AdminDashboard';
import Layout from '@/components/Layout';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Please Sign In</h1>
            <p className="text-gray-600 mb-6">Redirecting to sign in page...</p>
            <RedirectToSignIn />
          </div>
        </div>
      </SignedOut>
    </>
  );
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const metadata = useUserMetadata();
  
  if (!metadata || !isAdmin(metadata.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Wrapper component for ClientEcosystemEntry that handles navigation
function EcosystemEntryWrapper() {
  const navigate = useNavigate();
  
  const handleEnterEcosystem = () => {
    navigate('/dashboard');
  };
  
  return <ClientEcosystemEntry onEnterEcosystem={handleEnterEcosystem} />;
}

// Wrapper component for ClientDashboardPage that handles navigation
function ClientDashboardWrapper() {
  const navigate = useNavigate();
  
  return (
    <ClientDashboardPage
      onViewAgreement={() => navigate('/agreement')}
      onViewWelcome={() => navigate('/welcome')}
      onViewInvoices={() => navigate('/invoices')}
      onViewFulfillment={() => navigate('/fulfillment')}
      onViewDashboardEcosystem={() => navigate('/dashboard-ecosystem')}
    />
  );
}

// Wrapper component for DashboardEcosystem that handles navigation
function DashboardEcosystemWrapper() {
  const navigate = useNavigate();
  
  return (
    <DashboardEcosystem
      onBack={() => navigate('/dashboard')}
      onNavigateToVoice={() => navigate('/voice-dashboard')}
      onNavigateToEmail={() => navigate('/email-dashboard')}
    />
  );
}

// Wrapper component for VoiceAgentDashboard that handles navigation
function VoiceAgentDashboardWrapper() {
  const navigate = useNavigate();
  
  return (
    <VoiceAgentDashboard
      onBack={() => navigate('/dashboard-ecosystem')}
    />
  );
}

// Wrapper component for EmailAgentDashboard that handles navigation
function EmailAgentDashboardWrapper() {
  const navigate = useNavigate();
  
  return (
    <EmailAgentDashboard
      onBack={() => navigate('/dashboard-ecosystem')}
    />
  );
}

// Wrapper component for FulfillmentDashboard that handles navigation
function FulfillmentDashboardWrapper() {
  const navigate = useNavigate();
  
  return (
    <FulfillmentDashboard
      onBack={() => navigate('/dashboard')}
    />
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ConstructionWarning />
      <BrowserRouter>
        <Routes>
          {/* Authentication Routes */}
          <Route
            path="/sign-in/*"
            element={
              <SignedOut>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
                </div>
              </SignedOut>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <SignedOut>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
                </div>
              </SignedOut>
            }
          />
          
          {/* Client Ecosystem Entry - Landing page for authenticated users */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <EcosystemEntryWrapper />
              </ProtectedRoute>
            }
          />
          
          {/* Main Client Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ClientDashboardWrapper />
              </ProtectedRoute>
            }
          />
          
          {/* Dashboard Ecosystem - Shows all available dashboards */}
          <Route
            path="/dashboard-ecosystem"
            element={
              <ProtectedRoute>
                <DashboardEcosystemWrapper />
              </ProtectedRoute>
            }
          />
          
          {/* Voice Agent Dashboard */}
          <Route
            path="/voice-dashboard"
            element={
              <ProtectedRoute>
                <VoiceAgentDashboardWrapper />
              </ProtectedRoute>
            }
          />
          
          {/* Email Agent Dashboard */}
          <Route
            path="/email-dashboard"
            element={
              <ProtectedRoute>
                <EmailAgentDashboardWrapper />
              </ProtectedRoute>
            }
          />
          
          {/* Fulfillment Dashboard */}
          <Route
            path="/fulfillment"
            element={
              <ProtectedRoute>
                <FulfillmentDashboardWrapper />
              </ProtectedRoute>
            }
          />
          
          {/* Settings */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          
          {/* Legacy routes - redirect to new structure */}
          <Route path="/leads" element={<Navigate to="/dashboard" replace />} />
          <Route path="/insights" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
