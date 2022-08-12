import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import Wrapper from './Wrapper';
import Loader from '../../../Layout/Loader';

//? <----- Styles ----->
import '../styles/Styles.css';

const TopCharacters = () => {
	const [topCharacters, setTopCharacters] = useState({});
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [charactersPerPage] = useState(6);

	const fetchTopCharacters = async () => {
		setLoading(true);
		const characters = await fetch('https://api.jikan.moe/v4/top/characters')
			.then(res => res.json())
			.catch(err => console.log(err));

		setTopCharacters(characters);
		setLoading(false);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchTopCharacters();
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	//* Get current characters
	const indexOfLastCharacters = currentPage * charactersPerPage;
	const indexOfFirstCharacters = indexOfLastCharacters - charactersPerPage;
	const currentCharacters = topCharacters?.data
		?.slice(0, -1)
		.slice(indexOfFirstCharacters, indexOfLastCharacters);

	return (
		<Wrapper
			loading={loading}
			title='Top Characters'
			media={currentCharacters}
			setCurrentPage={setCurrentPage}
			topMedia={topCharacters}
			mediaPerPage={charactersPerPage}
			type={'Top Characters'}
		/>
	);
};

export default TopCharacters;
