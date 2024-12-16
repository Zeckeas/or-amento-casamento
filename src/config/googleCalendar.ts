import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

export const initGoogleCalendar = () => {
  const auth = new google.auth.OAuth2(
    import.meta.env.VITE_GOOGLE_CLIENT_ID,
    import.meta.env.VITE_GOOGLE_API_KEY,
    window.location.origin + '/auth/callback'
  );

  return google.calendar({ version: 'v3', auth });
};