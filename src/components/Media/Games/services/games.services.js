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

const gamesCollectionRef = collection(db, 'games');

class GamesDataService {
	addGame = newGame => {
		return addDoc(gamesCollectionRef, newGame);
	};

	updateGame = (id, updatedGame) => {
		// check if exists in database(collection)
		const gameDoc = doc(db, 'games', id);
		return updateDoc(gameDoc, updatedGame);
	};

	deleteGame = id => {
		// check if exists in database(collection)
		const gameDoc = doc(db, 'games', id);
		return deleteDoc(gameDoc);
	};

	getAllGames = userId => {
		const q = query(gamesCollectionRef, where('owner', '==', userId));
		return getDocs(q);
	};

	getGame = id => {
		const gameDoc = doc(db, 'games', id);
		return getDoc(gameDoc);
	};
}

export default new GamesDataService();
