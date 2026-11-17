import { ThemeConfig } from '../types/index.js';

/**
 * Returns embedded CSS <style> block for large, legible typography,
 * spacious layouts, and restrained, elegant animations.
 */
export function generateCommonStyles(theme: ThemeConfig, panelId: string): string {
  const { colors, fonts } = theme;

  return `
  <style>
    /* Baseline Reset */
    text {
      user-select: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Primary Heading Hierarchy */
    .hero-name {
      font-family: ${fonts.display};
      font-weight: 800;
      font-size: 70px;
      fill: ${colors.textPrimary};
      letter-spacing: -1.5px;
    }

    .section-title {
      font-family: ${fonts.display};
      font-weight: 800;
      font-size: 46px;
      fill: ${colors.textPrimary};
      letter-spacing: -0.8px;
    }

    .section-subtitle {
      font-family: ${fonts.display};
      font-weight: 400;
      font-size: 20px;
      fill: ${colors.textSecondary};
      line-height: 1.4;
    }

    .editorial-tag {
      font-family: ${fonts.mono};
      font-weight: 700;
      font-size: 16px;
      fill: ${colors.neonCyan};
      letter-spacing: 1.2px;
    }

    .card-title {
      font-family: ${fonts.display};
      font-weight: 700;
      font-size: 26px;
      fill: ${colors.textPrimary};
      letter-spacing: -0.3px;
    }

    .card-desc {
      font-family: ${fonts.body};
      font-weight: 400;
      font-size: 19px;
      fill: ${colors.textSecondary};
      line-height: 1.5;
    }

    .body-intro {
      font-family: ${fonts.body};
      font-weight: 400;
      font-size: 21px;
      fill: ${colors.textSecondary};
      line-height: 1.5;
    }

    .pill-label {
      font-family: ${fonts.mono};
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.4px;
    }

    .meta-label {
      font-family: ${fonts.display};
      font-weight: 500;
      font-size: 18px;
      fill: ${colors.textSecondary};
    }

    /* Restrained Keyframe Animations */
    @keyframes ${panelId}-ambient-pulse {
      0%, 100% { opacity: 0.25; transform: scale(1); }
      50% { opacity: 0.38; transform: scale(1.02); }
    }

    @keyframes ${panelId}-halo-rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes ${panelId}-beacon-pulse {
      0% { r: 4px; opacity: 1; stroke-width: 1.5px; }
      50% { r: 9px; opacity: 0; stroke-width: 0.5px; }
      100% { r: 4px; opacity: 1; stroke-width: 1.5px; }
    }

    /* Animation Classes */
    .${panelId}-ambient-glow {
      animation: ${panelId}-ambient-pulse 7s ease-in-out infinite;
      transform-origin: center center;
    }

    .${panelId}-halo-spin {
      animation: ${panelId}-halo-rotate 36s linear infinite;
      transform-origin: center center;
    }

    .${panelId}-beacon-anim {
      animation: ${panelId}-beacon-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    /* Motion Accessibility */
    @media (prefers-reduced-motion: reduce) {
      .${panelId}-ambient-glow,
      .${panelId}-halo-spin,
      .${panelId}-beacon-anim {
        animation: none !important;
        opacity: 0.3 !important;
      }
    }
  </style>
  `;
}
