export type SeoData = {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile" | "video" | "music";
  siteName?: string;
  locale?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  twitterHandle?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: Record<string, unknown>;
};

export type SeoProps = SeoData;
