import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const FavouriteAnime = () => {
	return (
		<div>
			<h5>Favourites</h5>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
			</section>
		</div>
	);
};

export default FavouriteAnime;
