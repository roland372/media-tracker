//? <----- React ----->
import { useState } from 'react';

//? <----- Router ----->
import { Link, useNavigate, useParams } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch, useSelector } from 'react-redux';
import { editNote } from '../../../features/notes/noteSlice';
import CardComponent from '../../../components/Layout/CardComponent';

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
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-lg-start ms-2 pt-1'>
					<Link className='btn btn-primary' to='/notes'>
						Back to Notes
					</Link>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<section className='form-group mx-2 mb-2'>
				<input
					className='form-control mb-3'
					onChange={e => setNewNote({ ...newNote, title: e.target.value })}
					placeholder='Enter Title'
					type='text'
					value={newNote.title}
				/>
				<textarea
					className='form-control'
					onChange={e => setNewNote({ ...newNote, note: e.target.value })}
					placeholder='Enter Note'
					name='note'
					rows='4'
					value={newNote.note}
				/>
				<div className='d-flex align-items-center justify-content-lg-start mt-3'>
					<button className='btn btn-warning' onClick={handleEditNote}>
						Update Note
					</button>
				</div>
			</section>
		</CardComponent>
	);
};

export default EditNote;
