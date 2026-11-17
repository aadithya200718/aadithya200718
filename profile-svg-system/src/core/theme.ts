import { ThemeConfig } from '../types/index.js';

/**
 * Returns standard SVG <defs> containing luxury gradients, soft lighting, and shadows.
 */
export function generateCommonDefs(theme: ThemeConfig, panelId: string): string {
  const { colors } = theme;

  return `
  <defs>
    <!-- Deep Cinematic Background Gradient -->
    <linearGradient id="${panelId}-bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colors.bgDark}" />
      <stop offset="50%" stop-color="#090F1E" />
      <stop offset="100%" stop-color="#050811" />
    </linearGradient>

    <!-- Ambient Lighting Radial Glow -->
    <radialGradient id="${panelId}-ambient-glow" cx="15%" cy="15%" r="75%">
      <stop offset="0%" stop-color="${colors.electricBlue}" stop-opacity="0.14" />
      <stop offset="40%" stop-color="${colors.neonCyan}" stop-opacity="0.05" />
      <stop offset="100%" stop-color="${colors.bgDark}" stop-opacity="0" />
    </radialGradient>

    <!-- Portrait Centerpiece Halo Glow -->
    <radialGradient id="${panelId}-portrait-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${colors.neonCyan}" stop-opacity="0.30" />
      <stop offset="55%" stop-color="${colors.electricBlue}" stop-opacity="0.12" />
      <stop offset="100%" stop-color="${colors.bgDark}" stop-opacity="0" />
    </radialGradient>

    <!-- Card Surface Gradient -->
    <linearGradient id="${panelId}-card-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${colors.bgCard}" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#0A1020" stop-opacity="0.95" />
    </linearGradient>

    <!-- Card Top Accent Gradient -->
    <linearGradient id="${panelId}-card-accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${colors.neonCyan}" />
      <stop offset="100%" stop-color="${colors.electricBlue}" />
    </linearGradient>

    <!-- Soft Studio Drop Shadow -->
    <filter id="${panelId}-card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#000000" flood-opacity="0.55" />
    </filter>

    <filter id="${panelId}-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Rounded Portrait Clip Path for Hero Centerpiece (340x440) -->
    <clipPath id="${panelId}-portrait-rounded">
      <rect x="0" y="0" width="340" height="440" rx="24" />
    </clipPath>

    <!-- Avatar Circle Clip Path for Connect (140x140) -->
    <clipPath id="${panelId}-avatar-circle">
      <circle cx="70" cy="70" r="68" />
    </clipPath>
  </defs>
  `;
}
