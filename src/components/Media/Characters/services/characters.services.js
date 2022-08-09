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

const charactersCollectionRef = collection(db, 'characters');

class CharactersDataService {
	addCharacter = newCharacter => {
		return addDoc(charactersCollectionRef, newCharacter);
	};

	updateCharacter = (id, updatedCharacter) => {
		// check if exists in database(collection)
		const characterDoc = doc(db, 'characters', id);
		return updateDoc(characterDoc, updatedCharacter);
	};

	deleteCharacter = id => {
		// check if exists in database(collection)
		const characterDoc = doc(db, 'characters', id);
		return deleteDoc(characterDoc);
	};

	getAllCharacters = userId => {
		const q = query(
			charactersCollectionRef,
			where('owner', '==', userId || null)
		);
		return getDocs(q);
	};

	getCharacter = id => {
		const characterDoc = doc(db, 'characters', id);
		return getDoc(characterDoc);
	};
}

export default new CharactersDataService();
