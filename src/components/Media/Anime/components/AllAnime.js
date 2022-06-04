import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const AllAnime = () => {
	return (
		<div>
			<h5>All Anime</h5>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
			</section>
		</div>
	);
};

export default AllAnime;
