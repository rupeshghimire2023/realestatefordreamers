export interface SiteConfig {
   realtor: {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;          // e.g. "Top Producer | Realtor®"
    brokerage: string;      // e.g. "Main Street Realty Group"
    email: string;
    phone: string;
    phoneDisplay: string;   // e.g. "(678) 663-3569"
    headshotUrl: string;    // URL to their profile picture
    startedYear: number;
  };
  
  branding: {
    websiteName: string;    // e.g. "Real Estate for Dreamers"
    logoInitial: string;    // e.g. "K" or "R"
    myLogo: string;         //e.g image source
    heroImage: string;      // Background image for home page
  };
  
  // NEW: Theme Configuration
  theme: {
    primaryColor: string;    // Main action color (Buttons, Highlights)
    secondaryColor: string;  // Dark background color (Footer, Hero BG)
    accentColor: string;     // Subtle accents
  };

  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
  };
  
  content: {
    heroTagline: string;
    heroSubtext: string;
    aboutBioShort: string;  // For summaries
    aboutBioLong: string;   // For the full About section
  };
}