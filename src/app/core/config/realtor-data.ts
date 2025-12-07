import { SiteConfig } from '../models/config.model';

export const REALTOR_DATA: SiteConfig = {
  // ... existing realtor data ...
  realtor: {
    firstName: 'Kritika',
    lastName: 'Katwal',
    fullName: 'Kritika Katwal',
    title: 'Top Producer | Realtor®',
    brokerage: 'Main Street Realty Group',
    email: 'realestatefordreamers@gmail.com',
    phone: '+14706526362',
    phoneDisplay: '(470) 652-6362',
    headshotUrl: 'https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Fkritika_pic_four.JPEG?alt=media&token=b3c0220f-1357-4cd8-843b-281796ffd43a?auto=format&fit=crop&q=80&w=800',
    startedYear: 2021
  },

  branding: {
    websiteName: 'Real Estate for Dreamers',
    logoInitial: 'K',
    myLogo: 'https://firebasestorage.googleapis.com/v0/b/real-estate-for-dreamers-dc887.firebasestorage.app/o/assets%2Flogo.png?alt=media&token=068a9e22-31a3-4d4a-8fe2-c84c8929de4f',
    heroImage: 'https://images.unsp lash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2070'
  },

  // NEW: Define the colors here
  theme: {
  primaryColor: '#ef4444',   // Red
  secondaryColor: '#000000', // Black
  accentColor: '#333333'
},

  socials: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    tiktok: '#'
  },

  content: {
    heroTagline: 'Georgia Real Estate',
    heroSubtext: 'Whether you are buying your first home or selling a cherished estate, we make your real estate dreams a reality.',
    aboutBioShort: 'Since launching my career in 2021, I have been dedicated to redefining the real estate experience in Georgia.',
    aboutBioLong: `<p class="mb-4">
                Moving can be a scary process, and no one knows that better than me. My journey began in <strong>Nepal</strong>, took me to <strong>India</strong> and <strong>Australia</strong>, before finally finding my home in <strong>Atlanta</strong>.
              </p>
              <p class="mb-6">
                Although constant relocation was challenging, it sparked a lifelong passion for seeing new homes and meeting new people.
              </p>
              
              <!-- Inspiration Block -->
              <div class="bg-slate-50 border-l-4 border-amber-500 p-5 rounded-r-lg mb-6 italic text-slate-700 shadow-sm">
                "Rich Dad Poor Dad" by Robert T. Kiyosaki wasn't just a book I read young—it was the spark that confirmed real estate was my calling.
              </div>

              <p>
                My patience, empathy, perceptivity, and understanding are at the core of my service. I am a firm believer in being armed with knowledge, striving to educate my clients so they can make informed decisions throughout their real estate process.
              </p>
              <!-- Awards / Stats Row -->
            <div class="grid grid-cols-2 gap-4 mb-8">
               <!-- Top Producer Card -->
               <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <app-icon name="star" class="w-5 h-5"></app-icon>
                    </div>
                    <span class="font-bold text-slate-900 text-sm">Top Producer</span>
                  </div>
                  <div class="flex gap-1 flex-wrap">
                    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">2022</span>
                    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">2023</span>
                    <span class="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">2024</span>
                  </div>  
               </div>

               <!-- Global Perspective Card -->
               <div class="bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
                  <div class="flex items-center gap-3 mb-2">
                    <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <app-icon name="home" class="w-5 h-5"></app-icon>
                    </div>
                    <span class="font-bold text-slate-900 text-sm">Global Journey</span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium leading-relaxed">Nepal • India • Australia • Atlanta</p>
               </div>
            </div>` // (Keep full bio)
  }
};