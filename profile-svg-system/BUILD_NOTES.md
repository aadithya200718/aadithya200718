# Build Notes & Maintenance Guide

This document outlines the architecture, operational workflow, configuration instructions, and maintenance procedures for the **Manaadithya S. GitHub Profile Visual System**.

---

## 1. Project Overview & Architecture

The visual system generates five animated, self-contained SVG panels and a GitHub profile `README.md` from a single configuration file and TypeScript generation engine.

```
/github-profile
├── assets/
│   ├── generated/           # Live production SVG panels & derived portraits
│   │   ├── hero.svg
│   │   ├── about.svg
│   │   ├── stack.svg
│   │   ├── proof.svg
│   │   ├── connect.svg
│   │   ├── hero-portrait.png
│   │   ├── badge-portrait.png
│   │   └── connect-portrait.png
│   └── photos/
│       └── portrait-raw.png # High-res master portrait source
├── profile-svg-system/      # Core generator engine & source
│   ├── src/
│   │   ├── config/          # profile.config.ts (Master Single Source of Truth)
│   │   ├── core/            # theme.ts, layout.ts, typography.ts, utils.ts
│   │   ├── data/            # fetchGithubData.ts, verifyClaims.ts
│   │   ├── image/           # processPortrait.ts (Sharp image pipeline)
│   │   ├── panels/          # hero.ts, about.ts, stack.ts, proof.ts, connect.ts
│   │   ├── tests/           # validate.ts (Automated validation suite)
│   │   ├── types/           # TypeScript interfaces
│   │   └── generate.ts      # Master build orchestration
│   ├── package.json
│   └── tsconfig.json
├── README.md                # GitHub Profile README (renders the 5 panels)
├── FACT_VERIFICATION.md     # Audit report verifying claims against live GitHub API
├── TEST_REPORT.md           # Automated test execution report
└── BUILD_NOTES.md           # This guide
```

---

## 2. Prerequisites & Installation

- **Node.js**: v20 or newer (tested on v24.20.0)
- **Package Manager**: `npm` (v10+ or v11+)

To install all dependencies:
```bash
npm install
```
*(Dependencies installed: `typescript`, `tsx`, `sharp`, `@types/node`)*

---

## 3. How to Update Profile Content

All copy, project details, skills, social links, and telemetry are managed in a single editable configuration file:

**File:** `profile-svg-system/src/config/profile.config.ts`

### Key Sections in `profile.config.ts`:

1. **Identity (`identity`)**:
   - Update `name`, `tagline`, `subTagline`, `location`, or `bioIntro`.
2. **Credentials (`credentials`)**:
   - Add or modify certifications (e.g., Redis Associate Cloud Operator).
3. **Capabilities (`capabilities`)**:
   - 5 core domain architecture blocks displayed in `about.svg`.
4. **Skills (`skills.categories`)**:
   - Grouped tech stacks: Languages, Frontend, Backend, Data, AI/ML.
   - Adjust proficiency percentages or highlight tags.
5. **Projects (`projects`)**:
   - Highlighted flagships (LearnTwin, Carynth, BloodSync, Medconnect, Tamil AI Travel).
   - Set `isVerifiedPublicRepo: true` for repositories with live public GitHub links.
6. **Socials & Links (`socials`)**:
   - GitHub and LinkedIn URLs.
7. **Theme & Colors (`theme`)**:
   - Fine-tune base palette (`#030712`), neon cyan (`#00f5ff`), electric blue (`#0066ff`), violet (`#a855f7`), or fonts.

After editing `profile.config.ts`, simply run:
```bash
npm run build
```

---

## 4. How to Add or Replace Portrait Assets

The system contains an automated portrait derivation pipeline using `sharp`.

### Replacing the Photo:
1. Place your new portrait image at:
   `profile-svg-system/assets/photos/portrait-raw.png`
   *(Supported formats: PNG, JPG, WebP)*
2. Run the portrait processing script:
   ```bash
   npm run process-portraits
   ```
   This automatically derives:
   - `hero-portrait.png` (540x610 bust crop, color-graded, sharpened, framed for hero panel)
   - `badge-portrait.png` (400x400 square crop for ID badges)
   - `connect-portrait.png` (360x360 avatar crop for connection console)
3. Regenerate the SVGs:
   ```bash
   npm run build
   ```
   The generator converts the derived PNGs to base64 Data URIs and embeds them directly inside the SVGs so that GitHub renders them with zero external network requests.

### Adjusting Crop Coordinates:
If your new photo has different framing, open `profile-svg-system/src/image/processPortrait.ts` and adjust the `{ left, top, width, height }` extraction bounding boxes.

---

## 5. How to Re-Verify Claims Against GitHub API

To re-audit profile claims and fetch live public repository counts from GitHub:

```bash
npm run verify
```

This will:
1. Query the live GitHub REST API for `aadithya200718`.
2. Inspect repository names and cross-reference featured projects.
3. Record exact timestamps and outputs into `FACT_VERIFICATION.md` and `assets/generated/verification-data.json`.

*(Optional: Set `GITHUB_TOKEN=your_token` in your environment to avoid GitHub API rate limits if making frequent requests).*

---

## 6. How to Run the Automated Validation Suite

To verify that all outputs are valid, self-contained, and conform to all specifications:

```bash
npm test
```

The test runner will validate:
- **Output Existence**: Confirms all 5 SVG panels and 3 PNG crops exist and have non-trivial size.
- **XML / SVG Validity**: Checks `<svg>` root tags, `xmlns`, `viewBox="0 0 900 H"`, and `role="img"`.
- **Self-Containment**: Asserts zero external HTTP/HTTPS requests and verifies base64 data URIs.
- **Factual Integrity**: Asserts correct rendering of legal name, tagline, credentials, 9 core skills, and 5 projects.
- **README Path Integrity**: Asserts that relative links inside `README.md` point to existing files on disk.

Results are documented automatically in `TEST_REPORT.md`.

---

## 7. Command Cheat Sheet

| Command | Action |
| :--- | :--- |
| `npm run build` | Full master build (processes portraits, audits facts, renders 5 SVGs, writes README) |
| `npm run process-portraits` | Derives optimized bust, badge, and connect crops from raw photo |
| `npm run verify` | Audits public GitHub user data and generates `FACT_VERIFICATION.md` |
| `npm test` | Runs the full 30+ automated assertion test suite and updates `TEST_REPORT.md` |

---

## 8. Deploying to GitHub Profile

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: complete cyber animated svg visual profile system"
   ```
2. Set remote to your profile repository:
   ```bash
   git remote add origin https://github.com/aadithya200718/aadithya200718.git
   ```
3. Push to main:
   ```bash
   git branch -M main
   git push -u origin main
   ```
Your GitHub profile page at `https://github.com/aadithya200718` will now showcase the responsive, cyber-animated five-panel visual system!
