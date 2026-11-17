import { ProfileConfig } from '../types/index.js';
import { generateCommonDefs } from '../core/theme.js';
import { generateCommonStyles } from '../core/typography.js';
import { renderStudioContainer } from '../core/layout.js';
import { escapeXml } from '../core/utils.js';

export function generateHeroPanel(
  config: ProfileConfig,
  portraitBase64: string
): string {
  const panelId = 'hero';
  const width = config.theme.width; // 1000
  const height = 620;
  const { colors, fonts } = config.theme;

  const defs = generateCommonDefs(config.theme, panelId);
  const styles = generateCommonStyles(config.theme, panelId);

  const container = renderStudioContainer({
    panelId,
    width,
    height,
    theme: config.theme
  });

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Manaadithya S. - Developer Portfolio">
  ${defs}
  ${styles}

  <!-- Studio Canvas Container -->
  ${container}

  <!-- Left Column: Personal Introduction & Core Credentials -->
  <g transform="translate(64, 88)">
    <!-- Editorial Domain Tag -->
    <text x="0" y="0" class="editorial-tag">
      AI/ML ENGINEER · FULL-STACK DEVELOPER
    </text>

    <!-- Large Impact Name -->
    <text x="0" y="64" class="hero-name">
      ${escapeXml(config.identity.name)}
    </text>

    <!-- Professional Tagline Statement -->
    <g transform="translate(0, 116)">
      <text x="0" y="0" class="body-intro">
        Building intelligent software, practical AI systems,
      </text>
      <text x="0" y="32" class="body-intro">
        and open-source products that solve real problems.
      </text>
    </g>

    <!-- Verified Credential Showcase Card -->
    <g transform="translate(0, 206)">
      <rect x="0" y="0" width="490" height="80" rx="16" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.2" />

      <!-- Left Accent Notch -->
      <path d="M 0 16 Q 0 0 16 0 L 20 0 L 0 20 Z" fill="${colors.neonCyan}" opacity="0.8" />

      <!-- Verified Icon -->
      <circle cx="44" cy="40" r="18" fill="#00D9F518" stroke="${colors.neonCyan}" stroke-width="1.2" />
      <path d="M 36 40 L 41 45 L 52 34" fill="none" stroke="${colors.neonCyan}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Credential Titles -->
      <text x="76" y="33" font-family="${fonts.display}" font-size="18.5" font-weight="700" fill="${colors.textPrimary}">
        ${escapeXml(config.credentials[0].title)}
      </text>
      <text x="76" y="56" font-family="${fonts.display}" font-size="14" font-weight="500" fill="${colors.textSecondary}">
        Certified by Redis · Public Credential
      </text>

      <!-- Verified Pill -->
      <g transform="translate(382, 26)">
        <rect x="0" y="0" width="88" height="28" rx="14" fill="#10B98118" stroke="${colors.emeraldGreen}" stroke-width="1" />
        <circle cx="15" cy="14" r="3.5" fill="${colors.emeraldGreen}" />
        <text x="26" y="19.5" font-family="${fonts.mono}" font-size="12" font-weight="700" fill="${colors.emeraldGreen}">
          VERIFIED
        </text>
      </g>
    </g>

    <!-- Location & Direct Link Metadata -->
    <g transform="translate(4, 332)">
      <text x="0" y="0" class="meta-label">
        📍 ${escapeXml(config.identity.location)}   ·   @${escapeXml(config.identity.handle)}
      </text>
    </g>
  </g>

  <!-- Right Column: Cinematic Portrait Centerpiece -->
  <g transform="translate(590, 80)">
    <!-- Soft Background Radial Halo -->
    <circle cx="170" cy="220" r="230" fill="url(#${panelId}-portrait-glow)" opacity="0.9" />

    <!-- Subtle Orbiting Geometric Ring -->
    <circle cx="170" cy="220" r="200" fill="none" stroke="${colors.neonCyan}" stroke-width="1" stroke-dasharray="12 24" opacity="0.3" class="${panelId}-halo-spin" />
    <circle cx="170" cy="220" r="185" fill="none" stroke="${colors.electricBlue}" stroke-width="1.2" opacity="0.25" />

    <!-- Portrait Container Card with Drop Shadow -->
    <g filter="url(#${panelId}-card-shadow)">
      <rect x="0" y="0" width="340" height="440" rx="24" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.5" />

      <!-- Base64 Portrait Clipped to Rounded Rectangle -->
      <g clip-path="url(#${panelId}-portrait-rounded)">
        <image href="${portraitBase64}" x="-10" y="-10" width="360" height="460" preserveAspectRatio="xMidYMid slice" />
      </g>

      <!-- Elegant Rim Lighting Stroke -->
      <rect x="0" y="0" width="340" height="440" rx="24" fill="none" stroke="${colors.neonCyan}" stroke-width="1.5" opacity="0.65" />

      <!-- Clean Floating Identity Badge -->
      <g transform="translate(24, 382)">
        <rect x="0" y="0" width="292" height="40" rx="20" fill="${colors.bgDark}" fill-opacity="0.92" stroke="${colors.borderSubtle}" stroke-width="1" />
        <circle cx="22" cy="20" r="4.5" fill="${colors.emeraldGreen}" />
        <circle class="${panelId}-beacon-anim" cx="22" cy="20" r="4.5" fill="none" stroke="${colors.emeraldGreen}" stroke-width="1.5" />
        <text x="36" y="26" font-family="${fonts.display}" font-size="15" font-weight="600" fill="${colors.textPrimary}">
          AI &amp; Full-Stack Builder
        </text>
      </g>
    </g>
  </g>
</svg>
`;
}
