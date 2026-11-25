# SEO Component

A comprehensive SEO component for managing metadata, Open Graph tags, Twitter Cards, and structured data across your application.

## Features

- **Document Title Management**: Dynamically updates the page title
- **Meta Tags**: Description, keywords, author, robots
- **Open Graph**: Full support for Facebook/LinkedIn sharing
- **Twitter Cards**: Optimized Twitter sharing cards
- **Canonical URLs**: Prevent duplicate content issues
- **Structured Data**: JSON-LD for rich search results
- **Search Engine Control**: noindex/nofollow options

## Usage

Import the SEO component and add it to your route components:

```tsx
import { SEO } from '@/components';

function MyPage() {
  return (
    <>
      <SEO
        title="Page Title - Site Name"
        description="Page description for search engines and social media"
        keywords="keyword1, keyword2, keyword3"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        canonicalUrl="https://yoursite.com/page"
        image="/path/to/og-image.jpg"
      />
      {/* Your page content */}
    </>
  );
}
```

## Props

### Required Props

- `title` (string): Page title - will be set as document.title
- `description` (string): Meta description for the page

### Optional Props

- `keywords` (string): Comma-separated keywords
- `author` (string): Author name (default: 'PatWork')
- `image` (string): URL to preview image for social sharing
- `url` (string): Full URL of the current page
- `type` ('website' | 'article' | 'profile' | 'video' | 'music'): Open Graph type (default: 'website')
- `siteName` (string): Name of the website (default: 'PatWork')
- `locale` (string): Locale for Open Graph (default: 'de_DE')
- `twitterCard` ('summary' | 'summary_large_image' | 'app' | 'player'): Twitter card type (default: 'summary_large_image')
- `twitterHandle` (string): Twitter handle (e.g., '@username')
- `canonicalUrl` (string): Canonical URL for the page
- `noindex` (boolean): Prevent search engines from indexing (default: false)
- `nofollow` (boolean): Prevent search engines from following links (default: false)
- `structuredData` (object): JSON-LD structured data object

## Examples

### Basic Page

```tsx
<SEO
  title="Home - PatWork"
  description="Welcome to my portfolio"
  url={typeof window !== 'undefined' ? window.location.href : undefined}
  canonicalUrl="https://patwork.de/"
/>
```

### Article Page with Structured Data

```tsx
<SEO
  title="Article Title - PatWork"
  description="Article description"
  type="article"
  image="/images/article-cover.jpg"
  canonicalUrl="https://patwork.de/blog/article-slug"
  structuredData={{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Article Title',
    author: {
      '@type': 'Person',
      name: 'PatWork',
    },
    datePublished: '2024-01-01',
    image: 'https://patwork.de/images/article-cover.jpg',
  }}
/>
```

### Legal/Private Page (No Indexing)

```tsx
<SEO
  title="Impressum - PatWork"
  description="Legal information"
  noindex={true}
  canonicalUrl="https://patwork.de/impressum"
/>
```

## Best Practices

1. **Unique Titles**: Each page should have a unique, descriptive title
2. **Description Length**: Keep descriptions between 150-160 characters
3. **Images**: Use high-quality images (1200x630px for Open Graph)
4. **Canonical URLs**: Always provide canonical URLs to avoid duplicate content
5. **Structured Data**: Use appropriate schema.org types for better search results
6. **Mobile-Friendly**: Ensure meta viewport is set in index.html
7. **Keywords**: Use relevant, specific keywords (don't keyword stuff)

## Structured Data Examples

### Website

```tsx
structuredData={{
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'PatWork',
  url: 'https://patwork.de',
  description: 'Portfolio and projects',
}}
```

### Person/Profile

```tsx
structuredData={{
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'PatWork',
  url: 'https://patwork.de',
  jobTitle: 'Developer',
  sameAs: [
    'https://twitter.com/patwork',
    'https://github.com/patwork',
  ],
}}
```

### Breadcrumbs

```tsx
structuredData={{
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://patwork.de',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://patwork.de/projects',
    },
  ],
}}
```

## Testing Your SEO

Use these tools to verify your SEO implementation:

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Notes

- The component automatically updates meta tags when props change
- Previous structured data is cleaned up on component unmount
- Meta tags are created if they don't exist, updated if they do
- The component returns `null` and doesn't render any visible content
