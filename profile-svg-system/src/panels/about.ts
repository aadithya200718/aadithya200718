import { ProfileConfig } from '../types/index.js';
import { generateCommonDefs } from '../core/theme.js';
import { generateCommonStyles } from '../core/typography.js';
import { renderStudioContainer, renderEditorialHeader } from '../core/layout.js';
import { escapeXml } from '../core/utils.js';

export function generateAboutPanel(config: ProfileConfig): string {
  const panelId = 'about';
  const width = config.theme.width; // 1000
  const height = 660;
  const { colors, fonts } = config.theme;

  const defs = generateCommonDefs(config.theme, panelId);
  const styles = generateCommonStyles(config.theme, panelId);

  const container = renderStudioContainer({
    panelId,
    width,
    height,
    theme: config.theme
  });

  const header = renderEditorialHeader(
    'What I Build.',
    'Specialized in autonomous systems, distributed platforms, and high-performance applications.',
    config.theme,
    64,
    88
  );

  // 4 Capability Cards with perfectly measured 2-line descriptions
  const cards = [
    {
      title: 'AI & Machine Learning',
      line1: 'Architecting autonomous agent workflows,',
      line2: 'neural pipelines, and low-latency inference.',
      accent: colors.neonCyan,
      iconSvg: `
        <circle cx="20" cy="20" r="16" fill="#00D9F514" stroke="${colors.neonCyan}" stroke-width="1.5" />
        <circle cx="20" cy="20" r="4" fill="${colors.neonCyan}" />
        <line x1="20" y1="8" x2="20" y2="13" stroke="${colors.neonCyan}" stroke-width="1.5" stroke-linecap="round" />
        <line x1="20" y1="27" x2="20" y2="32" stroke="${colors.neonCyan}" stroke-width="1.5" stroke-linecap="round" />
        <line x1="8" y1="20" x2="13" y2="20" stroke="${colors.neonCyan}" stroke-width="1.5" stroke-linecap="round" />
        <line x1="27" y1="20" x2="32" y2="20" stroke="${colors.neonCyan}" stroke-width="1.5" stroke-linecap="round" />
      `
    },
    {
      title: 'Full-Stack Development',
      line1: 'Constructing responsive, type-safe web platforms',
      line2: 'with modern reactive architectures.',
      accent: colors.electricBlue,
      iconSvg: `
        <rect x="6" y="8" width="28" height="20" rx="4" fill="#287CFF14" stroke="${colors.electricBlue}" stroke-width="1.5" />
        <line x1="6" y1="15" x2="34" y2="15" stroke="${colors.electricBlue}" stroke-width="1.2" />
        <line x1="16" y1="32" x2="24" y2="32" stroke="${colors.electricBlue}" stroke-width="1.5" stroke-linecap="round" />
        <line x1="20" y1="28" x2="20" y2="32" stroke="${colors.electricBlue}" stroke-width="1.5" />
      `
    },
    {
      title: 'Backend & APIs',
      line1: 'Engineering distributed microservices,',
      line2: 'low-latency caching, and robust APIs.',
      accent: colors.violetMagenta,
      iconSvg: `
        <rect x="6" y="6" width="28" height="11" rx="3" fill="#9566FF14" stroke="${colors.violetMagenta}" stroke-width="1.5" />
        <rect x="6" y="21" width="28" height="11" rx="3" fill="#9566FF14" stroke="${colors.violetMagenta}" stroke-width="1.5" />
        <circle cx="12" cy="11.5" r="2" fill="${colors.violetMagenta}" />
        <circle cx="12" cy="26.5" r="2" fill="${colors.violetMagenta}" />
      `
    },
    {
      title: 'Open-Source Engineering',
      line1: 'Building clean, reusable developer tooling,',
      line2: 'open frameworks, and community software.',
      accent: colors.emeraldGreen,
      iconSvg: `
        <circle cx="14" cy="13" r="4" fill="#10B98114" stroke="${colors.emeraldGreen}" stroke-width="1.5" />
        <circle cx="26" cy="13" r="4" fill="#10B98114" stroke="${colors.emeraldGreen}" stroke-width="1.5" />
        <circle cx="20" cy="27" r="4" fill="#10B98114" stroke="${colors.emeraldGreen}" stroke-width="1.5" />
        <line x1="14" y1="17" x2="18" y2="23" stroke="${colors.emeraldGreen}" stroke-width="1.5" />
        <line x1="26" y1="17" x2="22" y2="23" stroke="${colors.emeraldGreen}" stroke-width="1.5" />
      `
    }
  ];

  function renderCard(item: typeof cards[0], x: number, y: number, w: number, h: number): string {
    return `
      <g transform="translate(${x}, ${y})">
        <!-- Card Container Surface -->
        <rect x="0" y="0" width="${w}" height="${h}" rx="20" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.2" />

        <!-- Subtle Top Accent Glow -->
        <path d="M 24 0 L ${w - 24} 0" stroke="${item.accent}" stroke-width="2" opacity="0.8" />

        <!-- Icon Container -->
        <g transform="translate(32, 28)">
          ${item.iconSvg}
        </g>

        <!-- Card Title -->
        <text x="32" y="96" class="card-title">
          ${escapeXml(item.title)}
        </text>

        <!-- Concise Description (2 Clean Lines) -->
        <g transform="translate(32, 128)">
          <text x="0" y="0" font-family="${fonts.body}" font-size="16.5" fill="${colors.textSecondary}">
            ${escapeXml(item.line1)}
          </text>
          <text x="0" y="26" font-family="${fonts.body}" font-size="16.5" fill="${colors.textSecondary}">
            ${escapeXml(item.line2)}
          </text>
        </g>
      </g>
    `;
  }

  const cardW = 422;
  const cardH = 200;
  const col1X = 64;
  const col2X = 514;
  const row1Y = 188;
  const row2Y = 412;

  const card1 = renderCard(cards[0], col1X, row1Y, cardW, cardH);
  const card2 = renderCard(cards[1], col2X, row1Y, cardW, cardH);
  const card3 = renderCard(cards[2], col1X, row2Y, cardW, cardH);
  const card4 = renderCard(cards[3], col2X, row2Y, cardW, cardH);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="What I Build - Manaadithya S.">
  ${defs}
  ${styles}

  <!-- Studio Container -->
  ${container}

  <!-- Section Header -->
  ${header}

  <!-- 2x2 Spacious Capability Cards -->
  ${card1}
  ${card2}
  ${card3}
  ${card4}
</svg>
`;
}
