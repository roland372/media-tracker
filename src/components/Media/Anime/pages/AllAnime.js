import React from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleAnimeCard from '../components/SingleAnimeCard';
import SingleAnime from '../components/SingleAnime';

const AllAnime = () => {
	return (
		<div>
			{/* <CardComponent title='All Anime'> */}
			{/* <section className='d-flex align-items-center justify-content-start flex-wrap'>
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard />
			</section> */}
			<SingleAnime />
			{/* </CardComponent> */}
		</div>
	);
};

export default AllAnime;
