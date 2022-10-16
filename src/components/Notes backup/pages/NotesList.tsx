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
import CardComponent from '../../Layout/CardComponent';
import Loader from '../../Layout/Loader';
import Button from '../../Layout/Button';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

//? <----- TypeScript ----->
type TNote = {
	color: string;
	id: string;
	lastModified: number;
	note: string;
	noteID: string;
	title: string;
};

type TNotes = {
	loading: boolean;
	notes: TNote[];
	error: string | undefined;
};

type TStore = {
	notes: TNotes;
};

type TLoading = JSX.Element | boolean;

const NotesList = () => {
	useDocumentTitle('Notes');

	const dispatch = useDispatch();
	const notes = useSelector((store: TStore) => store.notes);
	// const notes = useSelector(state => state.notes);

	//* <----- Loading state ----->
	const [loading, setLoading] = useState<TLoading>(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	//* <----- Modal functions ----->
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const handleShowSettings = () => setShowSettingsModal(true);
	const handleCloseSettings = () => setShowSettingsModal(false);

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

	const handleDeleteNote = async (id: string) => {
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

	// function stripHTMLTags(original) {
	// 	return original.replace(/(<([^>]+)>)/gi, '');
	// }

	// function strip(html) {
	// 	const tmp = document.implementation.createHTMLDocument('New').body;
	// 	tmp.innerHTML = html;
	// 	return tmp.textContent || tmp.innerText || '';
	// }

	//* sorting
	const notesCopy = [...notes?.notes];
	const sortByDate = notesCopy?.sort((a, b) => b.lastModified - a.lastModified);

	// const [setSortedNotes] = useState(sortByDate);
	// const [order, setOrder] = useState('DSC');

	// const sortNotes = (order, menuItems, column) => {
	// 	if (order === 'ASC') {
	// 		const sorted = [...menuItems].sort((a, b) =>
	// 			a[column] > b[column] ? 1 : -1
	// 		);
	// 		// return sorted;
	// 		setSortedNotes(sorted);
	// 		setOrder('DSC');
	// 	}
	// 	if (order === 'DSC') {
	// 		const sorted = [...menuItems].sort((a, b) =>
	// 			a[column] < b[column] ? 1 : -1
	// 		);
	// 		// return sorted;
	// 		setSortedNotes(sorted);
	// 		setOrder('ASC');
	// 	}
	// };

	// const handleSortByTitle = () => {
	// 	sortNotes(order, sortByDate, 'title');
	// };
	// const handleSortByColor = () => {
	// 	sortNotes(order, sortByDate, 'color');
	// };
	// const handleSortByLastModified = () => {
	// 	sortNotes(order, sortByDate, 'lastModified');
	// };

	//* searching
	const [searchTerm, setSearchTerm] = useState('');

	const renderNotes = () =>
		sortByDate
			?.filter(value => {
				if (searchTerm === '') {
					return value;
				} else if (
					value.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
				) {
					return value;
				}
				return 0;
			})
			.map(note => (
				<div
					className='col-lg-4 col-sm-6 col-12 my-2 text-wrap flex-fill'
					key={note.id}
					style={{ wordWrap: 'break-word' }}
				>
					<div
						className={`border-top border-${note?.color} border-5 rounded bg-primary-dark p-3 text-wrap h-100 d-flex flex-column justify-content-between shadow-lg `}
					>
						<div className='text-start'>
							<h3>
								{note.title.length > 30
									? note.title.slice(0, 30) + '...'
									: note.title}
							</h3>
							<hr />
							{note.note.length > 200 ? (
								<div
									dangerouslySetInnerHTML={{
										__html:
											note.note
												.slice(0, 200)
												.replace(
													/<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/g,
													''
												) + '...',
									}}
								/>
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: note.note.replace(
											/<img[^>]+>(<\/img>)?|<iframe.+?<\/iframe>/g,
											''
										),
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
									color='transparent'
									sm
									text={
										<Link to={`${note.noteID}`}>
											<BiLinkExternal size={20} className='text-primary' />
										</Link>
									}
								/>
								<Button
									color='transparent'
									sm
									text={
										<Link to={`edit-note/${note.noteID}`}>
											<AiOutlineEdit size={20} className='text-success' />
										</Link>
									}
								/>

								<Button
									// onClick={() => handleDeleteNote(note.noteID)}
									color='transparent'
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
			<Modal show={showSettingsModal} onHide={handleCloseSettings}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Settings</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<div>
						<label className='form-label'>Search</label>
						<input
							type='text'
							className='form-control mb-2'
							placeholder='Search for a note'
							value={searchTerm}
							onChange={e => {
								setSearchTerm(e.target.value);
							}}
						/>
					</div>
					{/* <div>
						<label className='form-label'>Sort by</label>
						<div className='d-flex justify-content-start'>
							<Button
								color='primary'
								onClick={() => handleSortByTitle()}
								sm
								text='Title'
							/>
							<div className='mx-2'>
								<Button
									color='success'
									onClick={() => handleSortByColor()}
									sm
									text='Color'
								/>
							</div>
							<Button
								color='warning'
								onClick={() => handleSortByLastModified()}
								sm
								text='Last modified'
							/>
						</div>
					</div> */}
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>
					<Button color='warning' onClick={handleClose} text='Cancel' />
					<Button
						color='danger'
						onClick={() => {
							handleDeleteNote(noteID);
							handleClose();
						}}
						text='Delete'
					/>
				</Modal.Footer> */}
			</Modal>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Deleting note</Modal.Title>
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
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<Link to='/notes/add-note'>
						<Button color='primary' text='Add Note' />
					</Link>
					<Button
						color='warning'
						onClick={() => handleShowSettings()}
						text='Settings'
					/>
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
					{/* {notes?.notes?.length ? renderNotes() : <p>No Notes</p>} */}
					{sortByDate?.length ? renderNotes() : <Loader />}
					{/* {sortedNotes?.length ? renderNotes() : renderNotes2()} */}
				</div>
			)}
		</CardComponent>
	);
};

export default NotesList;
