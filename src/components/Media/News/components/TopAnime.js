import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//? <----- Styles ----->
import './Styles.css';

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
		fetchTopAnime();
	}, []);

	// Get current anime
	const indexOfLastAnime = currentPage * animePerPage;
	const indexOfFirstAnime = indexOfLastAnime - animePerPage;
	const currentAnime = topAnime?.data?.slice(
		indexOfFirstAnime,
		indexOfLastAnime
	);

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(topAnime?.data?.length / animePerPage); i++) {
		pageNumbers.push(i);
	}

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<CardComponent title='Top Anime'>
			<div className='row px-2'>
				{currentAnime?.map((anime, index) => (
					<OverlayTrigger
						key={index}
						placement='auto'
						overlay={
							<Tooltip>
								<div className='text-start'>
									<div>{anime?.title}</div>
									<br />
									<div>Aired: {anime?.aired?.string}</div>
									<div>Episodes: {anime?.episodes}</div>
									<div>Favorites: {anime?.favorites}</div>
									<div>Popularity: {anime?.popularity}</div>
									<div>Rank: {anime?.rank}</div>
									<div>Score: {anime?.score}</div>
									<div>Scored by: {anime?.scored_by}</div>
									<div>Season: {anime?.season}</div>
									<div>Year: {anime?.year}</div>
								</div>
							</Tooltip>
						}
					>
						<div className='col-lg-2 col-sm-4 col-6 mb-2'>
							<a href={anime?.url} target='_blank' rel='noreferrer'>
								<img
									src={anime?.images?.jpg?.image_url}
									alt=''
									className='w-100 shadow-1-strong rounded mb-2'
									style={{
										width: '20vh',
										height: '30vh',
										objectFit: 'cover',
									}}
								/>
							</a>
						</div>
					</OverlayTrigger>
				))}
			</div>

			<nav>
				<ul className='pagination mx-2'>
					{pageNumbers.map(number => (
						<li key={number} className='page-item paginationButtons'>
							<p
								onClick={() => {
									paginate(number);
								}}
								className='page-link'
							>
								{number}
							</p>
						</li>
					))}
				</ul>
			</nav>
		</CardComponent>
	);
};

export default TopAnime;
