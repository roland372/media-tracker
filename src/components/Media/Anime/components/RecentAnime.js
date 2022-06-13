import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';
import CardComponent from '../../../Layout/CardComponent';

const RecentAnime = ({ allAnime, deleteAnime, user }) => {
	//* sort anime by date
	const sortByDate = allAnime.sort((a, b) => b.lastModified - a.lastModified);

	return (
		<CardComponent title='Recent Anime'>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{user &&
					sortByDate
						.filter(owner => owner.owner === user.uid)
						.map(anime => (
							<SingleAnimeCard
								key={anime.id}
								title={anime.title}
								imageURL={anime.imageURL}
								id={anime.id}
								deleteAnime={deleteAnime}
							/>
						))}
			</section>
		</CardComponent>
	);
};

export default RecentAnime;
