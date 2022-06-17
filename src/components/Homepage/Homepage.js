import React, { useState, useEffect } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../Media/Anime/services/anime.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import AnimeForm from '../Media/Anime/components/Form';
import RecentAnime from '../Media/Anime/components/RecentAnime';
import Loader from '../Layout/Loader';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Homepage = () => {
	useDocumentTitle('Home');

	const { user } = useUserAuth();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	const mediaOptions = [
		{ value: 'Anime', label: 'Anime' },
		{ value: 'Manga', label: 'Manga' },
		{ value: 'Game', label: 'Game' },
	];

	let [selectMediaValue, setSelectMediaValue] = useState('');

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

	//* handle delete
	const deleteAnime = async id => {
		setLoading(true);
		await AnimeDataService.deleteAnime(id);
		getAnimeDatabase(user.uid);
		setLoading(false);
	};

	useEffect(() => {
		getAnimeDatabase(user.uid);
	}, [user.uid]);

	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Add Media</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<Select
						defaultValue={{ label: 'Select Media', value: 0 }}
						options={mediaOptions}
						className='text-dark'
						onChange={e => setSelectMediaValue(e.value)}
					/>

					{selectMediaValue === 'Anime' ? (
						<AnimeForm
							getAnimeDatabase={getAnimeDatabase}
							handleClose={handleClose}
							user={user}
						/>
					) : null}
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
			</Modal>
			<CardComponent title='Welcome to Media-Tracker'>
				<div className='d-flex align-items-center justify-content-start ms-2 pt-1 mt-2'>
					<button
						className='btn btn-primary'
						onClick={() => {
							handleShow();
						}}
					>
						Add Media
					</button>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</CardComponent>

			{loading ? (
				<Loader />
			) : (
				<>
					<RecentAnime
						allAnime={animeDatabase}
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
					<Link to='/media/anime' className='btn btn-light'>
						All Anime
					</Link>
					<RecentAnime
						allAnime={animeDatabase}
						deleteAnime={deleteAnime}
						user={user}
					/>
					<Link to='/media/anime' className='btn btn-light mb-3'>
						All Anime
					</Link>
				</>
			)}
		</>
	);
};

export default Homepage;
