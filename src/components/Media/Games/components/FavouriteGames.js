import React from 'react';

//? <----- Components ----->
import SingleGameCard from './SingleGameCard';
import FavouriteMedia from '../../components/FavouriteMedia';
import CardComponent from '../../../Layout/CardComponent';

const FavouriteGames = ({ allGames, deleteGame, getGamesDatabase, user }) => {
	//* show only favourites
	const filteredGames = allGames.filter(game => game.favourites);

	if (filteredGames.length < 1)
		return (
			<CardComponent title='All Games'>
				<h4 className='text-center'>No Favourite Games</h4>
			</CardComponent>
		);

	return (
		<FavouriteMedia cardTitle='Favourite Games'>
			{user &&
				filteredGames.map(game => (
					<SingleGameCard
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						id={game.id}
						imageURL={game.imageURL}
						key={game.id}
						title={game.title}
						user={user}
					/>
				))}
		</FavouriteMedia>
	);
};

export default FavouriteGames;
