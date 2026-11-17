/**
 * Escapes reserved XML characters.
 */
export function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Truncates string to a maximum length with ellipsis.
 */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + '…';
}

/**
 * Generates an SVG path for a rectangle with chamfered (angled 45-deg) corners.
 */
export function createChamferedPath(
  x: number,
  y: number,
  w: number,
  h: number,
  c: number = 10,
  corners: { tl?: boolean; tr?: boolean; br?: boolean; bl?: boolean } = {
    tl: true,
    tr: true,
    br: true,
    bl: true
  }
): string {
  const tl = corners.tl ?? true;
  const tr = corners.tr ?? true;
  const br = corners.br ?? true;
  const bl = corners.bl ?? true;

  const p: string[] = [];

  // Start top-left
  if (tl) {
    p.push(`M ${x + c} ${y}`);
  } else {
    p.push(`M ${x} ${y}`);
  }

  // Top edge to top-right
  if (tr) {
    p.push(`L ${x + w - c} ${y}`);
    p.push(`L ${x + w} ${y + c}`);
  } else {
    p.push(`L ${x + w} ${y}`);
  }

  // Right edge to bottom-right
  if (br) {
    p.push(`L ${x + w} ${y + h - c}`);
    p.push(`L ${x + w - c} ${y + h}`);
  } else {
    p.push(`L ${x + w} ${y + h}`);
  }

  // Bottom edge to bottom-left
  if (bl) {
    p.push(`L ${x + c} ${y + h}`);
    p.push(`L ${x} ${y + h - c}`);
  } else {
    p.push(`L ${x} ${y + h}`);
  }

  // Left edge back to top-left
  if (tl) {
    p.push(`L ${x} ${y + c}`);
    p.push(`Z`);
  } else {
    p.push(`L ${x} ${y}`);
    p.push(`Z`);
  }

  return p.join(' ');
}

/**
 * Renders corner HUD crosshairs/brackets.
 */
export function renderCornerBrackets(
  x: number,
  y: number,
  w: number,
  h: number,
  size: number = 8,
  strokeColor: string = '#00f5ff'
): string {
  return `
    <g stroke="${strokeColor}" stroke-width="1.5" stroke-linecap="square" opacity="0.75">
      <!-- TL -->
      <path d="M ${x} ${y + size} L ${x} ${y} L ${x + size} ${y}" fill="none" />
      <!-- TR -->
      <path d="M ${x + w - size} ${y} L ${x + w} ${y} L ${x + w} ${y + size}" fill="none" />
      <!-- BR -->
      <path d="M ${x + w} ${y + h - size} L ${x + w} ${y + h} L ${x + w - size} ${y + h}" fill="none" />
      <!-- BL -->
      <path d="M ${x + size} ${y + h} L ${x} ${y + h} L ${x} ${y + h - size}" fill="none" />
    </g>
  `;
}
