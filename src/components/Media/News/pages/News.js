import React from 'react';

//? <----- Components ----->
import TopAnime from '../components/TopAnime';
import TopManga from '../components/TopManga';
import TopCharacters from '../components/TopCharacters';
import SeasonalAnime from '../components/SeasonalAnime';
import Links from '../components/Links';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';

const News = () => {
	useDocumentTitle('News');

	return (
		<>
			<SeasonalAnime />
			<TopAnime />
			<TopManga />
			<TopCharacters />
			<Links />
		</>
	);
};

export default News;
