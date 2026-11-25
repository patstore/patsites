# Public Assets Directory

This is the `public` folder for static assets in your Vite project.

## How it Works

Files placed in the `public` directory are:
- **Served at the root path** during development and production
- **Not processed** by Vite (no bundling, minification, or hash names)
- **Copied as-is** to the dist folder during build

## Usage

### In HTML (index.html)

Reference assets directly from the root:

```html
<link rel="icon" href="/images/logo_patwork.webp" />
<img src="/images/banner.jpg" alt="Banner" />
```

### In React/JSX Components

Reference assets from the root path:

```tsx
<img src="/images/logo_patwork.webp" alt="Logo" />
```

### In CSS/SCSS

```css
background-image: url('/images/background.jpg');
```

### In SEO Component

```tsx
<SEO
  image="/images/og-image.jpg"
  canonicalUrl="https://patwork.de/"
/>
```

## Directory Structure

```
public/
├── images/           # Images (logos, icons, OG images)
│   └── logo_patwork.webp
├── fonts/            # Web fonts (if any)
├── robots.txt        # Search engine crawler instructions
└── sitemap.xml       # Site structure for search engines
```

## Best Practices

### Use Public Folder For:
- ✅ Favicons and app icons
- ✅ `robots.txt` and `sitemap.xml`
- ✅ Social media preview images (Open Graph)
- ✅ Files that need exact filenames (referenced by external services)
- ✅ Large files that don't change often
- ✅ Files referenced in `index.html`

### Use `src/assets` For:
- ✅ Images imported in components (Vite optimizes these)
- ✅ Images that change frequently
- ✅ Images that should be tree-shaken
- ✅ Files that benefit from processing/optimization

## Examples

### Good: Logo in Public Folder
The logo is used in multiple places (favicon, SEO, navigation) and has a stable URL:
```
public/images/logo_patwork.webp → Available at /images/logo_patwork.webp
```

### Good: Component Images in src/assets
Component-specific images that are imported:
```tsx
import heroImage from '@/assets/hero.jpg';
<img src={heroImage} alt="Hero" />
```

## Important Notes

1. **No leading dot**: Paths start with `/`, not `./`
   - ✅ Correct: `/images/logo.webp`
   - ❌ Wrong: `./images/logo.webp`

2. **Always available**: Public assets are available at build time and runtime

3. **No versioning**: Files don't get content hashes, so browser caching can be an issue for frequently updated files

4. **Base URL**: If you deploy to a subdirectory, configure `base` in `vite.config.ts`

## Recommended Files to Add

Consider adding these common public assets:

- `robots.txt` - Control search engine crawling
- `sitemap.xml` - Help search engines index your site
- `favicon.ico` - Fallback favicon for older browsers
- `og-image.jpg` - Default Open Graph image (1200x630px)
- `manifest.json` - PWA manifest (if building a PWA)

## URL Structure

During development (`npm run dev`):
```
http://localhost:5173/images/logo_patwork.webp
```

After build (`npm run build`):
```
https://patwork.de/images/logo_patwork.webp
```

The files in `public/` are copied to `dist/` during build, maintaining the same structure.
