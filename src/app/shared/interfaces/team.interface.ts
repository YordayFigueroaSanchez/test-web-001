export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  bio?: string;
  socialLinks?: SocialLink[];
}
