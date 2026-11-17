import { ProfileConfig } from '../types/index.js';

/**
 * MASTER PROFILE CONFIGURATION
 * Single source of truth for Manaadithya S. profile visual system.
 * Configured for the premium creative technology studio aesthetic (1000px canvas).
 */
export const profileConfig: ProfileConfig = {
  identity: {
    name: 'Manaadithya S.',
    handle: 'aadithya200718',
    tagline: 'AI/ML Engineer · Full-Stack Developer · Open-Source Builder',
    subTagline: 'Architecting intelligent software, practical AI systems, and scalable web platforms.',
    location: 'Chennai, India',
    status: 'Available for high-impact collaborations',
    availability: 'Open for engineering initiatives & product architecture',
    bioIntro:
      'Building intelligent software, practical AI systems, and open-source products that solve real problems.',
    securityClearance: 'Level-04',
    systemRole: 'AI/ML Engineer & Full-Stack Developer'
  },

  credentials: [
    {
      id: 'cred-redis-01',
      title: 'Redis Associate Cloud Operator',
      issuer: 'Redis University / Redis Inc.',
      code: 'REDIS-CLD-ASSOC',
      verified: true,
      badgeLabel: 'Public Credential'
    }
  ],

  capabilities: [
    {
      id: 'cap-01',
      code: 'AIML',
      title: 'AI & Machine Learning',
      tag: 'Neural Runtimes',
      summary:
        'Architecting autonomous agent workflows, neural pipelines, and low-latency model inference.',
      metrics: 'Agent Workflows · Model Inference',
      status: 'Active'
    },
    {
      id: 'cap-02',
      code: 'FULLSTACK',
      title: 'Full-Stack Development',
      tag: 'Modern Web',
      summary:
        'Constructing responsive, type-safe web applications with modern reactive architectures.',
      metrics: 'React / Next.js · Type-Safe UI',
      status: 'Active'
    },
    {
      id: 'cap-03',
      code: 'BACKEND',
      title: 'Backend & APIs',
      tag: 'Distributed Services',
      summary:
        'Engineering high-throughput distributed microservices, low-latency caching, and robust APIs.',
      metrics: 'FastAPI / Node · Redis Caching',
      status: 'Active'
    },
    {
      id: 'cap-04',
      code: 'OPENSOURCE',
      title: 'Open-Source Engineering',
      tag: 'Developer Tooling',
      summary:
        'Building clean, reusable developer tooling, open frameworks, and community-driven software.',
      metrics: 'Modular Architecture · Clean Code',
      status: 'Active'
    }
  ],

  skills: {
    categories: [
      {
        categoryId: 'fe',
        name: 'Languages & Frontend',
        icon: 'CODE',
        accentColor: '#00D9F5', // Neon Cyan
        items: [
          { name: 'Python', level: 95, highlight: true, categoryTag: 'Core Language & ML' },
          { name: 'TypeScript', level: 92, highlight: true, categoryTag: 'Type-Safe Full-Stack' },
          { name: 'React', level: 94, highlight: true, categoryTag: 'Frontend Architecture' },
          { name: 'Next.js', level: 90, highlight: true, categoryTag: 'Production Web Runtimes' }
        ]
      },
      {
        categoryId: 'be',
        name: 'Backend & Infrastructure',
        icon: 'SERVER',
        accentColor: '#287CFF', // Electric Blue
        items: [
          { name: 'FastAPI', level: 92, highlight: true, categoryTag: 'High-Velocity Async APIs' },
          { name: 'Node.js', level: 90, highlight: true, categoryTag: 'Event-Driven Services' },
          { name: 'PostgreSQL', level: 88, highlight: true, categoryTag: 'Relational Persistence' },
          { name: 'Redis', level: 94, highlight: true, categoryTag: 'In-Memory Caching · Cloud Certified' }
        ]
      },
      {
        categoryId: 'aiml',
        name: 'AI & Machine Learning',
        icon: 'BRAIN',
        accentColor: '#9566FF', // Violet
        items: [
          { name: 'Machine Learning', level: 92, highlight: true, categoryTag: 'Models & Inference' },
          { name: 'Neural Networks', level: 88, highlight: false, categoryTag: 'Architectures & Weights' },
          { name: 'Agentic Workflows', level: 90, highlight: true, categoryTag: 'Tool Calling & Memory' },
          { name: 'LLM Orchestration', level: 89, highlight: false, categoryTag: 'Context & Reasoning' }
        ]
      }
    ]
  },

  projects: [
    {
      id: 'proj-learntwin',
      name: 'LearnTwin',
      tagline: 'Adaptive AI-Powered Learning Twin Platform',
      description:
        'Cognitive learning platform synthesizing digital clones of learner progression with adaptive concept mastery algorithms.',
      category: 'AI / EdTech',
      tech: ['Python', 'FastAPI', 'Next.js'],
      isVerifiedPublicRepo: false,
      role: 'Lead Architect',
      status: 'CORE FLAGSHIP',
      highlight: 'Adaptive Neural Knowledge Graph'
    },
    {
      id: 'proj-carynth',
      name: 'Carynth',
      tagline: 'Autonomous AI Agent Execution Runtime',
      description:
        'High-velocity developer tooling and agent runtime executing multi-step reasoning and automated synthesis pipelines.',
      category: 'AI / Developer Tooling',
      tech: ['TypeScript', 'Node.js', 'Python'],
      isVerifiedPublicRepo: false,
      role: 'Core Author',
      status: 'CORE FLAGSHIP',
      highlight: 'Parallel Multi-Agent Protocol'
    },
    {
      id: 'proj-bloodsync',
      name: 'BloodSync',
      tagline: 'Emergency Blood Donation Orchestration',
      description:
        'Real-time life-saving blood supply matching network linking emergency requests, verified donors, and hospitals.',
      category: 'Healthcare / Real-Time',
      tech: ['TypeScript', 'Next.js', 'PostgreSQL'],
      isVerifiedPublicRepo: true,
      githubUrl: 'https://github.com/aadithya200718/blood-sync-',
      role: 'Creator & Maintainer',
      status: 'VERIFIED REPO',
      highlight: 'Public Verified Repository'
    },
    {
      id: 'proj-medconnect',
      name: 'Medconnect',
      tagline: 'Clinical Diagnostics & Patient Portal',
      description:
        'Integrated healthcare management portal synchronizing patient telemetry, diagnostic queues, and appointments.',
      category: 'HealthTech / Portal',
      tech: ['TypeScript', 'React', 'Node.js'],
      isVerifiedPublicRepo: true,
      githubUrl: 'https://github.com/aadithya200718/medconnect',
      role: 'Creator & Maintainer',
      status: 'VERIFIED REPO',
      highlight: 'Public Verified Repository'
    },
    {
      id: 'proj-tamiltravel',
      name: 'Tamil AI Travel',
      tagline: 'Multilingual Cultural Itinerary Engine',
      description:
        'Domain-tuned travel intelligence platform generating dynamic cultural itineraries, route mapping, and localized insights.',
      category: 'AI / Regional Tech',
      tech: ['Python', 'FastAPI', 'Machine Learning'],
      isVerifiedPublicRepo: false,
      role: 'Lead Developer',
      status: 'INNOVATION PILOT',
      highlight: 'Contextual Heritage Discovery'
    }
  ],

  socials: {
    github: 'https://github.com/aadithya200718',
    linkedin: 'https://www.linkedin.com/in/manaadithya-s-606142271',
    handle: 'aadithya200718'
  },

  telemetry: {
    coreFocus: 'Autonomous Agent Runtimes & Distributed Full-Stack Systems',
    architecture: 'Microservices · Event-Driven · Asynchronous Execution',
    timezone: 'UTC+05:30 // Chennai, India',
    commProtocol: 'HTTPS // REST // Secure Channel',
    terminalPrompt: 'manaadithya@portfolio:~$ build-systems'
  },

  theme: {
    width: 1000,
    colors: {
      bgDark: '#070B16', // Cinematic deep navy background
      bgCard: '#0C1426', // Clean surface card
      bgCardHover: '#101B33', // Highlighted surface
      bgElevated: '#111E35', // Elevated pill / badge container
      electricBlue: '#287CFF', // Electric Blue primary
      neonCyan: '#00D9F5', // Neon Cyan accent
      cyanGlow: 'rgba(0, 217, 245, 0.25)', // Ambient glow
      violetMagenta: '#9566FF', // Violet secondary
      emeraldGreen: '#10B981', // Verified / active green
      alertRed: '#F43F5E', // Subtle accent
      textPrimary: '#F4F7FF', // Crisp bright white
      textSecondary: '#A1B2CE', // Highly legible secondary silver
      textMuted: '#6B7C99', // Elegant muted label
      borderGlow: 'rgba(0, 217, 245, 0.2)', // Restrained glowing border
      borderSubtle: '#1C2C4E', // Clean structural border
      gridLine: 'rgba(0, 217, 245, 0.02)' // Extremely faint background texture
    },
    fonts: {
      display:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', system-ui, sans-serif",
      body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', system-ui, sans-serif",
      mono: "'JetBrains Mono', 'Cascadia Code', 'Fira Code', 'Courier New', monospace"
    }
  }
};
