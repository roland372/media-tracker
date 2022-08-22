//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote } from '../../../features/notes/noteSlice';

//? <----- Icons ----->
import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { BiLinkExternal } from 'react-icons/bi';

//? <----- Components ----->
import CardComponent from '../../../components/Layout/CardComponent';

const NotesList = () => {
	const dispatch = useDispatch();
	const notes = useSelector(store => store.notes);
	// const notes = [
	// 	{ id: 1, title: 'title1', note: 'note1', lastModified: '01.01.2022' },
	// 	{
	// 		id: 2,
	// 		title: 'title2title2title2tit',
	// 		note: 'note2',
	// 		lastModified: '01.01.2022',
	// 	},
	// 	{ id: 3, title: 'title2', note: 'note2', lastModified: '01.01.2022' },
	// 	{ id: 4, title: 'title2', note: 'note2', lastModified: '01.01.2022' },
	// 	{ id: 5, title: 'title2', note: 'note2', lastModified: '01.01.2022' },
	// 	{ id: 6, title: 'title2', note: 'note2', lastModified: '01.01.2022' },
	// ];

	const handleDeleteNote = id => {
		dispatch(deleteNote({ id }));
	};

	const renderNotes = () =>
		notes.map(note => (
			<div className='col-lg-4 col-sm-6 col-12 my-2 text-wrap' key={note.id}>
				<div className='border rounded shadow p-2 text-wrap'>
					<div className='text-start'>
						<h3>{note.title}</h3>
						<hr />
						<p>{note.note}</p>
					</div>
					<section className='d-flex justify-content-between align-items-center'>
						<div className='text-muted'>{note.lastModified}</div>
						<div className=''>
							<button className='btn btn-sm shadow-none'>
								<Link to={`${note.id}`}>
									<BiLinkExternal size={20} className='text-primary' />
								</Link>
							</button>
							<button className='btn btn-sm shadow-none'>
								<Link to={`edit-note/${note.id}`}>
									<AiOutlineEdit size={20} className='text-success' />
								</Link>
							</button>
							<button
								className='btn btn-sm shadow-none'
								onClick={() => handleDeleteNote(note.id)}
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
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<div className='row px-2'>
				{notes.length ? renderNotes() : <p>No Notes</p>}
			</div>
		</CardComponent>
	);
};

export default NotesList;
