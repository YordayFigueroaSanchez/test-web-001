export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
}

export interface PageSeoConfig {
  title: string;
  description: string;
  route?: string;
  canonicalUrl?: string;
  ogData?: OpenGraphData;
  additionalMeta?: MetaTag[];
}
