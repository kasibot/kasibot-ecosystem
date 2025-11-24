import { useState } from "react";
import { ArrowLeft, Rocket, Calendar, Clock, AlertCircle, ChevronDown, ChevronUp, TrendingUp, Zap } from "lucide-react";
import { PhaseCard } from "@/components/PhaseCard";
import { ServiceTrack } from "@/components/ServiceTrack";
import { ProgressBar } from "@/components/ProgressBar";
import { StatusBadge } from "@/components/StatusBadge";

interface FulfillmentDashboardProps {
  onBack: () => void;
}

export function FulfillmentDashboard({ onBack }: FulfillmentDashboardProps) {
  const [showAllPhases, setShowAllPhases] = useState(false);
  const [showOptionalServices, setShowOptionalServices] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);

  // Project Summary Data (Template Variables)
  const projectSummary = {
    clientName: "Matrix Tracking Solutions",
    projectName: "AI Communication & Fleet Management Automation",
    packageName: "Enterprise AI Voice & Automation Suite",
    overallStatus: "In Progress" as const,
    overallProgress: 42,
    targetGoLive: "15/03/2025",
    lastUpdated: "18/11/2024"
  };

  // Core Build Phases
  const phases = [
    {
      phaseNumber: 1,
      title: "Demo Environment",
      owner: "Solutions / Product",
      duration: "1 Week",
      description: "Functional demo showcasing tone, call flow and real-world use cases.",
      status: "Complete" as const,
      progress: 100
    },
    {
      phaseNumber: 2,
      title: "Integration Research & Architecture",
      owner: "Solutions Architecture",
      duration: "1 Week",
      description: "Mapping existing systems, call routing, data flows and operational structure; defining integration plan.",
      status: "Complete" as const,
      progress: 100
    },
    {
      phaseNumber: 3,
      title: "Knowledge Base Build",
      owner: "Content & Data Team",
      duration: "1 Week",
      description: "Collecting FAQs, product structure, pricing matrices, policies and internal processes; structuring into KB.",
      status: "In Progress" as const,
      progress: 65
    },
    {
      phaseNumber: 4,
      title: "Regulatory Bundle Registration",
      owner: "Compliance / Telephony",
      duration: "2 Weeks",
      description: "Telecom compliance, documentation gathering and submission to carrier/regulator.",
      status: "In Progress" as const,
      progress: 40
    },
    {
      phaseNumber: 5,
      title: "Number Registration & Purchase",
      owner: "Telephony Team",
      duration: "1 Day",
      description: "Acquisition/configuration of business phone number(s), routing and caller ID settings.",
      status: "Not Started" as const,
      progress: 0
    },
    {
      phaseNumber: 6,
      title: "KasiBot Platform & Client Portal Setup",
      owner: "Platform / DevOps",
      duration: "2 Days",
      description: "Creating client portal, user access, billing profile, permissions and workspace configuration.",
      status: "Complete" as const,
      progress: 100
    },
    {
      phaseNumber: 7,
      title: "Telephony Integration (Twilio / Carrier / SIP)",
      owner: "Telephony / Engineering",
      duration: "6 Days",
      description: "Call routing, SIP / IVR setup, voicemail logic, failover and integration with the AI agent.",
      status: "In Progress" as const,
      progress: 30
    },
    {
      phaseNumber: 8,
      title: "Automation & Workflow Integration",
      owner: "Automation (n8n / Zapier / API)",
      duration: "1–2 Weeks",
      description: "Building workflows for lead capture, CRM updates, notifications, email/SMS/WhatsApp triggers and internal alerts.",
      status: "In Progress" as const,
      progress: 55
    },
    {
      phaseNumber: 9,
      title: "AI Assistant Build & Conversation Design",
      owner: "AI & Conversation Design",
      duration: "2 Weeks",
      description: "Designing scripts, intents, fallback flows and personalities; configuring system prompts and behaviours.",
      status: "In Progress" as const,
      progress: 45
    },
    {
      phaseNumber: 10,
      title: "Training, Testing & Refinement",
      owner: "QA / AI Training",
      duration: "4 Weeks",
      description: "Real-call simulations, failure scenarios, escalation paths, tuning responses and fixing edge cases.",
      status: "Not Started" as const,
      progress: 0
    },
    {
      phaseNumber: 11,
      title: "Soft Launch & Monitoring",
      owner: "Operations / Support",
      duration: "1 Week",
      description: "Limited rollout, monitoring call logs, tracking KPIs and capturing early feedback.",
      status: "Not Started" as const,
      progress: 0
    },
    {
      phaseNumber: 12,
      title: "Full Go-Live & Optimisation",
      owner: "Operations / Customer Success",
      duration: "Ongoing",
      description: "Full deployment, performance optimisation, weekly tweaks and monthly reporting.",
      status: "Not Started" as const,
      progress: 0
    }
  ];

  // Core Services
  const coreServices = [
    {
      title: "AI Voice Receptionist — Call Handling & Smart Routing",
      description: "Intelligent call handling system with brand voice and smart routing capabilities.",
      status: "In Progress" as const,
      progress: 50,
      deliverables: [
        { title: "Call greeting & brand voice finalised", completed: true },
        { title: "Call menu & routing logic designed", completed: true },
        { title: "Voice agent connected to phone number", completed: false },
        { title: "Business hours & after-hours flows configured", completed: false },
        { title: "Voicemail & missed-call handling set up", completed: false },
        { title: "Call recording and logging enabled", completed: false }
      ]
    },
    {
      title: "Lead Qualification & CRM Automation",
      description: "Automated lead capture, qualification and CRM integration system.",
      status: "In Progress" as const,
      progress: 60,
      deliverables: [
        { title: "Lead qualification script & criteria defined", completed: true },
        { title: "CRM pipeline structure confirmed", completed: true },
        { title: "Lead capture fields mapped (name, phone, email, tags, etc.)", completed: true },
        { title: "Automatic lead creation/updating in CRM", completed: false },
        { title: "Lead scoring / tagging rules configured", completed: false },
        { title: "Handover alerts to sales team set up", completed: false }
      ]
    },
    {
      title: "n8n / Zapier / API Workflow Automation",
      description: "Custom workflow automation connecting all business systems and processes.",
      status: "In Progress" as const,
      progress: 55,
      deliverables: [
        { title: "Integration list & endpoints confirmed", completed: true },
        { title: "Webhooks and API keys configured", completed: true },
        { title: "Core workflows built (e.g. new lead → CRM → notifications)", completed: true },
        { title: "Error handling & retry logic implemented", completed: false },
        { title: "Logging and monitoring enabled", completed: false }
      ]
    },
    {
      title: "Custom AI Assistant Build & Integration",
      description: "Tailored AI assistant designed for your specific business needs and workflows.",
      status: "In Progress" as const,
      progress: 45,
      deliverables: [
        { title: "Use cases and assistant goals defined", completed: true },
        { title: "System prompt & behaviour guide created", completed: true },
        { title: "Knowledge sources connected (KB, docs, FAQs)", completed: false },
        { title: "Channel integration (phone / WhatsApp / web widget) completed", completed: false },
        { title: "End-to-end functional testing done", completed: false }
      ]
    }
  ];

  // Optional Services
  const optionalServices = [
    {
      title: "Appointment Booking System",
      description: "Automated appointment scheduling with confirmations and reminders.",
      status: "Not Started" as const,
      progress: 0,
      deliverables: [
        { title: "Booking tool integrated (Calendly / Google Calendar / custom)", completed: false },
        { title: "Time slots, buffers and working hours configured", completed: false },
        { title: "Confirmation & reminder notifications set up", completed: false },
        { title: "No-show and rescheduling flows defined", completed: false }
      ]
    },
    {
      title: "Website Development",
      description: "Professional website design and development with integrations.",
      status: "Not Started" as const,
      progress: 0,
      deliverables: [
        { title: "Sitemap & wireframes approved", completed: false },
        { title: "UI design signed off", completed: false },
        { title: "Front-end implemented and tested", completed: false },
        { title: "Integrations (forms, analytics, pixels) connected", completed: false },
        { title: "Domain, SSL and performance checks completed", completed: false }
      ]
    },
    {
      title: "Digital Marketing & Paid Ad Automation",
      description: "Automated marketing campaigns with tracking and optimization.",
      status: "Not Started" as const,
      progress: 0,
      deliverables: [
        { title: "Tracking pixels installed (Meta, Google, etc.)", completed: false },
        { title: "Conversion events defined and verified", completed: false },
        { title: "Campaign structure & audiences created", completed: false },
        { title: "Ad automations built (lead notifications, follow-ups)", completed: false }
      ]
    },
    {
      title: "WhatsApp Business Chatbot",
      description: "AI-powered WhatsApp chatbot for customer engagement.",
      status: "In Progress" as const,
      progress: 35,
      deliverables: [
        { title: "WhatsApp business profile set up", completed: true },
        { title: "Message templates created and approved", completed: true },
        { title: "Chatbot flows designed for FAQs & routing", completed: false },
        { title: "Integration with CRM and n8n workflows", completed: false }
      ]
    },
    {
      title: "CRM Implementation & Management",
      description: "Complete CRM setup and configuration for your business.",
      status: "In Progress" as const,
      progress: 70,
      deliverables: [
        { title: "CRM instance configured (pipelines, stages, fields)", completed: true },
        { title: "User roles & permissions set", completed: true },
        { title: "Lead sources and tags standardised", completed: true },
        { title: "Dashboards and reports created", completed: false }
      ]
    },
    {
      title: "Website Chat / Lead Widgets",
      description: "Interactive chat widget for website lead capture.",
      status: "Not Started" as const,
      progress: 0,
      deliverables: [
        { title: "Chat widget / lead form embedded on site", completed: false },
        { title: "Trigger rules configured (time on page, intent, etc.)", completed: false },
        { title: "Lead routing into CRM/workflows set up", completed: false }
      ]
    },
    {
      title: "Outbound AI Lead Calling",
      description: "Automated outbound calling system for lead generation.",
      status: "Not Started" as const,
      progress: 0,
      deliverables: [
        { title: "Lead lists imported and validated", completed: false },
        { title: "Call scripts & objection handling created", completed: false },
        { title: "Outbound dialer or agent configured", completed: false },
        { title: "Result tagging and reporting integrated with CRM", completed: false }
      ]
    }
  ];

  // Milestones
  const milestones = [
    { name: "Demo environment ready", date: "25/10/2024", status: "Complete" as const },
    { name: "Regulatory bundle submitted", date: "08/11/2024", status: "Complete" as const },
    { name: "Number activated", date: "02/12/2024", status: "In Progress" as const },
    { name: "Internal UAT complete", date: "20/12/2024", status: "Not Started" as const },
    { name: "Soft launch start", date: "06/01/2025", status: "Not Started" as const },
    { name: "Full go-live", date: "15/03/2025", status: "Not Started" as const }
  ];

  // Updates
  const updates = [
    { date: "18/11/2024", note: "Knowledge Base build at 65% - finalising fleet management FAQs and pricing matrices." },
    { date: "15/11/2024", note: "Regulatory bundle submitted to carrier - awaiting approval (typically 7-10 days)." },
    { date: "12/11/2024", note: "CRM pipeline structure confirmed with Matrix team - 5 stages configured." },
    { date: "08/11/2024", note: "Integration Research completed - mapped existing fleet tracking system APIs." },
    { date: "05/11/2024", note: "Demo environment deployed successfully - positive feedback from stakeholders." }
  ];

  // Calculate active phases count
  const activePhases = phases.filter(p => p.status === "In Progress");
  const completedPhases = phases.filter(p => p.status === "Complete");

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#FFFFFF] relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#5233FF] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              opacity: 0.1
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        style={{ animation: 'pulse 8s ease-in-out infinite' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5233FF] rounded-full blur-[150px] opacity-20"
        style={{ animation: 'pulse 8s ease-in-out infinite reverse' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Two-Card Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Card - Title & Info */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#5233FF]/20 to-[#7B61FF]/10 border-2 border-[#5233FF]/50 rounded-xl p-6 shadow-[0_0_40px_rgba(82,51,255,0.2)]">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#B0B0B0] hover:text-[#FFFFFF] transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </button>

            {/* Title Section */}
            <div className="flex items-start gap-4 mb-6">
              <div 
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5233FF] to-[#7B61FF] flex items-center justify-center flex-shrink-0"
                style={{ boxShadow: '0 0 30px rgba(82, 51, 255, 0.4)' }}
              >
                <Rocket className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <div className="flex-1">
                <h1 
                  className="text-[#FFFFFF] mb-2" 
                  style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '2rem' }}
                >
                  Fulfillment Dashboard
                </h1>
                <p className="text-[#B0B0B0]">
                  Live progress on the build, setup & deployment of your AI automation systems.
                </p>
              </div>
            </div>

            {/* Project Summary Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A1A1A]/50 rounded-xl p-4 border border-[#333333]">
                <p className="text-[#B0B0B0] text-sm mb-1">Client</p>
                <p className="text-[#FFFFFF]">{projectSummary.clientName}</p>
              </div>
              <div className="bg-[#1A1A1A]/50 rounded-xl p-4 border border-[#333333]">
                <p className="text-[#B0B0B0] text-sm mb-1">Package</p>
                <p className="text-[#FFFFFF]">{projectSummary.packageName}</p>
              </div>
              <div className="bg-[#1A1A1A]/50 rounded-xl p-4 border border-[#333333]">
                <p className="text-[#B0B0B0] text-sm mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Target Go-Live
                </p>
                <p className="text-[#5233FF]">{projectSummary.targetGoLive}</p>
              </div>
              <div className="bg-[#1A1A1A]/50 rounded-xl p-4 border border-[#333333]">
                <p className="text-[#B0B0B0] text-sm mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Last Updated
                </p>
                <p className="text-[#FFFFFF]">{projectSummary.lastUpdated}</p>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#B0B0B0] text-sm">Overall Project Progress</p>
                <p className="text-[#5233FF]">{projectSummary.overallProgress}%</p>
              </div>
              <ProgressBar progress={projectSummary.overallProgress} />
            </div>
          </div>

          {/* Right Card - Status Legend */}
          <div className="bg-[#222222] border border-[#333333] rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h3 
              className="text-[#FFFFFF] mb-4" 
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}
            >
              Status Legend
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <StatusBadge status="In Queue" />
                <span className="text-[#666666] text-sm">In Queue</span>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status="In Progress" />
                <span className="text-[#B0B0B0] text-sm">In Progress</span>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status="Complete" />
                <span className="text-[#B0B0B0] text-sm">Complete</span>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status="On Hold" />
                <span className="text-[#B0B0B0] text-sm">On Hold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Build Phases - Collapsible */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#FFFFFF] text-xl">Core Build Phases</h2>
            <button
              onClick={() => setShowAllPhases(!showAllPhases)}
              className="flex items-center gap-2 px-4 py-2 bg-[#5233FF]/20 text-[#5233FF] rounded-xl border border-[#5233FF]/50 hover:bg-[#5233FF]/30 transition-all"
            >
              {showAllPhases ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Show All {phases.length} Phases
                </>
              )}
            </button>
          </div>
          
          {/* Always show active phases */}
          <div className="space-y-4 mb-4">
            {phases
              .filter(p => p.status === "In Progress")
              .map((phase) => (
                <PhaseCard key={phase.phaseNumber} {...phase} />
              ))}
          </div>

          {/* Show all phases when expanded */}
          {showAllPhases && (
            <div className="space-y-4">
              {phases
                .filter(p => p.status !== "In Progress")
                .map((phase) => (
                  <PhaseCard key={phase.phaseNumber} {...phase} />
                ))}
            </div>
          )}

          {!showAllPhases && phases.filter(p => p.status !== "In Progress").length > 0 && (
            <p className="text-[#B0B0B0] text-center text-sm mt-4">
              + {phases.filter(p => p.status !== "In Progress").length} more phases (click "Show All" above)
            </p>
          )}
        </div>

        {/* Service Delivery Tracks - 2 Column Grid */}
        <div className="mb-8">
          <h2 className="text-[#FFFFFF] text-xl mb-6">Service Tracks & Deliverables</h2>
          
          <h3 className="text-[#FFFFFF] mb-4">Core Services</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {coreServices.map((service, index) => (
              <ServiceTrack key={index} {...service} />
            ))}
          </div>

          {/* Optional Services - Collapsible */}
          <div>
            <button
              onClick={() => setShowOptionalServices(!showOptionalServices)}
              className="flex items-center justify-between w-full mb-4 px-6 py-4 bg-[#222222] border border-[#333333] rounded-xl hover:border-[#5233FF]/50 transition-all"
            >
              <h3 className="text-[#FFFFFF]">Optional Services ({optionalServices.length})</h3>
              {showOptionalServices ? (
                <ChevronUp className="w-5 h-5 text-[#5233FF]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#5233FF]" />
              )}
            </button>

            {showOptionalServices && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {optionalServices.map((service, index) => (
                  <ServiceTrack key={index} {...service} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Milestones - Collapsible */}
        <div className="mb-8">
          <button
            onClick={() => setShowMilestones(!showMilestones)}
            className="flex items-center justify-between w-full mb-4 px-6 py-4 bg-[#222222] border border-[#333333] rounded-xl hover:border-[#5233FF]/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#5233FF]" />
              <h2 className="text-[#FFFFFF] text-xl">Milestones & Deadlines ({milestones.length})</h2>
            </div>
            {showMilestones ? (
              <ChevronUp className="w-5 h-5 text-[#5233FF]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#5233FF]" />
            )}
          </button>

          {showMilestones && (
            <div 
              className="bg-[#222222] border border-[#333333] rounded-xl p-6"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-[#333333] last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        milestone.status === 'Complete' ? 'bg-[#00C853]' :
                        milestone.status === 'In Progress' ? 'bg-[#5233FF]' :
                        'bg-[#666666]'
                      }`} style={{
                        boxShadow: milestone.status === 'Complete' ? '0 0 10px rgba(0, 200, 83, 0.5)' :
                                   milestone.status === 'In Progress' ? '0 0 10px rgba(82, 51, 255, 0.5)' :
                                   'none'
                      }} />
                      <span className="text-[#FFFFFF]">{milestone.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#B0B0B0] text-sm">{milestone.date}</span>
                      <StatusBadge status={milestone.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Latest Updates - Footer */}
        <div 
          className="bg-[#222222] border border-[#333333] rounded-xl p-6 border-t-2 border-t-[#5233FF]/50"
          style={{ boxShadow: '0 -4px 20px rgba(82, 51, 255, 0.1)' }}
        >
          <h2 className="text-[#FFFFFF] text-xl mb-6">📝 Latest Updates & Notes</h2>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-[#333333] last:border-b-0 last:pb-0">
                <div className="flex-shrink-0">
                  <span className="text-[#5233FF] text-sm font-mono">{update.date}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[#B0B0B0] text-sm">{update.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}