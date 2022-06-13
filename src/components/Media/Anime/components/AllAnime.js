import React from 'react';
import CardComponent from '../../../Layout/CardComponent';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const AllAnime = ({ allAnime, deleteAnime, user }) => {
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
	// console.log(allAnime);

	return (
		<CardComponent title='All Anime'>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{user &&
					sortedAnime
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

export default AllAnime;
