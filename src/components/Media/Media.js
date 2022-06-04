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

//* root component, contains all routes, default route is to display all media

const Media = () => {
	const anime = [{ id: '1' }, { id: '2' }];
	return (
		<section>
			<Routes>
				<Route path='/' element={<AllMedia />} />
				<Route path='anime' element={<Anime anime={anime} />} />
				<Route path='anime/:id' element={<SingleAnime />} />
			</Routes>
		</section>
	);
};

export default Media;
