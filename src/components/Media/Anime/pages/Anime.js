import React from 'react';

//? <----- Router ----->
import { Route, Routes } from 'react-router-dom';

//? <----- Components ----->
import AllAnime from './AllAnime';
import SingleAnime from '../components/SingleAnime';

const Anime = () => {
	return (
		<Routes>
			<Route path='anime' element={<AllAnime />}>
				<Route path=':animeId' element={<SingleAnime />} />
			</Route>
		</Routes>
	);
};

export default Anime;
