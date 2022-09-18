//? <----- React ----->
import { useState, useEffect } from 'react';

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
import Loader from '../../Layout/Loader';
import axios from 'axios';
import Button from '../../Layout/Button';

const NotesList = () => {
	const dispatch = useDispatch();
	const notes = useSelector(store => store.notes);
	// const notes = useSelector(state => state.notes);

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	const getNotes = () => {
		dispatch(fetchNotes());
	};

	useEffect(() => {
		dispatch(fetchNotes());
		setLoading(false);
	}, [dispatch]);

	const handleDeleteNote = async id => {
		dispatch(deleteNote({ id }));
		// axios.delete(`http://localhost:5000/notes/delete/${id}`).then(() => {
		await axios
			// .delete(`https://media-tracker-notes.herokuapp.com/notes/delete/${id}`)
			.delete(`https://media-tracker-notes.herokuapp.com/notes/delete/${id}`)
			// .delete(`https://cors-anywhere.herokuapp.com/https://media-tracker-notes.herokuapp.com/notes/delete/${id}`)
			.then(() => {
				getNotes();
				// console.log(notes);
			});
		// getNotes();
	};

	// console.log(notes?.notes?.[2]?.note?.slice(0, 30));

	const renderNotes = () =>
		notes.notes.map(note => (
			<div
				className='col-lg-4 col-sm-6 col-12 my-2 text-wrap flex-fill'
				key={note.id}
				style={{ wordWrap: 'break-word' }}
			>
				<div className='border rounded shadow p-2 text-wrap h-100 d-flex flex-column justify-content-between'>
					<div className='text-start'>
						<h3>{note.title}</h3>
						<hr />
						{/* <p>{note.note.slice(0, 50)}</p> */}
						{note.note.length > 50 ? (
							<div
								dangerouslySetInnerHTML={{
									__html: note.note.slice(0, 50) + '...',
								}}
							/>
						) : (
							<div
								dangerouslySetInnerHTML={{
									__html: note.note,
								}}
							/>
						)}
					</div>
					<section className='d-flex justify-content-between align-items-center'>
						<div className='text-muted'>
							{new Date(note.lastModified).toLocaleDateString('en-GB', {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</div>
						<div className=''>
							<Button
								sm
								text={
									<Link to={`${note.noteID}`}>
										<BiLinkExternal size={20} className='text-primary' />
									</Link>
								}
							/>
							<Button
								sm
								text={
									<Link to={`edit-note/${note.noteID}`}>
										<AiOutlineEdit size={20} className='text-success' />
									</Link>
								}
							/>
							<Button
								onClick={() => handleDeleteNote(note.noteID)}
								sm
								text={<BsTrash size={20} className='text-danger' />}
							/>
						</div>
					</section>
				</div>
			</div>
		));

	return (
		<CardComponent title='Notes'>
			{/* <TextEditor /> */}
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
			{loading ? (
				<Loader />
			) : (
				<div className='row px-2'>
					{notes.notes.length ? renderNotes() : <p>No Notes</p>}
				</div>
			)}
		</CardComponent>
	);
};

export default NotesList;
