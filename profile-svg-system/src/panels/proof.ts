import { ProfileConfig, ProjectItem } from '../types/index.js';
import { generateCommonDefs } from '../core/theme.js';
import { generateCommonStyles } from '../core/typography.js';
import { renderStudioContainer, renderEditorialHeader } from '../core/layout.js';
import { escapeXml } from '../core/utils.js';

export function generateProofPanel(config: ProfileConfig): string {
  const panelId = 'proof';
  const width = config.theme.width; // 1000
  const height = 860;
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
    'Featured Projects.',
    'A selection of recent platforms, agentic engines, and production systems.',
    config.theme,
    64,
    88
  );

  const projects = config.projects;

  // Helper to render top large flagship card (422x260)
  function renderFlagshipCard(
    proj: ProjectItem,
    x: number,
    y: number,
    w: number,
    h: number,
    accentColor: string,
    line1: string,
    line2: string
  ): string {
    const techTags = proj.tech
      .slice(0, 3)
      .map((t, idx) => {
        const tagX = idx * 96;
        return `
        <rect x="${tagX}" y="0" width="86" height="28" rx="14" fill="${colors.bgElevated}" stroke="${colors.borderSubtle}" stroke-width="1" />
        <text x="${tagX + 43}" y="19" font-family="${fonts.mono}" font-size="13" font-weight="600" fill="${colors.textPrimary}" text-anchor="middle">
          ${escapeXml(t)}
        </text>
      `;
      })
      .join('\n');

    return `
      <g transform="translate(${x}, ${y})">
        <!-- Card Container Surface -->
        <rect x="0" y="0" width="${w}" height="${h}" rx="22" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.2" />

        <!-- Top Accent Rail -->
        <path d="M 24 0 L ${w - 24} 0" stroke="${accentColor}" stroke-width="2.5" opacity="0.85" />

        <!-- Project Name -->
        <text x="32" y="48" font-family="${fonts.display}" font-size="28" font-weight="800" fill="${colors.textPrimary}">
          ${escapeXml(proj.name)}
        </text>

        <!-- Focus Tagline -->
        <text x="32" y="76" font-family="${fonts.display}" font-size="16" font-weight="600" fill="${accentColor}">
          ${escapeXml(proj.tagline)}
        </text>

        <!-- Description (2 Clean Lines) -->
        <g transform="translate(32, 114)">
          <text x="0" y="0" font-family="${fonts.body}" font-size="16.5" fill="${colors.textSecondary}">
            ${escapeXml(line1)}
          </text>
          <text x="0" y="26" font-family="${fonts.body}" font-size="16.5" fill="${colors.textSecondary}">
            ${escapeXml(line2)}
          </text>
        </g>

        <!-- Tech Tags Row -->
        <g transform="translate(32, 198)">
          ${techTags}
        </g>
      </g>
    `;
  }

  // Word-wrap helper breaking ONLY at word boundaries
  function wrapWords(text: string, maxLen: number = 28): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let cur = '';

    for (const w of words) {
      if ((cur + ' ' + w).trim().length <= maxLen) {
        cur = (cur + ' ' + w).trim();
      } else {
        if (cur) lines.push(cur);
        cur = w;
      }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  // Helper to render bottom row cards (274x280)
  function renderStandardCard(
    proj: ProjectItem,
    x: number,
    y: number,
    w: number,
    h: number,
    accentColor: string,
    descLine1: string,
    descLine2: string
  ): string {
    const techTags = proj.tech
      .slice(0, 3)
      .map((t, idx) => {
        const displayTag = t === 'Machine Learning' ? 'ML' : t;
        const tagX = idx * 72;
        return `
        <rect x="${tagX}" y="0" width="66" height="26" rx="13" fill="${colors.bgElevated}" stroke="${colors.borderSubtle}" stroke-width="1" />
        <text x="${tagX + 33}" y="17.5" font-family="${fonts.mono}" font-size="11.5" font-weight="600" fill="${colors.textPrimary}" text-anchor="middle">
          ${escapeXml(displayTag)}
        </text>
      `;
      })
      .join('\n');

    return `
      <g transform="translate(${x}, ${y})">
        <!-- Card Container Surface -->
        <rect x="0" y="0" width="${w}" height="${h}" rx="20" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.2" />

        <!-- Top Accent Rail -->
        <path d="M 20 0 L ${w - 20} 0" stroke="${accentColor}" stroke-width="2" opacity="0.8" />

        <!-- Project Name -->
        <text x="24" y="44" font-family="${fonts.display}" font-size="24" font-weight="800" fill="${colors.textPrimary}">
          ${escapeXml(proj.name)}
        </text>

        <!-- Tagline -->
        <text x="24" y="68" font-family="${fonts.display}" font-size="13.5" font-weight="600" fill="${accentColor}">
          ${escapeXml(proj.tagline)}
        </text>

        <!-- Description (Clean 2-line concise purpose) -->
        <g transform="translate(24, 102)">
          <text x="0" y="0" font-family="${fonts.body}" font-size="14.5" fill="${colors.textSecondary}">
            ${escapeXml(descLine1)}
          </text>
          <text x="0" y="24" font-family="${fonts.body}" font-size="14.5" fill="${colors.textSecondary}">
            ${escapeXml(descLine2)}
          </text>
        </g>

        <!-- Tech Tags -->
        <g transform="translate(24, 186)">
          ${techTags}
        </g>

        <!-- Verified Note or Highlight -->
        <g transform="translate(24, 244)">
          <circle cx="4" cy="-2" r="3" fill="${accentColor}" />
          <text x="14" y="2" font-family="${fonts.mono}" font-size="11.5" font-weight="600" fill="${colors.textMuted}">
            ${proj.isVerifiedPublicRepo && proj.githubUrl ? `GitHub: ${escapeXml(proj.githubUrl.replace('https://github.com/aadithya200718/', ''))}` : escapeXml(proj.category)}
          </text>
        </g>
      </g>
    `;
  }

  // Layout: 2 Flagship cards on top (w: 422, h: 260) + 3 Standard cards on bottom (w: 274, h: 280)
  const card1 = renderFlagshipCard(
    projects[0],
    64,
    184,
    422,
    260,
    colors.neonCyan,
    'Adaptive cognitive platform synthesizing learner',
    'progression with mastery algorithms.'
  );

  const card2 = renderFlagshipCard(
    projects[1],
    514,
    184,
    422,
    260,
    colors.electricBlue,
    'Autonomous AI agent runtime executing multi-step',
    'reasoning and automated synthesis pipelines.'
  );

  const card3 = renderStandardCard(
    projects[2],
    64,
    474,
    274,
    280,
    colors.emeraldGreen,
    'Real-time blood supply network linking',
    'emergency requests, donors, & hospitals.'
  ); // BloodSync

  const card4 = renderStandardCard(
    projects[3],
    363,
    474,
    274,
    280,
    colors.electricBlue,
    'Integrated healthcare clinical portal',
    'managing diagnostic queues & schedules.'
  ); // Medconnect

  const card5 = renderStandardCard(
    projects[4],
    662,
    474,
    274,
    280,
    colors.violetMagenta,
    'AI travel guide generating personalized',
    'cultural itineraries in regional Tamil.'
  ); // Tamil AI Travel

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="Featured Projects - Manaadithya S.">
  ${defs}
  ${styles}

  <!-- Studio Container -->
  ${container}

  <!-- Section Header -->
  ${header}

  <!-- Flagship Cards (Top Row) -->
  ${card1}
  ${card2}

  <!-- Project Cards (Bottom Row) -->
  ${card3}
  ${card4}
  ${card5}
</svg>
`;
}
