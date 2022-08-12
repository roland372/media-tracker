import React from 'react';

//? <----- Components ----->
import TopAnime from '../components/TopAnime';
import TopManga from '../components/TopManga';
import TopCharacters from '../components/TopCharacters';
import AnimeSeasons from '../components/AnimeSeasons';

const News = () => {
	return (
		<>
			<TopAnime />
			<TopManga />
			{/* <TopCharacters /> */}
			{/* <AnimeSeasons /> */}
		</>
	);
};

export default News;
