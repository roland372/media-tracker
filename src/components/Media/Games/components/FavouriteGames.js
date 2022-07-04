import React from 'react';

//? <----- Components ----->
import SingleGameCard from './SingleGameCard';
import FavouriteMedia from '../../components/FavouriteMedia';
import CardComponent from '../../../Layout/CardComponent';

const FavouriteGames = ({ allGames, deleteGame, getGamesDatabase, user }) => {
	//* show only favourites
	const filteredGames = allGames?.filter(game => game.favourites);

	//* sort games by name
	const sortedGames = filteredGames?.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	if (sortedGames?.length < 1)
		return (
			<CardComponent title='Favourite Games'>
				<h4 className='text-center'>No Favourite Games</h4>
			</CardComponent>
		);

	return (
		<FavouriteMedia cardTitle='Favourite Games'>
			{user &&
				sortedGames?.map(game => (
					<SingleGameCard
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						key={game.id}
						singleGameDatabase={game}
						user={user}
					/>
				))}
		</FavouriteMedia>
	);
};

export default FavouriteGames;
