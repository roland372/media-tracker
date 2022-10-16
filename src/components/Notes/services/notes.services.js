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

const notesCollectionRef = collection(db, 'notes');

class NotesDataService {
	addNote = newNote => {
		return addDoc(notesCollectionRef, newNote);
	};

	updateNote = (id, updatedNote) => {
		// check if exists in database(collection)
		const noteDoc = doc(db, 'notes', id);
		return updateDoc(noteDoc, updatedNote);
	};

	deleteNote = id => {
		// check if exists in database(collection)
		const noteDoc = doc(db, 'notes', id);
		return deleteDoc(noteDoc);
	};

	// getAllNotesDocs = () => {
	// 	return getDocs(notessCollectionRef);
	// };

	getAllNotes = () => {
		// const q = query(notesCollectionRef, where('owner', '==', userId || null));
		return getDocs(notesCollectionRef);
	};

	getNote = id => {
		const noteDoc = doc(db, 'notes', id);
		return getDoc(noteDoc);
	};
}

export default new NotesDataService();
