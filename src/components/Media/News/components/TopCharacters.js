import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//? <----- Styles ----->
import '../styles/Styles.css';
import Pagination from './Pagination';

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
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	//* Get current characters
	const indexOfLastCharacters = currentPage * charactersPerPage;
	const indexOfFirstCharacters = indexOfLastCharacters - charactersPerPage;
	const currentCharacters = topCharacters?.data
		?.slice(0, -1)
		.slice(indexOfFirstCharacters, indexOfLastCharacters);

	if (loading) {
		return <h2>Loading...</h2>;
	}

	console.log(topCharacters?.data);

	return (
		<CardComponent title='Top Characters'>
			<div className='row px-2'>
				{currentCharacters?.map((characters, index) => (
					<OverlayTrigger
						key={index}
						placement='auto'
						overlay={
							<Tooltip>
								<div className='text-start'>
									<div>{characters?.name}</div>
									<br />
									<div>Favorites: {characters?.favorites}</div>
								</div>
							</Tooltip>
						}
					>
						<div className='col-xl-2 col-md-2 col-sm-4 col-4 mb-2'>
							<a href={characters?.url} target='_blank' rel='noreferrer'>
								<img
									src={characters?.images?.jpg?.image_url}
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
			<Pagination
				setCurrentPage={setCurrentPage}
				topMedia={topCharacters}
				mediaPerPage={charactersPerPage}
			/>
		</CardComponent>
	);
};

export default TopCharacters;
