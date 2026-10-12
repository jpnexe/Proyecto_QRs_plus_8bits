import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.proyectoqrplus.app',
  appName: 'Proyecto QR Plus',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
