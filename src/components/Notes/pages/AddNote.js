//? <----- React ----->
import { useState } from 'react';

//? <----- Router ----->
import { useNavigate } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch } from 'react-redux';
import { addNote } from '../../../features/notes/noteSlice';

//? <----- Components ----->
import CardComponent from '../../Layout/CardComponent';
import BackButton from '../components/BackButton';
import Form from '../components/Form';
import { toast } from 'react-toastify';

//? <----- Other ----->
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const AddNote = () => {
	useDocumentTitle('Add Note');

	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	const handleAddNote = async () => {
		dispatch(
			addNote({
				color: note.color,
				id: uuidv4(),
				lastModified: Date.now(),
				note: note.note,
				title: note.title,
			})
		);
		// console.log(note);

		await axios
			// .post('http://localhost:5000/notes/add-note', {
			.post(
				'https://media-tracker-notes.herokuapp.com/notes/add-note',
				// { role: process.env.REACT_APP_adminID },
				{
					// .post(
					// 	'https://cors-anywhere.herokuapp.com/https://media-tracker-notes.herokuapp.com/notes/add-note',
					// 	{
					// title: note.title,
					// note: note.note,
					// lastModified: note.lastModified,
					// noteID: uuidv4(),
					note: { ...note, noteID: note.id },
					role: process.env.REACT_APP_adminID,
				}
			)
			.then(() => {
				console.log('note added');
				NoteAddedNotification();
			});
		navigate('/notes');
		console.log(note);
	};

	return (
		<CardComponent title='Add Note'>
			<BackButton />
			<Form setNote={setNote} note={note} handleAddNote={handleAddNote} />
		</CardComponent>
	);
};

export default AddNote;
