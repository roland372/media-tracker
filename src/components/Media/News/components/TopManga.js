import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import Wrapper from './Wrapper';

//? <----- Styles ----->
import '../styles/Styles.css';

const TopManga = () => {
	const [topManga, setTopManga] = useState({});
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [mangaPerPage] = useState(6);

	const fetchTopManga = async () => {
		setLoading(true);
		const manga = await fetch('https://api.jikan.moe/v4/top/manga')
			.then(res => res.json())
			.catch(err => console.log(err));

		setTopManga(manga);
		setLoading(false);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchTopManga();
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	//* Get current manga
	const indexOfLastManga = currentPage * mangaPerPage;
	const indexOfFirstManga = indexOfLastManga - mangaPerPage;
	const currentManga = topManga?.data
		?.slice(0, -1)
		.slice(indexOfFirstManga, indexOfLastManga);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<Wrapper
			title='Top Manga'
			media={currentManga}
			setCurrentPage={setCurrentPage}
			topMedia={topManga}
			mediaPerPage={mangaPerPage}
			type={'Top Manga'}
		/>
	);
};

export default TopManga;
