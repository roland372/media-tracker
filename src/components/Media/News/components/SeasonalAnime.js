import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import Wrapper from './Wrapper';
import Loader from '../../../Layout/Loader';

//? <----- Styles ----->
import '../styles/Styles.css';

const SeasonalAnime = () => {
	const [seasons, setSeasons] = useState({});
	const [loading, setLoading] = useState(false);

	const fetchSeasons = async () => {
		setLoading(true);

		const data = await fetch('https://api.jikan.moe/v4/seasons/now')
			.then(res => res.json())
			.catch(err => console.log(err));

		setSeasons(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchSeasons();
	}, []);

	return (
		<Wrapper
			loading={loading}
			title='Seasonal Anime'
			media={seasons?.data?.slice(0, -1)}
			// setCurrentPage={setCurrentPage}
			// topMedia={seasons?.data}
			// mediaPerPage={charactersPerPage}
			type={'Seasonal Anime'}
		/>
	);
};

export default SeasonalAnime;
