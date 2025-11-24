import { useState } from "react";
import { ClientEcosystemEntry } from "./components/ClientEcosystemEntry";
import { CoverPage } from "./components/CoverPage";
import { ClientAgreementPage } from "./components/ClientAgreementPage";
import { WelcomeDocumentPage } from "./components/WelcomeDocumentPage";
import { InvoiceListPage } from "./components/InvoiceListPage";
import { InvoicePage, InvoiceData } from "./components/InvoicePage";
import { ClientDashboardPage } from "./components/ClientDashboardPage";
import { FulfillmentDashboard } from "./components/FulfillmentDashboard";
import { VoiceAgentDashboard } from "./components/VoiceAgentDashboard";
import { EmailAgentDashboard } from "./components/EmailAgentDashboard";
import { DashboardEcosystem } from "./components/DashboardEcosystem";
import { CoreProblemPage } from "./components/CoreProblemPage";
import { ServiceExplorerPage } from "./components/ServiceExplorerPage";
import { ServiceDetailPage } from "./components/ServiceDetailPage";
import { LostRevenueCalculatorPage } from "./components/LostRevenueCalculatorPage";
import { ROICalculatorPage } from "./components/ROICalculatorPage";
import { ValuesPage } from "./components/ValuesPage";
import { CTAPage } from "./components/CTAPage";
import { Navigation } from "./components/Navigation";

// Sample invoice data
const sampleInvoices: InvoiceData[] = [
  {
    id: "1",
    invoiceNumber: "INV-0001",
    invoiceDate: "01/01/2025",
    billingPeriod: "January 2025",
    dueDate: "15/01/2025",
    status: "PAID",
    client: {
      companyName: "Matrix",
      contactName: "John Smith",
      email: "john@matrix.co.za",
      phone: "+27 11 123 4567",
      address: "123 Business Street, Johannesburg, Gauteng, 2000",
    },
    services: [
      {
        name: "KASIBOT AI Voice Receptionist - Monthly Subscription",
        quantity: 1,
        price: "ZAR 5,000.00",
        lineTotal: "ZAR 5,000.00",
      },
    ],
    subtotal: "ZAR 5,000.00",
    vat: "ZAR 750.00",
    total: "ZAR 5,750.00",
    planName: "AI Voice Receptionist Pro",
  },
  {
    id: "2",
    invoiceNumber: "INV-0002",
    invoiceDate: "01/02/2025",
    billingPeriod: "February 2025",
    dueDate: "15/02/2025",
    status: "PAID",
    client: {
      companyName: "Matrix",
      contactName: "John Smith",
      email: "john@matrix.co.za",
      phone: "+27 11 123 4567",
      address: "123 Business Street, Johannesburg, Gauteng, 2000",
    },
    services: [
      {
        name: "KASIBOT AI Voice Receptionist - Monthly Subscription",
        quantity: 1,
        price: "ZAR 5,000.00",
        lineTotal: "ZAR 5,000.00",
      },
    ],
    subtotal: "ZAR 5,000.00",
    vat: "ZAR 750.00",
    total: "ZAR 5,750.00",
    planName: "AI Voice Receptionist Pro",
  },
  {
    id: "3",
    invoiceNumber: "INV-0003",
    invoiceDate: "01/03/2025",
    billingPeriod: "March 2025",
    dueDate: "15/03/2025",
    status: "DUE",
    client: {
      companyName: "Matrix",
      contactName: "John Smith",
      email: "john@matrix.co.za",
      phone: "+27 11 123 4567",
      address: "123 Business Street, Johannesburg, Gauteng, 2000",
    },
    services: [
      {
        name: "KASIBOT AI Voice Receptionist - Monthly Subscription",
        quantity: 1,
        price: "ZAR 5,000.00",
        lineTotal: "ZAR 5,000.00",
      },
    ],
    subtotal: "ZAR 5,000.00",
    vat: "ZAR 750.00",
    total: "ZAR 5,750.00",
    planName: "AI Voice Receptionist Pro",
  },
];

