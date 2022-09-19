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
import Button from '../../Layout/Button';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const NotesList = () => {
	useDocumentTitle('Notes');

	const dispatch = useDispatch();
	const notes = useSelector(store => store.notes);
	// const notes = useSelector(state => state.notes);

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//* Notifications
	const NoteDeletedNotification = () =>
		toast.success('Note Deleted', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const [noteID, setNoteID] = useState('');

	const getNotes = () => {
		dispatch(fetchNotes());
	};

	useEffect(() => {
		dispatch(fetchNotes());
		setLoading(false);
	}, [dispatch]);

	const handleDeleteNote = async id => {
		dispatch(deleteNote({ id }));
		await axios
			// .delete(`https://media-tracker-notes.herokuapp.com/notes/delete/${id}`)
			.delete(`https://media-tracker-notes.herokuapp.com/notes/delete/${id}`)
			.then(() => {
				getNotes();
				NoteDeletedNotification();
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
				<div className='border-none rounded bg-primary-dark p-3 text-wrap h-100 d-flex flex-column justify-content-between shadow-lg'>
					<div className='text-start'>
						<h3>{note.title.slice(0, 30)}</h3>
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
								// onClick={() => handleDeleteNote(note.noteID)}
								onClick={() => {
									setNoteID(note.noteID);
									handleShow();
								}}
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
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Deleting emote</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					Are you sure you want to delete this note?
				</Modal.Body>
				<Modal.Footer className='bg-primary-dark text-color'>
					<Button color='warning' onClick={handleClose} text='Cancel' />
					<Button
						color='danger'
						onClick={() => {
							handleDeleteNote(noteID);
							handleClose();
						}}
						text='Delete'
					/>
				</Modal.Footer>
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
					<Link to='/notes/add-note'>
						<Button color='primary' text='Add Note' />
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
