import { CapacitorConfig } from '@capacitor/cli';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'newproyect',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};


export default config;
