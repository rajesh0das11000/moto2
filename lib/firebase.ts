import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// In AI Studio, the config is injected into this file
let firebaseConfig: any = null;
try {
  // Use a dynamic import or require with a try-catch
  firebaseConfig = require('../firebase-applet-config.json');
} catch (e) {
  // Config missing is expected before the user completes the setup UI
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (firebaseConfig && firebaseConfig.apiKey) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn('Firebase config missing or invalid. Auth and Firestore will be unavailable.');
}

export { auth, db };
