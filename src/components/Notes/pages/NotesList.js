//? <----- React ----->
import { useEffect } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, fetchNotes } from '../../../features/notes/noteSlice';

//? <----- Icons ----->
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { BiLinkExternal } from 'react-icons/bi';

//? <----- Components ----->
import CardComponent from '../../../components/Layout/CardComponent';
import axios from 'axios';

const NotesList = () => {
	const dispatch = useDispatch();
	const notes = useSelector(store => store.notes);
	// const notes = useSelector(state => state.notes);

	const getNotes = () => {
		dispatch(fetchNotes());
	};

	useEffect(() => {
		dispatch(fetchNotes());
	}, [dispatch]);

	const handleDeleteNote = id => {
		dispatch(deleteNote({ id }));
		// axios.delete(`http://localhost:5000/notes/delete/${id}`).then(() => {
		axios.delete(`https://media-tracker-notes.herokuapp.com/delete/${id}`).then(() => {
			getNotes();
			// console.log(notes);
		});
	};

	const renderNotes = () =>
		notes.notes.map(note => (
			<div className='col-lg-4 col-sm-6 col-12 my-2 text-wrap' key={note.id}>
				<div className='border rounded shadow p-2 text-wrap'>
					<div className='text-start'>
						<h3>{note.title}</h3>
						<hr />
						<p>{note.note}</p>
					</div>
					<section className='d-flex justify-content-between align-items-center'>
						<div className='text-muted'>
							{new Date(note.lastModified).toLocaleDateString('en-GB', {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</div>
						<div className=''>
							<button className='btn btn-sm shadow-none'>
								<Link to={`${note.noteID}`}>
									<BiLinkExternal size={20} className='text-primary' />
								</Link>
							</button>
							<button className='btn btn-sm shadow-none'>
								<Link to={`edit-note/${note.noteID}`}>
									<AiOutlineEdit size={20} className='text-success' />
								</Link>
							</button>
							<button
								className='btn btn-sm shadow-none'
								onClick={() => handleDeleteNote(note.noteID)}
							>
								<BsTrash size={20} className='text-danger' />
							</button>
						</div>
					</section>
				</div>
			</div>
		));

	return (
		<CardComponent title='Notes'>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
					<Link to='/notes/add-note'>
						<button className='btn btn-primary'>Add Note</button>
					</Link>
				</div>
				{/* <button className='btn btn-primary' onClick={getNotes}>
					Fetch Notes
				</button> */}
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<div className='row px-2'>
				{notes.notes.length ? renderNotes() : <p>No Notes</p>}
			</div>
		</CardComponent>
	);
};

export default NotesList;
