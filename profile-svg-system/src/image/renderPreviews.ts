import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../../..');
const GENERATED_DIR = path.resolve(ROOT_DIR, 'assets/generated');

async function renderPreviews() {
  console.log('[PNG Renderer] Rendering high-res PNG previews from SVGs...');

  const panels = [
    { name: 'hero', file: 'hero.svg', out: 'preview-hero.png' },
    { name: 'about', file: 'about.svg', out: 'preview-about.png' },
    { name: 'stack', file: 'stack.svg', out: 'preview-stack.png' },
    { name: 'proof', file: 'proof.svg', out: 'preview-proof.png' },
    { name: 'connect', file: 'connect.svg', out: 'preview-connect.png' }
  ];

  const renderedBuffers: { buffer: Buffer; info: sharp.OutputInfo }[] = [];

  for (const panel of panels) {
    const svgPath = path.resolve(GENERATED_DIR, panel.file);
    const pngPath = path.resolve(GENERATED_DIR, panel.out);

    if (!fs.existsSync(svgPath)) {
      throw new Error(`SVG file not found: ${svgPath}`);
    }

    const svgBuffer = fs.readFileSync(svgPath);
    // Render at 1000px width with high density for crisp text
    const { data, info } = await sharp(svgBuffer, { density: 150 })
      .resize({ width: 1000 })
      .png()
      .toBuffer({ resolveWithObject: true });

    fs.writeFileSync(pngPath, data);
    console.log(`  ✓ Rendered ${panel.out} (${info.width}x${info.height}, ${(data.length / 1024).toFixed(1)} KB)`);
    renderedBuffers.push({ buffer: data, info });
  }

  // Generate complete vertically stacked README-style preview
  console.log('\n[PNG Renderer] Stitched vertical README-style composite...');
  const GAP = 28;
  const PADDING = 40;
  const totalHeight = renderedBuffers.reduce((sum, item) => sum + item.info.height + GAP, 0) + PADDING * 2 - GAP;
  const canvasWidth = 1000 + PADDING * 2;

  let currentY = PADDING;
  const compositeList: sharp.OverlayOptions[] = [];

  for (const item of renderedBuffers) {
    compositeList.push({
      input: item.buffer,
      top: currentY,
      left: PADDING
    });
    currentY += item.info.height + GAP;
  }

  const stackedImage = await sharp({
    create: {
      width: canvasWidth,
      height: totalHeight,
      channels: 4,
      background: { r: 5, g: 9, b: 18, alpha: 1 } // #050912 deep dark background
    }
  })
    .composite(compositeList)
    .png()
    .toBuffer();

  const stackedPath = path.resolve(GENERATED_DIR, 'preview-full-readme.png');
  fs.writeFileSync(stackedPath, stackedImage);
  console.log(`  ✓ Stitched preview-full-readme.png (${canvasWidth}x${totalHeight}, ${(stackedImage.length / 1024).toFixed(1)} KB)`);
  console.log('[PNG Renderer] All previews successfully updated!');
}

renderPreviews().catch((err) => {
  console.error('[PNG Renderer] Error rendering previews:', err);
  process.exit(1);
});
