import React from 'react';
import SubmitButton from './SubmitButton';

const Form = props => {
	const { setNote, note, handleAddNote } = props;
	return (
		<section className='form-group mx-2 mb-2'>
			<input
				className='form-control mb-3'
				onChange={e => setNote({ ...note, title: e.target.value })}
				placeholder='Enter Title'
				type='text'
				// value={note.title}
			/>
			<textarea
				className='form-control'
				onChange={e => setNote({ ...note, note: e.target.value })}
				placeholder='Enter Note'
				// value={note.note}
				type='text'
				rows='4'
			/>
			<SubmitButton color='success' text='Add Note' onClick={handleAddNote} />
		</section>
	);
};

export default Form;
