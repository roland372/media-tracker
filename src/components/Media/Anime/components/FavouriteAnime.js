import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const FavouriteAnime = ({ allAnime, deleteAnime }) => {
	//* show only favourites
	const filteredAnime = allAnime.filter(anime => anime.favourites);

	return (
		<div>
			<h5>Favourites</h5>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{filteredAnime.map(anime => (
					<SingleAnimeCard
						key={anime.title}
						title={anime.title}
						imageURL={anime.imageURL}
						id={anime.id}
						deleteAnime={deleteAnime}
					/>
				))}

				{/* <SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard /> */}
			</section>
		</div>
	);
};

export default FavouriteAnime;
