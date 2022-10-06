//? <----- React ----->
import { FC, useState } from 'react';

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

//? <----- TypeScript ----->
type TNote = {
	color: string;
	id: string;
	lastModified: number;
	note: string;
	title: string;
};

const AddNote: FC = (): JSX.Element => {
	useDocumentTitle('Add Note');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [note, setNote] = useState<TNote>({
		color: 'primary',
		id: uuidv4(),
		lastModified: Date.now(),
		note: '',
		title: '',
	});

	//* Notifications
	const NoteAddedNotification: Function = () =>
		toast.success('Note Added', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const handleAddNote: React.MouseEventHandler<
		HTMLButtonElement
	> = async () => {
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
			.post<TNote>(
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
	};

	return (
		<CardComponent title='Add Note'>
			<BackButton />
			<Form setNote={setNote} note={note} handleAddNote={handleAddNote} />
		</CardComponent>
	);
};

export default AddNote;
