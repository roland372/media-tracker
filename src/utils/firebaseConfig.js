import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
	// apiKey: 'AIzaSyDh9nDa0ZWXofwNwQsrfAF97QNY_ofBMe8',
	// authDomain: 'media-tracker-f3101.firebaseapp.com',
	// projectId: 'media-tracker-f3101',
	// storageBucket: 'media-tracker-f3101.appspot.com',
	// messagingSenderId: '881047998968',
	// appId: '1:881047998968:web:af88dcd66f0623656a860d',
	// measurementId: 'G-GFE5FG8TPB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
export default app;
