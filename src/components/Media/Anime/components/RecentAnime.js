import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const RecentAnime = () => {
	return (
		<div>
			<h5>Recent Anime</h5>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				<SingleAnimeCard />
				<SingleAnimeCard />
			</section>
		</div>
	);
};

export default RecentAnime;
