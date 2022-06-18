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

const mangaCollectionRef = collection(db, 'manga');

class MangaDataService {
	addManga = newManga => {
		return addDoc(mangaCollectionRef, newManga);
	};

	updateManga = (id, updatedManga) => {
		// check if exists in database(collection)
		const mangaDoc = doc(db, 'manga', id);
		return updateDoc(mangaDoc, updatedManga);
	};

	deleteManga = id => {
		// check if exists in database(collection)
		const mangaDoc = doc(db, 'manga', id);
		return deleteDoc(mangaDoc);
	};

	getAllManga = userId => {
		const q = query(mangaCollectionRef, where('owner', '==', userId));
		return getDocs(q);
	};

	getManga = id => {
		const mangaDoc = doc(db, 'manga', id);
		return getDoc(mangaDoc);
	};
}

export default new MangaDataService();
