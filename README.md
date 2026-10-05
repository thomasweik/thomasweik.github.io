# Thomas Weik Portfolio (React + Vite + Tailwind)

Single-page portfolio website for Thomas Weik with a sticky pill navbar, smooth section navigation, reusable components, filterable project cards, and a data-driven content model.

## Tech Stack

- React + Vite
- TypeScript
- TailwindCSS
- Avenir font from CDN

## Project Structure

- `src/data/profile.ts`: single source of truth for all profile content
- `src/components/*`: reusable UI components (`Navbar`, `Section`, `Card`, `Chip`, `ExperienceCard`, `ProjectCard`, `EducationCard`, `CertificationsList`, `ContactRow`)
- `src/App.tsx`: section composition and behavior wiring

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm run dev
```

3. Build production output:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## GitHub Pages Deployment

### 1) Set the Vite `base` path

This repo uses a relative base so GitHub Pages works for both user and project sites:

```ts
base: './'
```

### 2) Build and deploy `dist`

Basic flow:

```bash
npm run build
```

Then deploy the `dist/` folder using either:

- GitHub Actions workflow for Pages
- `gh-pages` branch/manual upload

### 3) If using GitHub Actions Pages

- In repo settings, enable Pages and set source to GitHub Actions.
- Use an action that uploads `dist` as artifact and deploys it to Pages.

## Content Updates

The home page's **3D Models** section is currently a scroll-driven CSS preview.
When publishable CAD files are ready, replace the visual in
`src/components/ModelPreviewPlaceholder.tsx` with a model viewer while keeping
the section id (`models`) so navigation continues to work.

The Inverted Payload System, SAE Aero Design, three-axis gimbal, and robotic arm
use lazy-loaded GLB models. Scrolling rotates them on the home page; dragging
rotates them on their project pages. Their original cover images remain directly
below the detail-page viewers. The ARES MUAV project still uses
`StepModelPlaceholder` until its STEP file is available.

To prepare another STEP file locally, run:

```bash
node scripts/convert-step-to-glb.cjs path/to/model.step public/models/model.glb
```

The converter imports colors from the STEP file by default. Add `--dark-gray`
to make every part dark gray, or `--dark-gray-all-except="PART_NAME"` to retain
one named part's STEP color. Then set the model's `modelPath` in
`src/data/profile.ts` to `models/model.glb`. The source STEP file stays outside
the website and is not needed at runtime.

### Responsive images

The site serves generated WebP images at 640px and 1600px widths, with lazy
loading and browser-selected sizes for phones and desktop displays. Originals
remain in `src/assets`. After adding or replacing an original image, run:

```bash
python3 -m pip install Pillow
python3 scripts/optimize-images.py
```

Import its `src/assets/optimized/<name>-1600.webp` version in the profile data
and render it with `ResponsiveImage`. Commit the generated images and
`src/data/responsiveImages.ts`; deployment does not require Python.

Update only `src/data/profile.ts` to edit:

- personal info
- about text
- skills
- experience and leadership
- projects and categories
- education, coursework, certifications, awards
- contact links
