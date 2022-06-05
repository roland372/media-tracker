import { db } from '../../../../utils/firebaseConfig';

import {
	collection,
	getDocs,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
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

	getAllAnime = () => {
		return getDocs(animeCollectionRef);
	};

	getAnime = id => {
		const animeDoc = doc(db, 'anime', id);
		return getDoc(animeDoc);
	};
}

export default new AnimeDataService();
