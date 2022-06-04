import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';
import AllMedia from './AllMedia';
import Anime from './Anime/pages/Anime';
// import SingleAnime from './Anime/components/SingleAnime';
// import Books from './Books/Books';
// import Games from './Games/Games';
// import LightNovels from './LightNovels/LightNovels';
// import Movies from './Movies/Movies';
// import VisualNovels from './VisualNovels/VisualNovels';

//* root component, contains all routes, default route is to display all media

const Media = () => {
	return (
		<section>
			<Routes>
				<Route path='/' element={<AllMedia />} />
				<Route path='anime' element={<Anime />} />
			</Routes>
		</section>
	);
};

export default Media;
