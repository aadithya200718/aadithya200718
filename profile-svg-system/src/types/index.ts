export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  code: string;
  verified: boolean;
  badgeLabel: string;
}

export interface CapabilityItem {
  id: string;
  code: string;
  title: string;
  tag: string;
  summary: string;
  metrics: string;
  status: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  highlight?: boolean;
  categoryTag: string;
}

export interface SkillCategory {
  categoryId: string;
  name: string;
  icon: string;
  accentColor: string;
  items: SkillItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  isVerifiedPublicRepo: boolean;
  githubUrl?: string;
  role: string;
  status: 'VERIFIED REPO' | 'CORE FLAGSHIP' | 'INNOVATION PILOT';
  highlight: string;
}

export interface ThemeColors {
  bgDark: string;
  bgCard: string;
  bgCardHover: string;
  bgElevated: string;
  electricBlue: string;
  neonCyan: string;
  cyanGlow: string;
  violetMagenta: string;
  emeraldGreen: string;
  alertRed: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderGlow: string;
  borderSubtle: string;
  gridLine: string;
}

export interface ThemeTypography {
  display: string;
  body: string;
  mono: string;
}

export interface ThemeConfig {
  width: number;
  colors: ThemeColors;
  fonts: ThemeTypography;
}

export interface ProfileConfig {
  identity: {
    name: string;
    handle: string;
    tagline: string;
    subTagline: string;
    location: string;
    status: string;
    availability: string;
    bioIntro: string;
    securityClearance: string;
    systemRole: string;
  };
  credentials: CredentialItem[];
  capabilities: CapabilityItem[];
  skills: {
    categories: SkillCategory[];
  };
  projects: ProjectItem[];
  socials: {
    github: string;
    linkedin: string;
    handle: string;
  };
  telemetry: {
    coreFocus: string;
    architecture: string;
    timezone: string;
    commProtocol: string;
    terminalPrompt: string;
  };
  theme: ThemeConfig;
}

export interface GitHubUserData {
  login: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  verifiedAt: string;
  source: string;
}

export interface GitHubRepoSummary {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

export interface VerificationLog {
  timestamp: string;
  targetUser: string;
  userProvidedFacts: Record<string, unknown>;
  verifiedApiFacts: {
    user: GitHubUserData;
    repos: GitHubRepoSummary[];
  };
  omittedClaims: string[];
  status: 'VERIFIED_CLEAN';
}

export interface PortraitAssetMap {
  heroPortrait: string; // base64 data URI
  badgePortrait: string; // base64 data URI
  connectPortrait: string; // base64 data URI
}
