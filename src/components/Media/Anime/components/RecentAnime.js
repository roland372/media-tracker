import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';
import RecentMedia from '../../components/RecentMedia';
import CardComponent from '../../../Layout/CardComponent';

const RecentAnime = ({ allAnime, deleteAnime, getAnimeDatabase, user }) => {
	//* sort anime by date
	const sortByDate = allAnime.sort((a, b) => b.lastModified - a.lastModified);

	if (sortByDate.length < 1)
		return (
			<CardComponent title='Recent Anime'>
				<h4 className='text-center'>No Anime</h4>
			</CardComponent>
		);

	return (
		<RecentMedia cardTitle='Recent Anime'>
			{user &&
				sortByDate
					.filter(owner => owner.owner === user.uid)
					.slice(0, 20)
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
