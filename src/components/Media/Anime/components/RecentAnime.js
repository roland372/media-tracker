import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';
import CardComponent from '../../../Layout/CardComponent';

const RecentAnime = ({ allAnime, deleteAnime, getAnimeDatabase, user }) => {
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
								deleteAnime={deleteAnime}
								getAnimeDatabase={getAnimeDatabase}
								id={anime.id}
								imageURL={anime.imageURL}
								key={anime.id}
								title={anime.title}
								user={user}
							/>
						))}
			</section>
		</CardComponent>
	);
};

export default RecentAnime;
