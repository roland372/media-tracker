import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../features/notes/noteSlice';
// import charactersSlice from '../features/characters/charactersSlice';

export const store = configureStore({
	reducer: {
		notes: notesReducer,
		// characters: charactersSlice,
	},
});
