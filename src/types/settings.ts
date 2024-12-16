export interface WeddingSettings {
  date: string;
  venue: string;
  numberOfGuests: number;
  budget: number;
  currency: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  notifications: {
    email: boolean;
    browser: boolean;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  partnerName: string;
  partnerEmail: string;
  partnerPhone: string;
}