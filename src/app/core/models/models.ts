export type ListingStatus = 'active' | 'coming-soon' | 'sold';

export interface Property {
  id: string;
  status: ListingStatus;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  type: 'sale' | 'rent';
  imageUrl: string;
  featured: boolean;
  description?: string;
  features?: string[];
  gallery?: string[];
  launchDate?: Date;
  soldPrice?: number;
  soldDate?: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string; // Markdown content
  imageUrl: string;
  date: any; // Firebase Timestamp
  author: string;
  category?: string;
}
export interface Testimonial {
  id: number | string; // Allow string IDs from Firebase
  text: string;
  author: string;
  location: string;
  imageUrl?: string; // New field for client photo/screenshot
}

export interface ChatMessage {
  text: string;
  isUser: boolean;
  time: Date;
}

export interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}