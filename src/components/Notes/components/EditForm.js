import React from 'react';
import SubmitButton from './SubmitButton';

const EditForm = props => {
	const { setNewNote, newNote, handleEditNote } = props;
	return (
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
			<SubmitButton
				color='warning'
				text='Update Note'
				onClick={handleEditNote}
			/>
		</section>
	);
};

export default EditForm;
