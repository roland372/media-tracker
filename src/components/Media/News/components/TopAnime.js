import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import Wrapper from './Wrapper';

//? <----- Styles ----->
import '../styles/Styles.css';

const TopAnime = () => {
	const [topAnime, setTopAnime] = useState({});
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [animePerPage] = useState(6);

	const fetchTopAnime = async () => {
		setLoading(true);
		const anime = await fetch('https://api.jikan.moe/v4/top/anime')
			.then(res => res.json())
			.catch(err => console.log(err));

		setTopAnime(anime);
		setLoading(false);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchTopAnime();
		}, 1000);

		return () => clearTimeout(timer);
	}, []);

	//* Get current page
	const indexOfLastAnime = currentPage * animePerPage;
	const indexOfFirstAnime = indexOfLastAnime - animePerPage;
	const currentAnime = topAnime?.data
		?.slice(0, -1)
		.slice(indexOfFirstAnime, indexOfLastAnime);

	return (
		<Wrapper
			loading={loading}
			title='Top Anime'
			media={currentAnime}
			setCurrentPage={setCurrentPage}
			topMedia={topAnime}
			mediaPerPage={animePerPage}
			type={'Top Anime'}
		/>

		// <CardComponent title='Top Anime'>
		// 	<div className='row px-2'>
		// 		{currentAnime?.map((anime, index) => (
		// 			<OverlayTrigger
		// 				key={index}
		// 				placement='auto'
		// 				overlay={
		// 					<Tooltip>
		// 						<div className='text-start'>
		// 							<div>{anime?.title}</div>
		// 							<br />
		// 							<div>Aired: {anime?.aired?.string}</div>
		// 							<div>Episodes: {anime?.episodes}</div>
		// 							<div>Favorites: {anime?.favorites}</div>
		// 							<div>Popularity: {anime?.popularity}</div>
		// 							<div>Rank: {anime?.rank}</div>
		// 							<div>Score: {anime?.score}</div>
		// 							<div>Scored by: {anime?.scored_by}</div>
		// 							<div>Season: {anime?.season}</div>
		// 							<div>Year: {anime?.year}</div>
		// 						</div>
		// 					</Tooltip>
		// 				}
		// 			>
		// 				<div className='col-xl-2 col-md-2 col-sm-4 col-4 mb-2'>
		// 					<a href={anime?.url} target='_blank' rel='noreferrer'>
		// 						<img
		// 							src={anime?.images?.jpg?.image_url}
		// 							alt=''
		// 							className='w-100 shadow-1-strong rounded mb-2'
		// 							style={{
		// 								width: '20vw',
		// 								height: '90%',
		// 								objectFit: 'cover',
		// 							}}
		// 						/>
		// 					</a>
		// 				</div>
		// 			</OverlayTrigger>
		// 		))}
		// 	</div>
		// 	<Pagination
		// 		setCurrentPage={setCurrentPage}
		// 		topMedia={topAnime}
		// 		mediaPerPage={animePerPage}
		// 	/>
		// </CardComponent>
	);
};

export default TopAnime;
