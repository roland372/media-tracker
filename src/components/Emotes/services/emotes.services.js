import { db } from '../../../utils/firebaseConfig';

import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	// query,
	// where,
} from 'firebase/firestore';

const emotesCollectionRef = collection(db, 'emotes');

class EmotesDataService {
	addEmote = newEmote => {
		return addDoc(emotesCollectionRef, newEmote);
	};

	updateEmote = (id, updatedEmote) => {
		// check if exists in database(collection)
		const emoteDoc = doc(db, 'emotes', id);
		return updateDoc(emoteDoc, updatedEmote);
	};

	deleteEmote = id => {
		// check if exists in database(collection)
		const emoteDoc = doc(db, 'emotes', id);
		return deleteDoc(emoteDoc);
	};

	// getAllEmotesDocs = () => {
	// 	return getDocs(emotesCollectionRef);
	// };

	getAllEmotes = () => {
		// const q = query(emotesCollectionRef, where('owner', '==', userId || null));
		return getDocs(emotesCollectionRef);
	};

	getEmote = id => {
		const emoteDoc = doc(db, 'emotes', id);
		return getDoc(emoteDoc);
	};
}

export default new EmotesDataService();
