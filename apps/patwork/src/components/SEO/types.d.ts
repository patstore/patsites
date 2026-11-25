export type SEOProps = {
  /** Page title - will be set as document.title */
  title: string;
  
  /** Meta description for the page */
  description: string;
  
  /** Comma-separated keywords for the page */
  keywords?: string;
  
  /** Author of the page content */
  author?: string;
  
  /** URL to the page's preview image (for Open Graph and Twitter) */
  image?: string;
  
  /** Full URL of the current page */
  url?: string;
  
  /** Open Graph type (website, article, etc.) */
  type?: 'website' | 'article' | 'profile' | 'video' | 'music';
  
  /** Name of the website */
  siteName?: string;
  
  /** Locale for Open Graph (e.g., de_DE, en_US) */
  locale?: string;
  
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  
  /** Twitter handle (e.g., @username) */
  twitterHandle?: string;
  
  /** Canonical URL for the page */
  canonicalUrl?: string;
  
  /** Prevent search engines from indexing */
  noindex?: boolean;
  
  /** Prevent search engines from following links */
  nofollow?: boolean;
  
  /** Structured data (JSON-LD) for rich snippets */
  structuredData?: Record<string, unknown>;
}
