import React from 'react';

//? <----- Components ----->
import SingleGameCard from './SingleGameCard';
import FavouriteMedia from '../../components/FavouriteMedia';

const FavouriteGames = ({ allGames, deleteGame, getGamesDatabase, user }) => {
	//* show only favourites
	const filteredGames = allGames.filter(game => game.favourites);

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
