//? <----- React ----->
import { useState } from 'react';

//? <----- Router ----->
import { useNavigate, useParams } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch, useSelector } from 'react-redux';
import { editNote } from '../../../features/notes/noteSlice';

//? <----- Components ----->
import CardComponent from '../../../components/Layout/CardComponent';
import BackButton from '../components/BackButton';
import EditForm from '../components/EditForm';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditNote = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const notes = useSelector(store => store.notes);
	const navigate = useNavigate();
	const currentNote = notes?.notes?.filter(note => note?.noteID === params?.id);
	const [newNote, setNewNote] = useState({
		id: currentNote[0]?.id,
		noteID: params.id,
		title: currentNote[0]?.title,
		note: currentNote[0]?.note,
		lastModified: Date.now(),
	});

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

	const handleEditNote = async () => {
		setNewNote({ title: '', note: '', lastModified: '' });
		dispatch(
			editNote({
				id: newNote.id,
				noteID: params.id,
				title: newNote.title,
				note: newNote.note,
				lastModified: Date.now(),
			})
		);
		// axios.put('http://localhost:5000/notes/edit-note', {

		// console.log(newNote);

		await axios
			.put(
				'https://media-tracker-notes.herokuapp.com/notes/edit-note',
				{ role: process.env.REACT_APP_adminID },
				// 'https://cors-anywhere.herokuapp.com/https://media-tracker-notes.herokuapp.com/notes/edit-note',
				{
					...newNote,
					// id: currentNote[0]?.id,
				}
			)
			.then(() => {
				console.log('note updated');
				NoteUpdatedNotification();
			});
		navigate('/notes');
	};

	return (
		<CardComponent title='Edit Note'>
			<BackButton />
			<EditForm
				setNewNote={setNewNote}
				newNote={newNote}
				handleEditNote={handleEditNote}
			/>
		</CardComponent>
	);
};

export default EditNote;
