import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import AllAnime from '../components/AllAnime';
import CardComponent from '../../../Layout/CardComponent';
import Form from '../components/Form';
import { Modal } from 'react-bootstrap';
import RecentAnime from '../components/RecentAnime';
import FavouriteAnime from '../components/FavouriteAnime';
import AnimeStats from '../components/AnimeStats';
import Loader from '../../../Layout/Loader';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';

const Anime = () => {
	useDocumentTitle('Anime');

	const { user } = useUserAuth();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [animeDatabase, setAnimeDatabase] = useState([]);

	//* fetch data from database
	const getAnimeDatabase = async userId => {
		setLoading(true);
		const data = await AnimeDataService.getAllAnime(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setAnimeDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const deleteAnime = async id => {
		setLoading(true);
		await AnimeDataService.deleteAnime(id);
		// animeDeletedNotification();
		getAnimeDatabase(user.uid);
		setLoading(false);
	};

	useEffect(() => {
		getAnimeDatabase(user.uid);
	}, [user.uid]);

	return (
		<>
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
						<Form
							handleClose={handleClose}
							user={user}
							getAnimeDatabase={getAnimeDatabase}
						/>
					</Modal.Body>
					{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
				</Modal>
				<section className='text-color'>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<button className='btn btn-primary' onClick={() => handleShow()}>
							Add Anime
						</button>
					</div>
					<div className='mx-2'>
						<hr />
					</div>
				</section>
			</CardComponent>

			{loading ? (
				<Loader />
			) : (
				<>
					<AnimeStats animeDatabase={animeDatabase} />

					<AllAnime
						allAnime={animeDatabase}
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
					<hr />

					<RecentAnime
						allAnime={animeDatabase}
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
					<hr />

					<FavouriteAnime
						allAnime={animeDatabase}
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
				</>
			)}
		</>
	);
};

export default Anime;
