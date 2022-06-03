import React from 'react';

//? <----- Components ----->
import Anime from './Anime/Anime';
import Books from './Books/Books';
import Games from './Games/Games';
import LightNovels from './LightNovels/LightNovels';
import Movies from './Movies/Movies';
import VisualNovels from './VisualNovels/VisualNovels';

const Media = () => {
	return (
		<>
			<Anime />
			<Books />
			<Games />
			<LightNovels />
			<Movies />
			<VisualNovels />
		</>
	);
};

export default Media;
