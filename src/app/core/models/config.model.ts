export interface SiteConfig {
  realtor: {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;          // e.g. "Top Producer | Realtor®"
    brokerage: string;      // e.g. "Main Street Realty Group"
    email: string;
    phone: string;          // E.164, used for tel: links, e.g. "+14706526362"
    phoneDisplay: string;   // e.g. "(470) 652-6362"
    headshotUrl: string;    // URL to their full portrait (About section)
    avatarUrl: string;      // URL to the small round profile photo (chat, contact, blog)
    startedYear: number;
    topProducerYears: number[]; // Shown on the About and Contact sections
  };

  branding: {
    websiteName: string;    // e.g. "Real Estate for Dreamers"
    logoInitial: string;    // e.g. "K" (footer badge)
    myLogo: string;         // Logo image URL (header)
    heroImage: string;      // Poster image shown while the hero video loads
    heroVideo: string;      // Background video for home page
  };

  // Leave a network out (or empty) to hide its icon.
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };

  content: {
    heroTagline: string;
    heroSubtext: string;
    aboutBioLong: string;   // HTML for the About section's bio (rendered with Angular's sanitizer)
  };
}
