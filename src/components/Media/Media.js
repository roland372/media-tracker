import React from 'react';
import { Route, Routes } from 'react-router-dom';

//? <----- Components ----->
import AllMedia from './AllMedia';
import Anime from './Anime/pages/Anime';
import SingleAnime from './Anime/components/SingleAnime';
// import SingleAnime from './Anime/components/SingleAnime';
// import Books from './Books/Books';
// import Games from './Games/Games';
// import LightNovels from './LightNovels/LightNovels';
// import Movies from './Movies/Movies';
// import VisualNovels from './VisualNovels/VisualNovels';

const Media = () => {
	return (
		<section>
			<Routes>
				<Route path='/' element={<AllMedia />} />
				<Route path='anime' element={<Anime />} />
				<Route path='anime/:id' element={<SingleAnime />} />
			</Routes>
		</section>
	);
};

export default Media;
