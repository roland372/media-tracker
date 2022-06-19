import React from 'react';

//? <----- Components ----->
import SingleGameCard from './SingleGameCard';
import RecentMedia from '../../components/RecentMedia';
import CardComponent from '../../../Layout/CardComponent';

const RecentGames = ({ allGames, deleteGame, getGamesDatabase, user }) => {
	//* sort games by date
	const sortByDate = allGames.sort((a, b) => b.lastModified - a.lastModified);

	if (sortByDate.length < 1)
		return (
			<CardComponent title='Recent Games'>
				<h4 className='text-center'>No Games</h4>
			</CardComponent>
		);

	return (
		<RecentMedia cardTitle='Recent Games'>
			{user &&
				sortByDate
					.filter(owner => owner.owner === user.uid)
					.slice(0, 20)
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
