import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const noteSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote: (state, action) => {
			state.push(action.payload);
		},
		editNote: (state, action) => {
			const { id, title, note } = action.payload;
			const existingNote = state.find(note => note.id === id);
			if (existingNote) {
				existingNote.title = title;
				existingNote.note = note;
			}
		},
		deleteNote: (state, action) => {
			const { id } = action.payload;
			const existingNote = state.find(note => note.id === id);
			if (existingNote) {
				return state.filter(note => note.id !== id);
			}
		},
	},
});

export const { addNote, editNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
