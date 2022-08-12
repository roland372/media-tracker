import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//? <----- Styles ----->
import '../styles/Styles.css';

const AnimeSeasons = () => {
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
		const timer = setTimeout(() => {
			fetchSeasons();
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	console.log(seasons?.data);

	if (loading) return <h2>Loading...</h2>;

	return (
		<CardComponent title='Top Airing Anime'>
			<div className='row px-2'>
				{seasons?.data?.slice(0, -1)?.map((seasons, index) => (
					<OverlayTrigger
						key={index}
						placement='auto'
						overlay={
							<Tooltip>
								<div className='text-start'>
									<div>{seasons?.title}</div>
									<br />
									<div>Aired: {seasons?.aired?.string}</div>
									<div>Episodes: {seasons?.episodes}</div>
									<div>Favorites: {seasons?.favorites}</div>
									<div>Popularity: {seasons?.popularity}</div>
									<div>Rank: {seasons?.rank}</div>
									<div>Score: {seasons?.score}</div>
									<div>Scored by: {seasons?.scored_by}</div>
									<div>Season: {seasons?.season}</div>
									<div>Year: {seasons?.year}</div>
								</div>
							</Tooltip>
						}
					>
						<div className='col-xl-2 col-md-2 col-sm-4 col-4 mb-2'>
							<a href={seasons?.url} target='_blank' rel='noreferrer'>
								<img
									src={seasons?.images?.jpg?.image_url}
									alt=''
									className='w-100 shadow-1-strong rounded mb-2'
									style={{
										width: '20vw',
										height: '90%',
										objectFit: 'cover',
									}}
								/>
							</a>
						</div>
					</OverlayTrigger>
				))}
			</div>
		</CardComponent>
	);
};

export default AnimeSeasons;
