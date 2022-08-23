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

//? <----- Other ----->
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const AddNote = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [note, setNote] = useState({
		id: uuidv4(),
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
				lastModified: Date.now(),
			})
		);
		// console.log(note);
		axios
			.post('http://localhost:5000/notes/add-note', {
				// title: note.title,
				// note: note.note,
				// lastModified: note.lastModified,
				// noteID: uuidv4(),
				note: { ...note, noteID: note.id },
			})
			.then(() => {
				console.log('success');
			});
		navigate('/notes');
		// console.log(note);
	};

	return (
		<CardComponent title='Add Note'>
			<BackButton />
			<Form setNote={setNote} note={note} handleAddNote={handleAddNote} />
		</CardComponent>
	);
};

export default AddNote;
