import React from 'react';

//? <----- Components ----->
import SingleCharacterCard from './SingleCharacterCard';
import RecentMedia from '../../components/RecentMedia';
import CardComponent from '../../../Layout/CardComponent';

const RecentCharacters = ({
	allCharacters,
	deleteCharacter,
	getCharactersDatabase,
	user,
}) => {
	//* sort characters by date
	const sortByDate = allCharacters?.sort(
		(a, b) => b.lastModified - a.lastModified
	);

	if (sortByDate?.length < 1)
		return (
			<CardComponent title='Recent Characters'>
				<h4 className='text-center'>No Characters</h4>
			</CardComponent>
		);

	return (
		<RecentMedia cardTitle='Recent Characters'>
			{user &&
				sortByDate
					?.slice(0, 20)
					?.map(character => (
						<SingleCharacterCard
							deleteCharacter={deleteCharacter}
							getCharactersDatabase={getCharactersDatabase}
							key={character.id}
							singleCharacterDatabase={character}
							user={user}
						/>
					))}
		</RecentMedia>
	);
};

export default RecentCharacters;
