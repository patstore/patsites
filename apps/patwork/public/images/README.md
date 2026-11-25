# SEO Assets

This folder contains images used for SEO purposes like Open Graph previews and social media sharing.

## Current Files

- `logo_patwork.webp` - Site logo used for favicon and social sharing

## Recommended Assets to Add

### Open Graph Image
Create an optimized image for social media previews:
- **Filename**: `og-image.jpg` or `og-image.webp`
- **Size**: 1200x630 pixels
- **Format**: JPG or WebP
- **Content**: Should include your logo/branding and be visually appealing
- **File size**: Under 1MB (ideally under 300KB)

### Favicon Variants
Consider adding multiple favicon sizes for different devices:
- `favicon.ico` - 32x32 or 16x16 (for older browsers)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` - 180x180 (for iOS devices)

## Usage in SEO Component

```tsx
<SEO
  image="/images/og-image.jpg"
  title="Your Page Title"
  description="Your page description"
/>
```

This will make the image available at:
- Development: `http://localhost:5173/images/og-image.jpg`
- Production: `https://patwork.de/images/og-image.jpg`

## Testing Social Previews

After adding your OG image, test it with:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
