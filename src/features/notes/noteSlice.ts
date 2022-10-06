//? <----- Redux ----->
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {} from 'redux-thunk/extend-redux';

//? <----- Other ----->
import axios from 'axios';

//? <----- TypeScript ----->
type TInitialState = {
	loading: boolean;
	notes: [] | any;
	error: string | undefined;
};

type TNote = {
	color: string;
	id: string;
	lastModified: number;
	note: string;
	title: string;
};

type TExistingNote = {
	color: string;
	id: string;
	lastModified: number;
	note: string;
	title: string;
};

// const initialState = [];
const initialState: TInitialState = {
	loading: false,
	notes: [],
	error: '',
};

export const fetchNotes = createAsyncThunk('/notes', async () => {
	return await axios
		.post<TNote>('https://media-tracker-notes.herokuapp.com/notes', {
			role: process.env.REACT_APP_adminID,
		})
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
			const { id, title, note, color, lastModified } = action.payload;
			const existingNote = state.notes.find(
				(note: TExistingNote) => note.id === id
			);

			if (existingNote) {
				existingNote.title = title;
				existingNote.note = note;
				existingNote.color = color;
				existingNote.lastModified = lastModified;
			}
		},

		deleteNote: (state: any, action) => {
			const { id } = action.payload;
			const existingNote = state.notes.find(
				(note: TExistingNote) => note.id === id
			);
			if (existingNote) {
				return state.filter((note: TExistingNote) => note.id !== id);
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
