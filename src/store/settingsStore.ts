import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeddingSettings, UserProfile } from '../types/settings';

interface SettingsStore {
  settings: WeddingSettings;
  profile: UserProfile;
  updateSettings: (settings: Partial<WeddingSettings>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        date: '',
        venue: '',
        numberOfGuests: 0,
        budget: 0,
        currency: 'BRL',
        theme: {
          primaryColor: '#EC4899',
          secondaryColor: '#F9A8D4',
        },
        notifications: {
          email: true,
          browser: true,
        },
      },
      profile: {
        name: '',
        email: '',
        phone: '',
        partnerName: '',
        partnerEmail: '',
        partnerPhone: '',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      updateProfile: (newProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...newProfile },
        })),
    }),
    {
      name: 'wedding-settings',
    }
  )
);