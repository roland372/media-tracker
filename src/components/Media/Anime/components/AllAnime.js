import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const AllAnime = ({ allAnime }) => {
	//* sort anime by name
	const sortedAnime = allAnime.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	return (
		<div>
			<h5>All Anime</h5>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{sortedAnime.map(anime => (
					<SingleAnimeCard
						key={anime.title}
						title={anime.title}
						imageURL={anime.imageURL}
					/>
				))}
			</section>
		</div>
	);
};

export default AllAnime;