export default function App() {
  const [showEcosystemEntry, setShowEcosystemEntry] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showInvoiceList, setShowInvoiceList] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showFulfillment, setShowFulfillment] = useState(false);
  const [showVoiceAgent, setShowVoiceAgent] = useState(false);
  const [showEmailAgent, setShowEmailAgent] = useState(false);
  const [showDashboardEcosystem, setShowDashboardEcosystem] = useState(false);

  // Service details for pages 4-7
  const serviceDetails = {
    4: {
      title: "Never Miss Another Call—Ever",
      features: [
        "24/7 AI Call Answering",
        "Intelligent Call Routing & Appointment Scheduling",
        "Instant Lead Capture & CRM Integration",
        "After-Hours Service Without Extra Staff Costs",
      ],
      value:
        "THE VALUE: Capture 100% of your leads, even at 2 AM. Save thousands in receptionist costs while delivering world-class customer service. Perfect for South African businesses operating across time zones.",
    },
    5: {
      title: "Automate Anything Online—Seriously, Anything",
      features: [
        "Custom AI Workflow Automation for Any Task",
        "Data Entry, Processing & Management",
        "Email, CRM & Software Integration",
        "Real-Time Reporting & Analytics Dashboards",
      ],
      value:
        "THE VALUE: From simple repetitive tasks to complex multi-system workflows—if it happens online, we can automate it. Eliminate errors, save hundreds of hours monthly and free your team to focus on growth.",
    },
    6: {
      title: "Your Complete Digital Marketing Partner",
      features: [
        "AI-Powered Content Creation & Scheduling",
        "Multi-Platform Social Media Management",
        "Automated Engagement & Community Building",
        "Brand Monitoring, Analytics & Growth Strategy",
      ],
      value:
        "THE VALUE: Consistent, professional content across all platforms without the hassle. Never miss a comment, trend, or opportunity. Perfect for SA businesses competing in the digital space.",
    },
    7: {
      title: "Websites, Apps, Branding—We Build It All",
      features: [
        "Custom Website Design & Development",
        "E-Commerce & Online Store Solutions",
        "Brand Identity, Logos & Visual Design",
        "Mobile Apps, SEO & Ongoing Support",
      ],
      value:
        "THE VALUE: A stunning, high-performance digital presence that works as hard as you do. From concept to launch to growth—we handle everything so you can focus on running your business.",
    },
  };

  const handleServiceClick = (serviceId: number) => {
    setCurrentPage(serviceId);
  };

  const handleBackToServices = () => {
    setCurrentPage(3);
  };

  const handleBeginComplete = () => {
    setShowAgreement(true);
  };

  const handleAgreementNext = () => {
    setShowWelcome(true);
  };

  const handleWelcomeNext = () => {
    setShowInvoiceList(true);
  };

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
  };

  const handleBackToInvoiceList = () => {
    setSelectedInvoiceId(null);
  };

  const handleInvoiceListNext = () => {
    setShowDashboard(true);
  };

  const handleViewAgreementFromDashboard = () => {
    setShowDashboard(false);
    setShowInvoiceList(false);
    setShowWelcome(false);
    // Keep showAgreement true to show the agreement
  };

  const handleViewWelcomeFromDashboard = () => {
    setShowDashboard(false);
    setShowInvoiceList(false);
    // Keep showWelcome and showAgreement true
  };

  const handleViewInvoicesFromDashboard = () => {
    setShowDashboard(false);
    // Keep all other states true to show invoice list
  };

  const handleViewFulfillmentFromDashboard = () => {
    setShowFulfillment(true);
  };

  const handleBackFromFulfillment = () => {
    setShowFulfillment(false);
  };

  const handleViewVoiceAgentFromDashboard = () => {
    setShowVoiceAgent(true);
    setShowDashboardEcosystem(false);
  };

  const handleBackFromVoiceAgent = () => {
    setShowVoiceAgent(false);
    setShowDashboardEcosystem(true);
  };

  const handleViewEmailAgentFromDashboard = () => {
    setShowEmailAgent(true);
    setShowDashboardEcosystem(false);
  };

  const handleBackFromEmailAgent = () => {
    setShowEmailAgent(false);
    setShowDashboardEcosystem(true);
  };

  const handleViewDashboardEcosystemFromDashboard = () => {
    setShowDashboardEcosystem(true);
  };

  const handleBackFromDashboardEcosystem = () => {
    setShowDashboardEcosystem(false);
  };

  const handleEnterEcosystem = () => {
    setShowEcosystemEntry(false);
    setShowDashboard(true);
  };

  const renderPage = () => {
    // Show ecosystem entry as first page
    if (showEcosystemEntry) {
      return <ClientEcosystemEntry onEnterEcosystem={handleEnterEcosystem} />;
    }

    // Show dashboard ecosystem
    if (showDashboardEcosystem) {
      return (
        <DashboardEcosystem 
          onBack={handleBackFromDashboardEcosystem}
          onNavigateToVoice={handleViewVoiceAgentFromDashboard}
          onNavigateToEmail={handleViewEmailAgentFromDashboard}
        />
      );
    }

    // Show fulfillment dashboard
    if (showFulfillment) {
      return <FulfillmentDashboard onBack={handleBackFromFulfillment} />;
    }

    // Show voice agent dashboard
    if (showVoiceAgent) {
      return <VoiceAgentDashboard onBack={handleBackFromVoiceAgent} />;
    }

    // Show email agent dashboard
    if (showEmailAgent) {
      return <EmailAgentDashboard onBack={handleBackFromEmailAgent} />;
    }

    // Show dashboard
    if (showDashboard) {
      return (
        <ClientDashboardPage 
          onViewAgreement={handleViewAgreementFromDashboard}
          onViewWelcome={handleViewWelcomeFromDashboard}
          onViewInvoices={handleViewInvoicesFromDashboard}
          onViewFulfillment={handleViewFulfillmentFromDashboard}
          onViewDashboardEcosystem={handleViewDashboardEcosystemFromDashboard}
        />
      );
    }

    // Show individual invoice
    if (selectedInvoiceId && showInvoiceList) {
      const invoice = sampleInvoices.find(inv => inv.id === selectedInvoiceId);
      if (invoice) {
        return <InvoicePage invoice={invoice} onBack={handleBackToInvoiceList} />;
      }
    }

    // Show invoice list
    if (showInvoiceList && showWelcome && showAgreement) {
      const invoiceList = sampleInvoices.map(inv => ({
        id: inv.id,
        invoiceNumber: inv.invoiceNumber,
        date: inv.invoiceDate,
        billingPeriod: inv.billingPeriod,
        total: inv.total,
        status: inv.status,
      }));
      return <InvoiceListPage invoices={invoiceList} onSelectInvoice={handleSelectInvoice} onNext={handleInvoiceListNext} />;
    }

    // Show welcome document after agreement
    if (showWelcome && showAgreement) {
      return <WelcomeDocumentPage onNext={handleWelcomeNext} />;
    }

    // Show agreement page after Begin animation
    if (showAgreement && currentPage === 0) {
      return <ClientAgreementPage onNext={handleAgreementNext} />;
    }

    switch (currentPage) {
      case 0:
        return <CoverPage onBeginComplete={handleBeginComplete} />;
      case 1:
        return <CoverPage onBeginComplete={handleBeginComplete} />;
      case 2:
        return <CoreProblemPage />;
      case 3:
        return (
          <ServiceExplorerPage
            onServiceClick={handleServiceClick}
          />
        );
      case 4:
      case 5:
      case 6:
      case 7:
        return (
          <ServiceDetailPage
            service={
              serviceDetails[
                currentPage as keyof typeof serviceDetails
              ]
            }
            onBack={handleBackToServices}
          />
        );
      case 8:
        return <LostRevenueCalculatorPage />;
      case 9:
        return <ROICalculatorPage />;
      case 10:
        return <ValuesPage />;
      case 11:
        return <CTAPage />;
      default:
        return <CoverPage onBeginComplete={handleBeginComplete} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1A1A] overflow-hidden">
      {renderPage()}
      {/* Only show navigation if not on cover page, agreement, welcome or invoice pages */}
      {currentPage > 0 && !showAgreement && !showWelcome && !showInvoiceList && (
        <Navigation
          currentPage={currentPage}
          totalPages={11}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}