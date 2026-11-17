import { ProfileConfig } from '../types/index.js';
import { generateCommonDefs } from '../core/theme.js';
import { generateCommonStyles } from '../core/typography.js';
import { renderStudioContainer } from '../core/layout.js';
import { escapeXml } from '../core/utils.js';

export function generateConnectPanel(
  config: ProfileConfig,
  portraitBase64: string
): string {
  const panelId = 'connect';
  const width = config.theme.width; // 1000
  const height = 580;
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Let's Connect - Manaadithya S.">
  ${defs}
  ${styles}

  <!-- Studio Container -->
  ${container}

  <!-- Top Hero Header with Clean Portrait Halo -->
  <g transform="translate(64, 80)">
    <!-- Circular Headshot Avatar with Glow -->
    <g transform="translate(0, 0)">
      <!-- Soft Radial Glow Behind Avatar -->
      <circle cx="70" cy="70" r="95" fill="url(#${panelId}-portrait-glow)" opacity="0.8" />
      <circle cx="70" cy="70" r="76" fill="none" stroke="${colors.neonCyan}" stroke-width="1.5" stroke-dasharray="8 16" opacity="0.4" class="${panelId}-halo-spin" />

      <!-- Avatar Image -->
      <g filter="url(#${panelId}-card-shadow)">
        <circle cx="70" cy="70" r="68" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="2" />
        <g clip-path="url(#${panelId}-avatar-circle)">
          <image href="${portraitBase64}" x="0" y="0" width="140" height="140" preserveAspectRatio="xMidYMid slice" />
        </g>
        <circle cx="70" cy="70" r="68" fill="none" stroke="${colors.neonCyan}" stroke-width="2" opacity="0.85" />
      </g>
    </g>

    <!-- Editorial Call to Action Title -->
    <g transform="translate(180, 20)">
      <text x="0" y="0" class="section-title">
        Let's Build Something Great.
      </text>
      <text x="0" y="36" font-family="${fonts.display}" font-size="18" font-weight="500" fill="${colors.textSecondary}">
        Open to meaningful collaborations, ambitious ideas, and projects that make an impact.
      </text>

      <!-- Active Status Indicator Pill -->
      <g transform="translate(0, 72)">
        <rect x="0" y="0" width="280" height="32" rx="16" fill="#10B98115" stroke="${colors.emeraldGreen}" stroke-width="1" />
        <circle cx="16" cy="16" r="4.5" fill="${colors.emeraldGreen}" />
        <circle class="${panelId}-beacon-anim" cx="16" cy="16" r="4.5" fill="none" stroke="${colors.emeraldGreen}" stroke-width="1.5" />
        <text x="28" y="21.5" font-family="${fonts.display}" font-size="14.5" font-weight="600" fill="${colors.emeraldGreen}">
          Available for High-Impact Roles &amp; Projects
        </text>
      </g>
    </g>
  </g>

  <!-- Bottom Row: 2 Spacious Direct Action Cards -->
  <g transform="translate(64, 330)">
    <!-- GitHub Action Card -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="422" height="155" rx="22" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.2" />
      <path d="M 24 0 L 398 0" stroke="${colors.neonCyan}" stroke-width="2.5" opacity="0.85" />

      <!-- GitHub Icon -->
      <rect x="28" y="32" width="56" height="56" rx="16" fill="${colors.bgElevated}" stroke="${colors.neonCyan}" stroke-width="1.2" />
      <svg x="40" y="44" width="32" height="32" viewBox="0 0 16 16" fill="${colors.textPrimary}">
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
      </svg>

      <!-- Text Details -->
      <text x="102" y="54" font-family="${fonts.display}" font-size="22" font-weight="700" fill="${colors.textPrimary}">
        GitHub Profile
      </text>
      <text x="102" y="78" font-family="${fonts.display}" font-size="15" font-weight="500" fill="${colors.textSecondary}">
        @${escapeXml(config.identity.handle)} · Open-Source
      </text>
      <text x="102" y="106" font-family="${fonts.mono}" font-size="15" font-weight="600" fill="${colors.neonCyan}">
        github.com/${escapeXml(config.identity.handle)}
      </text>

      <!-- Full URL Text (Verified Target) -->
      <text x="102" y="128" font-family="${fonts.mono}" font-size="11" fill="${colors.textMuted}" opacity="0.65">
        https://github.com/${escapeXml(config.identity.handle)}
      </text>

      <!-- Arrow Glyph -->
      <text x="384" y="58" font-family="${fonts.display}" font-size="26" font-weight="600" fill="${colors.neonCyan}" text-anchor="end">
        ↗
      </text>
    </g>

    <!-- LinkedIn Action Card -->
    <g transform="translate(450, 0)">
      <rect x="0" y="0" width="422" height="155" rx="22" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.2" />
      <path d="M 24 0 L 398 0" stroke="${colors.electricBlue}" stroke-width="2.5" opacity="0.85" />

      <!-- LinkedIn Icon -->
      <rect x="28" y="32" width="56" height="56" rx="16" fill="${colors.bgElevated}" stroke="${colors.electricBlue}" stroke-width="1.2" />
      <svg x="40" y="44" width="32" height="32" viewBox="0 0 24 24" fill="${colors.electricBlue}">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V9.93H5.06v8.57h2.8Z" />
      </svg>

      <!-- Text Details -->
      <text x="102" y="54" font-family="${fonts.display}" font-size="22" font-weight="700" fill="${colors.textPrimary}">
        LinkedIn Network
      </text>
      <text x="102" y="78" font-family="${fonts.display}" font-size="15" font-weight="500" fill="${colors.textSecondary}">
        ${escapeXml(config.identity.name)} · Professional
      </text>
      <text x="102" y="106" font-family="${fonts.mono}" font-size="13.5" font-weight="600" fill="${colors.electricBlue}">
        linkedin.com/in/manaadithya-s-606142271
      </text>

      <!-- Full URL Text (Verified Target) -->
      <text x="102" y="128" font-family="${fonts.mono}" font-size="10.5" fill="${colors.textMuted}" opacity="0.65">
        https://www.linkedin.com/in/manaadithya-s-606142271
      </text>

      <!-- Arrow Glyph -->
      <text x="384" y="58" font-family="${fonts.display}" font-size="26" font-weight="600" fill="${colors.electricBlue}" text-anchor="end">
        ↗
      </text>
    </g>
  </g>
</svg>
`;
}
