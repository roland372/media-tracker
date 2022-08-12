import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//? <----- Styles ----->
import './Styles.css';

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

	// console.log(topManga);

	// Get current manga
	const indexOfLastManga = currentPage * mangaPerPage;
	const indexOfFirstManga = indexOfLastManga - mangaPerPage;
	const currentManga = topManga?.data?.slice(
		indexOfFirstManga,
		indexOfLastManga
	);

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(topManga?.data?.length / mangaPerPage); i++) {
		pageNumbers.push(i);
	}

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<CardComponent title='Top Manga'>
			<div className='row px-2'>
				{currentManga?.map((manga, index) => (
					<OverlayTrigger
						key={index}
						placement='auto'
						overlay={
							<Tooltip>
								<div className='text-start'>
									<div>{manga?.title}</div>
									<br />
									<div>Chapters: {manga?.chapters}</div>
									<div>Volumes: {manga?.volumes}</div>
									<div>Favorites: {manga?.favorites}</div>
									<div>Popularity: {manga?.popularity}</div>
									<div>Rank: {manga?.rank}</div>
									<div>Score: {manga?.score}</div>
									<div>Scored by: {manga?.scored_by}</div>
								</div>
							</Tooltip>
						}
					>
						<div className='col-lg-2 col-sm-4 col-6 mb-2'>
							<a href={manga?.url} target='_blank' rel='noreferrer'>
								<img
									src={manga?.images?.jpg?.image_url}
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

export default TopManga;
