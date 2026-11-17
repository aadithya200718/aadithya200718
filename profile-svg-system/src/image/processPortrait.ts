import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project paths
const ASSETS_DIR = path.resolve(__dirname, '../../assets');
const PHOTOS_DIR = path.resolve(ASSETS_DIR, 'photos');
const GENERATED_DIR = path.resolve(ASSETS_DIR, 'generated');

// Locate raw portrait with robust fallback
function findRawPortraitPath(): string {
  const candidates = [
    path.resolve(PHOTOS_DIR, 'portrait-raw.png'),
    path.resolve(PHOTOS_DIR, 'Neon Blue Cyber Tech Portrait.png'),
    path.resolve(__dirname, '../../../Neon Blue Cyber Tech Portrait.png'),
    path.resolve(__dirname, '../../Neon Blue Cyber Tech Portrait.png')
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(`Raw portrait source not found in: ${candidates.join(', ')}`);
}

export interface DerivedCrops {
  heroPath: string;
  badgePath: string;
  connectPath: string;
}

/**
 * Derives three production-quality cyber portrait assets from raw portrait:
 * 1. Hero bust crop (540x610)
 * 2. Badge/ID crop (400x400)
 * 3. Connect avatar crop (360x360)
 */
export async function processPortraits(): Promise<DerivedCrops> {
  const rawPath = findRawPortraitPath();
  console.log(`[Portrait Engine] Found raw portrait: ${rawPath}`);

  if (!fs.existsSync(GENERATED_DIR)) {
    fs.mkdirSync(GENERATED_DIR, { recursive: true });
  }

  const meta = await sharp(rawPath).metadata();
  console.log(`[Portrait Engine] Source dimensions: ${meta.width}x${meta.height}`);

  const heroDest = path.resolve(GENERATED_DIR, 'hero-portrait.png');
  const badgeDest = path.resolve(GENERATED_DIR, 'badge-portrait.png');
  const connectDest = path.resolve(GENERATED_DIR, 'connect-portrait.png');

  // 1. HERO CROP: Upper body & bust (head + shoulders + upper chest, centered HUD ring)
  // Box: x: 175 to 947 (w: 772), y: 40 to 910 (h: 870)
  await sharp(rawPath)
    .extract({ left: 175, top: 40, width: 772, height: 870 })
    .resize(540, 610, { fit: 'cover', position: 'center' })
    .sharpen({ sigma: 1.1, m1: 0.6, m2: 2.0 })
    .modulate({ brightness: 1.02, saturation: 1.08 })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(heroDest);
  console.log(`[Portrait Engine] Hero bust crop generated: ${heroDest}`);

  // 2. BADGE CROP: Square head & shoulders framing for ID cards / telemetry
  // Box: x: 270 to 852 (w: 582), y: 45 to 627 (h: 582)
  await sharp(rawPath)
    .extract({ left: 270, top: 45, width: 582, height: 582 })
    .resize(400, 400, { fit: 'cover', position: 'center' })
    .sharpen({ sigma: 1.1, m1: 0.5, m2: 2.0 })
    .modulate({ brightness: 1.03, saturation: 1.05 })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(badgeDest);
  console.log(`[Portrait Engine] Badge crop generated: ${badgeDest}`);

  // 3. CONNECT CROP: Circular / avatar focus for communication terminal
  // Box: x: 290 to 830 (w: 540), y: 40 to 580 (h: 540)
  await sharp(rawPath)
    .extract({ left: 290, top: 40, width: 540, height: 540 })
    .resize(360, 360, { fit: 'cover', position: 'center' })
    .sharpen({ sigma: 1.15, m1: 0.6, m2: 2.2 })
    .modulate({ brightness: 1.04, saturation: 1.08 })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(connectDest);
  console.log(`[Portrait Engine] Connect avatar crop generated: ${connectDest}`);

  return {
    heroPath: heroDest,
    badgePath: badgeDest,
    connectPath: connectDest
  };
}

/**
 * Returns Base64 Data URI for a given crop type for embedding into self-contained SVGs.
 */
export function getPortraitBase64(cropType: 'hero' | 'badge' | 'connect'): string {
  const filename = `${cropType}-portrait.png`;
  const filePath = path.resolve(GENERATED_DIR, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Derived portrait not found at ${filePath}. Run 'npm run process-portraits' first.`
    );
  }

  const buf = fs.readFileSync(filePath);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

// Allow direct CLI invocation
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  processPortraits()
    .then(() => console.log('[Portrait Engine] All portrait crops successfully generated.'))
    .catch((err) => {
      console.error('[Portrait Engine] Error generating portraits:', err);
      process.exit(1);
    });
}
