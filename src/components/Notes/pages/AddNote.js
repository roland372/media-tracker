//? <----- React ----->
import { useState, useEffect } from 'react';

//? <----- Firebase ----->
import NotesDataService from '../services/notes.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../context/UserAuthContext';

//? <----- Router ----->
import { useNavigate } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../../Layout/CardComponent';
import BackButton from '../components/BackButton';
import Form from '../components/Form';
import { toast } from 'react-toastify';

//? <----- Other ----->
import { v4 as uuidv4 } from 'uuid';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AddNote = () => {
	useDocumentTitle('Add Note');

	const { user } = useUserAuth();

	const navigate = useNavigate();

	const [notesDatabase, setNotesDatabase] = useState([]);

	const [note, setNote] = useState({
		color: 'primary',
		id: uuidv4(),
		lastModified: Date.now(),
		note: '',
		title: '',
	});

	//* Notifications
	const NoteAddedNotification = () =>
		toast.success('Note Added', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	//* fetch notes from database

	const getNotesDatabase = async userId => {
		const data = await NotesDataService.getAllNotes(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setNotesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		getNotesDatabase(user?.uid);
	}, [user?.uid]);

	const handleAddNote = async e => {
		e.preventDefault();

		try {
			notesDatabase?.[0]?.notes.push({ ...note });

			await NotesDataService.updateNote(user?.uid, notesDatabase[0]);
			console.log('emote added to database');

			NoteAddedNotification();

			navigate('/notes');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<CardComponent title='Add Note'>
			<BackButton />
			<Form setNote={setNote} note={note} handleAddNote={handleAddNote} />
		</CardComponent>
	);
};

export default AddNote;
