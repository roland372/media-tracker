//? <----- React ----->
import { useState, useEffect } from 'react';

//? <----- Firebase ----->
import NotesDataService from '../services/notes.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../context/UserAuthContext';

//? <----- Router ----->
import { useNavigate, useParams } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../../Layout/CardComponent';
import BackButton from '../components/BackButton';
import EditForm from '../components/EditForm';
import { toast } from 'react-toastify';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const EditNote = () => {
	const { id } = useParams();
	const { user } = useUserAuth();

	const [notesDatabase, setNotesDatabase] = useState([]);

	useEffect(() => {
		const getNotesDatabase = async () => {
			const data = await NotesDataService?.getNote(user?.uid);
			setNotesDatabase(data?.data());
		};
		getNotesDatabase();
	}, [user?.uid]);

	const filteredNote = notesDatabase?.notes?.filter(note => note?.id === id);

	useDocumentTitle(filteredNote?.[0]?.title);

	const navigate = useNavigate();

	const [newNote, setNewNote] = useState({
		color: filteredNote?.[0]?.color,
		id: id,
		lastModified: Date.now(),
		note: filteredNote?.[0]?.note,
		title: filteredNote?.[0]?.title,
	});

	// useEffect(() => {
	// 	const obj = {
	// 		color: filteredNote?.[0]?.color,
	// 		id: id,
	// 		lastModified: Date.now(),
	// 		note: filteredNote?.[0]?.note,
	// 		title: filteredNote?.[0]?.title,
	// 	};
	// 	if (obj !== undefined) {
	// 		setNewNote(obj);
	// 		return;
	// 	}
	// }, [filteredNote]);

	//* Notifications
	const NoteUpdatedNotification = () =>
		toast.success('Note Updated', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const handleEditNote = async e => {
		e.preventDefault();

		try {
			const newNotesArray = notesDatabase?.notes?.filter(
				note => note.id !== id
			);

			await newNotesArray.push({
				...newNote,
			});

			// console.log(notesDatabase);

			notesDatabase.notes = newNotesArray;

			await NotesDataService.updateNote(user?.uid, notesDatabase);
			console.log('emote edited');

			// await getEmotesDatabase(user?.uid);
			NoteUpdatedNotification();

			navigate('/notes');
		} catch (error) {
			console.log(error);
		}

		// setNewNote({ title: '', note: '', color: '', lastModified: '' });
		// setNewNote({
		// 	color: newNote.color,
		// 	id: newNote.id,
		// 	lastModified: Date.now(),
		// 	note: newNote.note,
		// 	noteID: params.id,
		// 	title: newNote.title,
		// });
		// dispatch(
		// 	editNote({
		// 		color: newNote.color,
		// 		id: newNote.id,
		// 		lastModified: Date.now(),
		// 		note: newNote.note,
		// 		noteID: params.id,
		// 		title: newNote.title,
		// 	})
		// );
		// axios.put('http://localhost:5000/notes/edit-note', {
		// await axios
		// 	.put(
		// 		'https://media-tracker-notes.herokuapp.com/notes/edit-note',
		// 		// 'https://cors-anywhere.herokuapp.com/https://media-tracker-notes.herokuapp.com/notes/edit-note',
		// 		{
		// 			role: process.env.REACT_APP_adminID,
		// 			...newNote,
		// 			// id: currentNote[0]?.id,
		// 		}
		// 	)
		// 	.then(() => {
		// 		// console.log('note updated');
		// 		NoteUpdatedNotification();
		// 	});
		// navigate('/notes');
	};

	return (
		<CardComponent title='Edit Note'>
			<BackButton />
			<EditForm
				setNewNote={setNewNote}
				newNote={newNote}
				handleEditNote={handleEditNote}
				filteredNote={filteredNote}
				id={id}
			/>
		</CardComponent>
	);
};

export default EditNote;
