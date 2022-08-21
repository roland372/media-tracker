import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNote } from './noteSlice';

import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

const NotesList = () => {
	const dispatch = useDispatch();
	// const notes = useSelector(store => store.notes);
	const notes = [
		{ id: 1, title: 'title1', note: 'note1' },
		{ id: 2, title: 'title2', note: 'note2' },
	];

	const handleDeleteNote = id => {
		dispatch(deleteNote({ id }));
	};

	const renderNotes = () =>
		notes.map(note => (
			<div
				className='d-flex justify-content-center align-items-center'
				key={note.id}
			>
				<div>
					<h3>{note.title}</h3>
					<p>{note.note}</p>
				</div>
				<div className='d-flex gap-2'>
					<button>
						<Link to={`edit-note/${note.id}`}>
							<AiOutlineEdit />
						</Link>
					</button>
					<button onClick={() => handleDeleteNote(note.id)}>
						<BsTrash />
					</button>
				</div>
			</div>
		));

	return (
		<div>
			<Link to='add-note'>
				<button className='btn btn-primary'>Add Note</button>
			</Link>
			{notes.length ? renderNotes() : <p>No Notes</p>}
		</div>
	);
};

export default NotesList;
