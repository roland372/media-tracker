import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const RecentAnime = ({ allAnime, deleteAnime, user }) => {
	//* sort anime by date
	const sortByDate = allAnime.sort((a, b) => b.lastModified - a.lastModified);

	return (
		<div>
			<h5>Recent Anime</h5>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{user &&
					sortByDate
						.filter(owner => owner.owner === user.uid)
						.map(anime => (
							<SingleAnimeCard
								key={anime.title}
								title={anime.title}
								imageURL={anime.imageURL}
								id={anime.id}
								deleteAnime={deleteAnime}
							/>
						))}
			</section>
		</div>
	);
};

export default RecentAnime;
