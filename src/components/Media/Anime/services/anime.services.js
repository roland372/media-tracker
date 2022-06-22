import { db } from '../../../../utils/firebaseConfig';

import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	query,
	where,
} from 'firebase/firestore';

const animeCollectionRef = collection(db, 'anime');

class AnimeDataService {
	addAnime = newAnime => {
		return addDoc(animeCollectionRef, newAnime);
	};

	updateAnime = (id, updatedAnime) => {
		// check if exists in database(collection)
		const animeDoc = doc(db, 'anime', id);
		return updateDoc(animeDoc, updatedAnime);
	};

	deleteAnime = id => {
		// check if exists in database(collection)
		const animeDoc = doc(db, 'anime', id);
		return deleteDoc(animeDoc);
	};

	getAllAnimes = () => {
		return getDocs(animeCollectionRef);
	};

	getAllAnime = userId => {
		const q = query(animeCollectionRef, where('owner', '==', userId || null));
		return getDocs(q);
	};

	getAnime = id => {
		const animeDoc = doc(db, 'anime', id);
		return getDoc(animeDoc);
	};
}

export default new AnimeDataService();
