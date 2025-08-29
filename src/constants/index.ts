// Application constants

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  ACCENT_COLOR: 'uside-accent-color',
} as const;

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Export accent colors
export * from './accentColors';
export * from './tvChannels';
export * from './seoConfig';
