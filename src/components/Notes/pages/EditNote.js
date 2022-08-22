//? <----- React ----->
import { useState } from 'react';

//? <----- Router ----->
import { useNavigate, useParams } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch, useSelector } from 'react-redux';
import { editNote } from '../../../features/notes/noteSlice';
import CardComponent from '../../../components/Layout/CardComponent';
import BackButton from '../components/BackButton';
import EditForm from '../components/EditForm';

const EditNote = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const notes = useSelector(store => store.notes);
	const navigate = useNavigate();
	const currentNote = notes.filter(note => note.id === params.id);
	const { title, note } = currentNote[0];
	const [newNote, setNewNote] = useState({
		title,
		note,
	});

	const handleEditNote = () => {
		setNewNote({ title: '', note: '', lastModified: '' });
		dispatch(
			editNote({
				id: params.id,
				title: newNote.title,
				note: newNote.note,
				lastModified: Date.now(),
			})
		);
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
