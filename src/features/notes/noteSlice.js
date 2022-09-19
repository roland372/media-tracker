//? <----- Redux ----->
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//? <----- Other ----->
import axios from 'axios';

// const initialState = [];
const initialState = {
	loading: false,
	notes: [],
	error: '',
};

// var raw = JSON.stringify({
// 	role: 'admin',
// });

export const fetchNotes = createAsyncThunk('/notes', async () => {
	return await axios
		// .get('http://localhost:3001/notes')
		// .get('https://media-tracker-notes.herokuapp.com/notes')
		// .get('https://cors-anywhere.herokuapp.com/https://media-tracker-notes.herokuapp.com/notes')
		.post(
			'https://media-tracker-notes.herokuapp.com/notes',
			{
				role: process.env.REACT_APP_adminID,
			}
			// {
			// 	headers: {
			// 		// Accept: 'application/json',
			// 		// 'Content-Type': 'application/json',
			// 		// Authorization: 'Bearer ',
			// 		'Access-Control-Allow-Headers': '*',
			// 		'Access-Control-Allow-Origin': '*',
			// 		'Access-Control-Allow-Methods': '*',
			// 	},
			// 	// data: raw,
			// }
		)
		.then(response => response.data);
});

const noteSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote: (state, action) => {
			state.notes.push(action.payload);
		},

		editNote: (state, action) => {
			const { id, title, note, lastModified } = action.payload;
			const existingNote = state.notes.find(note => note.id === id);
			if (existingNote) {
				existingNote.title = title;
				existingNote.note = note;
				existingNote.lastModified = lastModified;
			}
		},

		deleteNote: (state, action) => {
			const { id } = action.payload;
			const existingNote = state.notes.find(note => note.id === id);
			if (existingNote) {
				return state.filter(note => note.id !== id);
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchNotes.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchNotes.fulfilled, (state, action) => {
			state.loading = false;
			state.notes = action.payload;
			state.error = '';
		});
		builder.addCase(fetchNotes.rejected, (state, action) => {
			state.loading = false;
			state.notes = [];
			state.error = action.error.message;
		});
	},
});

export const { addNote, editNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;
