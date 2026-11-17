import { ThemeConfig } from '../types/index.js';
import { escapeXml } from './utils.js';

export interface StudioContainerOptions {
  panelId: string;
  width: number;
  height: number;
  theme: ThemeConfig;
}

/**
 * Renders the clean, cinematic studio background container.
 * Completely free of panel numbers, fake telemetry, hex IDs, and repetitive footers.
 */
export function renderStudioContainer(options: StudioContainerOptions): string {
  const { panelId, width, height, theme } = options;
  const { colors } = theme;

  return `
    <!-- Master Panel Background -->
    <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="url(#${panelId}-bg-grad)" />

    <!-- Ambient Subtle Radial Lighting -->
    <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="url(#${panelId}-ambient-glow)" class="${panelId}-ambient-glow" />

    <!-- Clean Studio Border -->
    <rect x="0" y="0" width="${width}" height="${height}" rx="28" fill="none" stroke="${colors.borderSubtle}" stroke-width="1.2" />

    <!-- Subtle Top Rim Light Accent -->
    <line x1="80" y1="0.6" x2="${width - 80}" y2="0.6" stroke="${colors.electricBlue}" stroke-width="1.5" opacity="0.6" />
  `;
}

/**
 * Renders an attractive editorial section heading with subtitle.
 * No numbers, no pseudo-code, no technical clutter.
 */
export function renderEditorialHeader(
  title: string,
  subtitle: string,
  theme: ThemeConfig,
  x: number = 60,
  y: number = 85
): string {
  const { colors, fonts } = theme;

  return `
    <g transform="translate(${x}, ${y})">
      <text x="0" y="0" class="section-title">
        ${escapeXml(title)}
      </text>
      <text x="0" y="32" class="section-subtitle">
        ${escapeXml(subtitle)}
      </text>
    </g>
  `;
}

/**
 * Renders a clean, high-impact pill tag (e.g. for tech stacks or credentials).
 */
export function renderPillTag(
  x: number,
  y: number,
  label: string,
  variant: 'cyan' | 'blue' | 'violet' | 'green' | 'neutral',
  theme: ThemeConfig
): string {
  const { colors, fonts } = theme;

  const colorMap = {
    cyan: { bg: '#00D9F518', border: colors.neonCyan, text: colors.neonCyan },
    blue: { bg: '#287CFF18', border: colors.electricBlue, text: colors.electricBlue },
    violet: { bg: '#9566FF18', border: colors.violetMagenta, text: colors.violetMagenta },
    green: { bg: '#10B98118', border: colors.emeraldGreen, text: colors.emeraldGreen },
    neutral: { bg: colors.bgElevated, border: colors.borderSubtle, text: colors.textSecondary }
  };

  const c = colorMap[variant];
  const charWidth = 9.2;
  const paddingX = 16;
  const pillW = Math.round(label.length * charWidth + paddingX * 2);
  const pillH = 32;

  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${pillW}" height="${pillH}" rx="16" fill="${c.bg}" stroke="${c.border}" stroke-width="1" />
      <text x="${pillW / 2}" y="21.5" class="pill-label" fill="${c.text}" text-anchor="middle">
        ${escapeXml(label)}
      </text>
    </g>
  `;
}
