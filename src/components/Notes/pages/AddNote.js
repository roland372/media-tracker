//? <----- React ----->
import { useState } from 'react';

//? <----- Router ----->
import { Link, useNavigate } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch } from 'react-redux';
import { addNote } from '../../../features/notes/noteSlice';

//? <----- Other ----->
import { v4 as uuidv4 } from 'uuid';
import CardComponent from '../../Layout/CardComponent';

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

	// console.log(note);

	return (
		<CardComponent title='Add Note'>
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
					onChange={e => setNote({ ...note, title: e.target.value })}
					placeholder='Enter Title'
					type='text'
					value={note.title}
				/>
				<textarea
					className='form-control'
					onChange={e => setNote({ ...note, note: e.target.value })}
					placeholder='Enter Note'
					value={note.note}
					name='note'
					rows='4'
				/>
				<div className='d-flex align-items-center justify-content-lg-start mt-3'>
					<button className='btn btn-success' onClick={handleAddNote}>
						Add Note
					</button>
				</div>
			</section>
		</CardComponent>
	);
};

export default AddNote;
