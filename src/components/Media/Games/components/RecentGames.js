import React from 'react';

//? <----- Components ----->
import SingleGameCard from './SingleGameCard';
import RecentMedia from '../../components/RecentMedia';

const RecentGames = ({ allGames, deleteGame, getGamesDatabase, user }) => {
	//* sort games by date
	const sortByDate = allGames.sort((a, b) => b.lastModified - a.lastModified);

	return (
		<RecentMedia cardTitle='Recent Games'>
			{user &&
				sortByDate
					.filter(owner => owner.owner === user.uid)
					.map(game => (
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
		</RecentMedia>
	);
};

export default RecentGames;
