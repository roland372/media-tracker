import React from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleAnimeCard from '../components/SingleAnimeCard';

const AllAnime = () => {
	return (
		<CardComponent title='All Anime'>
			<SingleAnimeCard />
			<SingleAnimeCard />
			<SingleAnimeCard />
		</CardComponent>
	);
};

export default AllAnime;
