import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from '../components/SingleAnimeCard';

const AllAnime = () => {
	return (
		<div>
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
