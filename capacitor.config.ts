
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.lovable.habittracker',
  appName: 'Habit Tracker',
  webDir: 'dist',
  server: {
    url: 'https://56f273c6-e9ce-4193-a47d-1cf71c71cdca.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3B82F6",
      showSpinner: false
    },
    StatusBar: {
      style: 'DEFAULT',
      backgroundColor: "#3B82F6"
    }
  }
};

export default config;
