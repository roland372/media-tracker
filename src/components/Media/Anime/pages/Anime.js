import React from 'react';

//? <----- Router ----->

//? <----- Components ----->
import AllAnime from './AllAnime';
import SingleAnime from '../components/SingleAnime';
import CardComponent from '../../../Layout/CardComponent';
import SingleAnimeCard from '../components/SingleAnimeCard';

const Anime = () => {
	return (
		<CardComponent title='Anime'>
			<SingleAnimeCard />
		</CardComponent>
	);
};

export default Anime;
