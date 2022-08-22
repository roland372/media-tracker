//? <----- React ----->
import { useState } from 'react';

//? <----- Router ----->
import { useNavigate } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch } from 'react-redux';
import { addNote } from '../../../features/notes/noteSlice';

//? <----- Other ----->
import { v4 as uuidv4 } from 'uuid';
import CardComponent from '../../Layout/CardComponent';
import BackButton from '../components/BackButton';
import Form from '../components/Form';

const AddNote = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [note, setNote] = useState({
		title: '',
		note: '',
		lastModified: Date.now(),
	});

	const handleAddNote = () => {
		setNote({ name: '', note: '' });
		dispatch(
			addNote({
				id: uuidv4(),
				title: note.title,
				note: note.note,
				lastModified: note.lastModified,
			})
		);
		navigate('/notes');
	};

	return (
		<CardComponent title='Add Note'>
			<BackButton />
			<Form setNote={setNote} note={note} handleAddNote={handleAddNote} />
		</CardComponent>
	);
};

export default AddNote;
