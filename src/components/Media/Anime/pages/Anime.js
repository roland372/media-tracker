import React, { useState, useEffect } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- Components ----->
import AllAnime from '../components/AllAnime';
import CardComponent from '../../../Layout/CardComponent';
import Form from '../components/Form';
import { Modal } from 'react-bootstrap';
import RecentAnime from '../components/RecentAnime';
import FavouriteAnime from '../components/FavouriteAnime';

const Anime = () => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [animeDatabase, setAnimeDatabase] = useState([]);

	//* fetch data from database
	const getAnimeDatabase = async () => {
		const data = await AnimeDataService.getAllAnime();
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setAnimeDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	const deleteAnime = async id => {
		await AnimeDataService.deleteAnime(id);
		getAnimeDatabase();
	};

	useEffect(() => {
		getAnimeDatabase();
	}, []);

	return (
		<CardComponent title='Anime'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Add Anime</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<Form handleClose={handleClose} />
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<button
						className='btn btn-primary'
						to='/media'
						onClick={() => handleShow()}
					>
						Add Anime
					</button>
					<Link className='btn btn-primary' to='/media'>
						Back to Media
					</Link>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<RecentAnime allAnime={animeDatabase} deleteAnime={deleteAnime} />
			<hr />
			<FavouriteAnime allAnime={animeDatabase} deleteAnime={deleteAnime} />
			<hr />
			<AllAnime allAnime={animeDatabase} deleteAnime={deleteAnime} />
		</CardComponent>
	);
};

export default Anime;
