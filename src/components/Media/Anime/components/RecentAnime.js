import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';
import RecentMedia from '../../components/RecentMedia';

const RecentAnime = ({ allAnime, deleteAnime, getAnimeDatabase, user }) => {
	//* sort anime by date
	const sortByDate = allAnime.sort((a, b) => b.lastModified - a.lastModified);

	return (
		<RecentMedia cardTitle='Recent Anime'>
			{user &&
				sortByDate
					.filter(owner => owner.owner === user.uid)
					.map(anime => (
						<SingleAnimeCard
							deleteAnime={deleteAnime}
							getAnimeDatabase={getAnimeDatabase}
							id={anime.id}
							imageURL={anime.imageURL}
							key={anime.id}
							title={anime.title}
							user={user}
						/>
					))}
		</RecentMedia>
	);
};

export default RecentAnime;
