import { SiteConfig } from '../models/config.model';

// Single place for the realtor's details and site copy.
// The chatbot persona in netlify/functions/chat.js repeats the contact details; keep them in sync.
export const REALTOR_DATA: SiteConfig = {
  realtor: {
    firstName: 'Kritika',
    lastName: 'Katwal',
    fullName: 'Kritika Katwal',
    title: 'Top Producer | Realtor®',
    brokerage: 'Main Street Realty Group',
    email: 'realestatefordreamers@gmail.com',
    phone: '+14706526362',
    phoneDisplay: '(470) 652-6362',
    headshotUrl: 'https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_pic_four.JPEG?alt=media&token=b3c0220f-1357-4cd8-843b-281796ffd43a',
    avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_profile.JPG?alt=media&token=fbb83206-b27a-4eb2-9262-cd3f3c0af8c7',
    startedYear: 2021,
    topProducerYears: [2022, 2023, 2024]
  },

  branding: {
    websiteName: 'Real Estate for Dreamers',
    logoInitial: 'K',
    myLogo: 'https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Flogo.png?alt=media&token=068a9e22-31a3-4d4a-8fe2-c84c8929de4f',
    heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2070',
    heroVideo: 'https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fbackground_video.mp4?alt=media&token=70d6dc58-2bb4-4e3e-b168-fddebaa8f6bd'
  },

  socials: {
    facebook: 'https://www.facebook.com/p/Real-Estate-for-Dreamers-100079074604797',
    instagram: 'https://www.instagram.com/realestatefordreamers/'
    // tiktok: 'https://www.tiktok.com/@your-handle',
  },

  content: {
    heroTagline: 'Georgia Real Estate',
    heroSubtext: 'Whether you are buying your first home or selling a cherished estate, we make your real estate dreams a reality in Georgia.',
    aboutBioLong: `
      <p class="mb-4">
        Moving can be a scary process, and no one knows that better than me. My journey began in <strong>Nepal</strong>, took me to <strong>India</strong> and <strong>Australia</strong>, before finally finding my home in <strong>Atlanta</strong>.
      </p>
      <p class="mb-6">
        Although constant relocation was challenging, it sparked a lifelong passion for seeing new homes and meeting new people.
      </p>
      <div class="bg-slate-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-6 italic text-slate-700 shadow-sm">
        "Rich Dad Poor Dad" by Robert T. Kiyosaki wasn't just a book I read young—it was the spark that confirmed real estate was my calling.
      </div>
      <p>
        My patience, empathy, perceptivity, and understanding are at the core of my service. I am a firm believer in being armed with knowledge, striving to educate my clients so they can make informed decisions throughout their real estate process.
      </p>`
  }
};
