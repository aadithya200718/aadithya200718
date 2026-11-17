import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { profileConfig } from './config/profile.config.js';
import { processPortraits, getPortraitBase64 } from './image/processPortrait.js';
import { verifyClaims } from './data/verifyClaims.js';
import { generateHeroPanel } from './panels/hero.js';
import { generateAboutPanel } from './panels/about.js';
import { generateStackPanel } from './panels/stack.js';
import { generateProofPanel } from './panels/proof.js';
import { generateConnectPanel } from './panels/connect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_DIR = path.resolve(__dirname, '..');
const ROOT_DIR = path.resolve(__dirname, '../..');
const SYSTEM_GENERATED_DIR = path.resolve(SYSTEM_DIR, 'assets/generated');
const ROOT_GENERATED_DIR = path.resolve(ROOT_DIR, 'assets/generated');

/**
 * Builds the GitHub profile README.md string with proper SVG panel sequencing.
 */
function buildReadmeContent(): string {
  const { identity, socials } = profileConfig;

  return `<div align="center">

<!-- ========================================== -->
<!-- 01: HERO & IDENTITY PANEL                  -->
<!-- ========================================== -->
<a href="${socials.github}">
  <img src="assets/generated/hero.svg" width="100%" alt="${identity.name} - Hero Overview" />
</a>

<br/>

<!-- ========================================== -->
<!-- 02: CAPABILITIES & ARCHITECTURE DOMAINS     -->
<!-- ========================================== -->
<img src="assets/generated/about.svg" width="100%" alt="${identity.name} - Core Capabilities" />

<br/>

<!-- ========================================== -->
<!-- 03: TECHNICAL ARSENAL & TELEMETRY          -->
<!-- ========================================== -->
<img src="assets/generated/stack.svg" width="100%" alt="${identity.name} - Technical Stack" />

<br/>

<!-- ========================================== -->
<!-- 04: FEATURED EXECUTION & VERIFIED WORK     -->
<!-- ========================================== -->
<img src="assets/generated/proof.svg" width="100%" alt="${identity.name} - Featured Proof of Work" />

<br/>

<!-- ========================================== -->
<!-- 05: TRANSMISSION GATEWAY & DIRECT CHANNELS -->
<!-- ========================================== -->
<a href="${socials.linkedin}">
  <img src="assets/generated/connect.svg" width="100%" alt="${identity.name} - Connect Gateway" />
</a>

<br/>

<!-- ========================================== -->
<!-- QUICK TEXT LINKS & METRICS NAVIGATION      -->
<!-- ========================================== -->
<p align="center">
  <a href="${socials.github}"><strong>GitHub Profile</strong></a> &nbsp;•&nbsp;
  <a href="${socials.linkedin}"><strong>LinkedIn Network</strong></a> &nbsp;•&nbsp;
  <a href="https://github.com/${identity.handle}?tab=repositories"><strong>Public Repositories</strong></a>
</p>

<sub>Built with an original code-generated SVG pipeline. Self-contained, responsive, and verifiable.</sub>

</div>
`;
}

/**
 * Master build pipeline
 */
export async function buildVisualSystem() {
  console.log('====================================================');
  console.log(' [Master Pipeline] Commencing GitHub Profile SVG Build ');
  console.log('====================================================');

  // Step 1: Ensure directories exist
  for (const dir of [SYSTEM_GENERATED_DIR, ROOT_GENERATED_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  // Step 2: Process portrait crops
  console.log('\n[Step 1/5] Processing portrait assets...');
  await processPortraits();
  const heroPortraitBase64 = getPortraitBase64('hero');
  const connectPortraitBase64 = getPortraitBase64('connect');

  // Step 3: Run factual claim audit
  console.log('\n[Step 2/5] Running factual verification audit...');
  await verifyClaims();

  // Step 4: Generate 5 SVG panels
  console.log('\n[Step 3/5] Generating 5 original SVG panels...');
  const panels: Record<string, string> = {
    'hero.svg': generateHeroPanel(profileConfig, heroPortraitBase64),
    'about.svg': generateAboutPanel(profileConfig),
    'stack.svg': generateStackPanel(profileConfig),
    'proof.svg': generateProofPanel(profileConfig),
    'connect.svg': generateConnectPanel(profileConfig, connectPortraitBase64)
  };

  for (const [filename, svgContent] of Object.entries(panels)) {
    const trimmedSvg = svgContent.trim() + '\n';

    // Write to profile-svg-system/assets/generated/
    const sysDest = path.resolve(SYSTEM_GENERATED_DIR, filename);
    fs.writeFileSync(sysDest, trimmedSvg, 'utf8');

    // Write to root assets/generated/
    const rootDest = path.resolve(ROOT_GENERATED_DIR, filename);
    fs.writeFileSync(rootDest, trimmedSvg, 'utf8');

    const sizeKb = (Buffer.byteLength(trimmedSvg, 'utf8') / 1024).toFixed(1);
    console.log(`  ✓ Generated ${filename} (${sizeKb} KB)`);
  }

  // Step 5: Write GitHub README.md
  console.log('\n[Step 4/5] Generating GitHub Profile README.md...');
  const readmeContent = buildReadmeContent();

  const sysReadme = path.resolve(SYSTEM_DIR, 'README.md');
  const rootReadme = path.resolve(ROOT_DIR, 'README.md');
  fs.writeFileSync(sysReadme, readmeContent, 'utf8');
  fs.writeFileSync(rootReadme, readmeContent, 'utf8');
  console.log(`  ✓ Written ${sysReadme}`);
  console.log(`  ✓ Written ${rootReadme}`);

  console.log('\n====================================================');
  console.log(' [Master Pipeline] Build complete without errors!   ');
  console.log('====================================================');
}

// Allow direct CLI invocation
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildVisualSystem()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Master Pipeline] Fatal build error:', err);
      process.exit(1);
    });
}
