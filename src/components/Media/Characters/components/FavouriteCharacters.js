import React from 'react';

//? <----- Components ----->
import SingleCharacterCard from './SingleCharacterCard';
import FavouriteMedia from '../../components/FavouriteMedia';
import CardComponent from '../../../Layout/CardComponent';

const FavouriteCharacters = ({
	allCharacters,
	deleteCharacter,
	getCharactersDatabase,
	user,
}) => {
	//* show only favourites
	const filteredCharacters = allCharacters?.filter(
		character => character.favourites
	);

	//* sort characters by name
	const sortedCharacters = filteredCharacters?.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	if (sortedCharacters?.length < 1)
		return (
			<CardComponent title='Favourite Characters'>
				<h4 className='text-center'>No Favourite Characters</h4>
			</CardComponent>
		);

	return (
		<FavouriteMedia cardTitle='Favourite Characters'>
			{user &&
				sortedCharacters?.map(character => (
					<SingleCharacterCard
						deleteCharacter={deleteCharacter}
						getCharactersDatabase={getCharactersDatabase}
						key={character.id}
						singleCharacterDatabase={character}
						user={user}
					/>
				))}
		</FavouriteMedia>
	);
};

export default FavouriteCharacters;
