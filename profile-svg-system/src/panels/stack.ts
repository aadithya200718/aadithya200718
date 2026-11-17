import { ProfileConfig } from '../types/index.js';
import { generateCommonDefs } from '../core/theme.js';
import { generateCommonStyles } from '../core/typography.js';
import { renderStudioContainer, renderEditorialHeader } from '../core/layout.js';
import { escapeXml } from '../core/utils.js';

export function generateStackPanel(config: ProfileConfig): string {
  const panelId = 'stack';
  const width = config.theme.width; // 1000
  const height = 700;
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
    'My Tech Stack.',
    'Technologies and tools I use to build scalable, intelligent software.',
    config.theme,
    64,
    88
  );

  interface TechTile {
    name: string;
    sub: string;
    tag?: string;
    iconSymbol: string;
  }

  interface TechGroup {
    title: string;
    accent: string;
    iconSvg: string;
    tiles: TechTile[];
  }

  const groups: TechGroup[] = [
    {
      title: 'Languages & Frontend',
      accent: colors.neonCyan,
      iconSvg: `<path d="M 4 8 L 12 16 L 4 24 M 14 24 L 22 24" fill="none" stroke="${colors.neonCyan}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`,
      tiles: [
        { name: 'Python', sub: 'Core Language & ML', iconSymbol: 'Py' },
        { name: 'TypeScript', sub: 'Type-Safe Full-Stack', iconSymbol: 'TS' },
        { name: 'React', sub: 'Frontend Architecture', iconSymbol: 'Re' },
        { name: 'Next.js', sub: 'Production Web Runtimes', iconSymbol: 'Nx' }
      ]
    },
    {
      title: 'Backend & Infrastructure',
      accent: colors.electricBlue,
      iconSvg: `<rect x="3" y="5" width="22" height="8" rx="2" fill="none" stroke="${colors.electricBlue}" stroke-width="1.8" /><rect x="3" y="16" width="22" height="8" rx="2" fill="none" stroke="${colors.electricBlue}" stroke-width="1.8" /><circle cx="7" cy="9" r="1.5" fill="${colors.electricBlue}" /><circle cx="7" cy="20" r="1.5" fill="${colors.electricBlue}" />`,
      tiles: [
        { name: 'FastAPI', sub: 'Async API Services', iconSymbol: 'FA' },
        { name: 'Node.js', sub: 'Event-Driven Services', iconSymbol: 'JS' },
        { name: 'PostgreSQL', sub: 'Relational Persistence', iconSymbol: 'PG' },
        { name: 'Redis', sub: 'In-Memory Cache', tag: 'Certified', iconSymbol: 'Rd' }
      ]
    },
    {
      title: 'AI & Machine Learning',
      accent: colors.violetMagenta,
      iconSvg: `<circle cx="14" cy="14" r="10" fill="none" stroke="${colors.violetMagenta}" stroke-width="1.8" /><circle cx="14" cy="14" r="3.5" fill="${colors.violetMagenta}" /><line x1="14" y1="4" x2="14" y2="7" stroke="${colors.violetMagenta}" stroke-width="2" /><line x1="14" y1="21" x2="14" y2="24" stroke="${colors.violetMagenta}" stroke-width="2" /><line x1="4" y1="14" x2="7" y2="14" stroke="${colors.violetMagenta}" stroke-width="2" /><line x1="21" y1="14" x2="24" y2="14" stroke="${colors.violetMagenta}" stroke-width="2" />`,
      tiles: [
        { name: 'Machine Learning', sub: 'Models & Inference', iconSymbol: 'ML' },
        { name: 'Neural Networks', sub: 'Architectures & Weights', iconSymbol: 'NN' },
        { name: 'Agentic Workflows', sub: 'Tool Calling & Memory', iconSymbol: 'Ag' },
        { name: 'LLM Orchestration', sub: 'Reasoning Runtimes', iconSymbol: 'AI' }
      ]
    }
  ];

  function renderGroupCol(group: TechGroup, colX: number, startY: number, colW: number): string {
    const tilesSvg = group.tiles
      .map((tile, idx) => {
        const tileY = startY + 54 + idx * 98;
        return `
        <g transform="translate(${colX}, ${tileY})">
          <!-- Tile Card -->
          <rect x="0" y="0" width="${colW}" height="84" rx="16" fill="${colors.bgCard}" stroke="${colors.borderSubtle}" stroke-width="1.2" />

          <!-- Left Tech Glyph Badge -->
          <rect x="18" y="18" width="48" height="48" rx="12" fill="${colors.bgElevated}" stroke="${group.accent}" stroke-width="1.2" opacity="0.9" />
          <text x="42" y="49" font-family="${fonts.mono}" font-size="16" font-weight="800" fill="${group.accent}" text-anchor="middle">
            ${escapeXml(tile.iconSymbol)}
          </text>

          <!-- Tech Name -->
          <text x="78" y="42" font-family="${fonts.display}" font-size="20" font-weight="700" fill="${colors.textPrimary}">
            ${escapeXml(tile.name)}
          </text>

          <!-- Subtitle / Role -->
          <text x="78" y="63" font-family="${fonts.display}" font-size="14.5" font-weight="400" fill="${colors.textSecondary}">
            ${escapeXml(tile.sub)}
          </text>

          ${
            tile.tag
              ? `
          <!-- Cloud Certified Tag for Redis -->
          <g transform="translate(${colW - 88}, 16)">
            <rect x="0" y="0" width="72" height="22" rx="11" fill="#10B98118" stroke="${colors.emeraldGreen}" stroke-width="1" />
            <text x="36" y="15" font-family="${fonts.mono}" font-size="10.5" font-weight="700" fill="${colors.emeraldGreen}" text-anchor="middle">
              ${escapeXml(tile.tag)}
            </text>
          </g>`
              : ''
          }
        </g>
      `;
      })
      .join('\n');

    return `
      <!-- Column Header -->
      <g transform="translate(${colX}, ${startY})">
        <svg x="0" y="-18" width="28" height="28" viewBox="0 0 28 28">
          ${group.iconSvg}
        </svg>
        <text x="36" y="4" font-family="${fonts.display}" font-size="22" font-weight="700" fill="${group.accent}">
          ${escapeXml(group.title)}
        </text>
        <line x1="0" y1="24" x2="${colW}" y2="24" stroke="${colors.borderSubtle}" stroke-width="1.2" />
        <line x1="0" y1="24" x2="60" y2="24" stroke="${group.accent}" stroke-width="2" />
      </g>

      <!-- Tiles -->
      ${tilesSvg}
    `;
  }

  const colW = 276;
  const col1 = renderGroupCol(groups[0], 64, 184, colW);
  const col2 = renderGroupCol(groups[1], 362, 184, colW);
  const col3 = renderGroupCol(groups[2], 660, 184, colW);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="My Tech Stack - Manaadithya S.">
  ${defs}
  ${styles}

  <!-- Studio Container -->
  ${container}

  <!-- Section Header -->
  ${header}

  <!-- 3 Visually Balanced Columns -->
  ${col1}
  ${col2}
  ${col3}
</svg>
`;
}
