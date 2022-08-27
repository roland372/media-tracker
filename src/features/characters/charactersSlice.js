//? <----- Redux ----->
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//? <----- Firebase ----->
import CharactersDataService from '../../components/Media/Characters/services/characters.services';

const initialState = {
	loading: false,
	characters: [],
	error: '',
};

// export const fetchCharactersAPI = createAsyncThunk()

export const fetchCharactersDatabase = createAsyncThunk('', async userId => {
	const data = await CharactersDataService.getAllCharacters(userId);
	// return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	return data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
});

const characterSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		addCharacter: (state, action) => {
			state.characters.push(action.payload);
		},

		editCharacter: (state, action) => {},
		deleteCharacter: (state, action) => {},
	},

	extraReducers: builder => {
		builder.addCase(fetchCharactersDatabase.pending, state => {
			state.loading = true;
		});
		builder.addCase(fetchCharactersDatabase.fulfilled, (state, action) => {
			// const charactersDB = action.payload;
			// console.log(action.payload[0]);
			const { characters } = action.payload?.[0];
			// console.log(characters);

			state.loading = false;
			state.characters = characters;
			state.error = '';
		});
		builder.addCase(fetchCharactersDatabase.rejected, (state, action) => {
			state.loading = false;
			state.characters = [];
			state.error = action.error.message;
		});
	},
});

export const { addCharacter, editCharacter, deleteCharacter } =
	characterSlice.actions;
export default characterSlice.reducer;
