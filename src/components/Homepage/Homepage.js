import React, { useState, useEffect } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../Media/Anime/services/anime.services';
import MangaDataService from '../Media/Manga/services/manga.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import AnimeForm from '../Media/Anime/components/Form';
import MangaForm from '../Media/Manga/components/Form';
import RecentAnime from '../Media/Anime/components/RecentAnime';
import RecentManga from '../Media/Manga/components/RecentManga';
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
		{ value: 'Movie', label: 'Movie' },
	];

	let [selectMediaValue, setSelectMediaValue] = useState('');

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [animeDatabase, setAnimeDatabase] = useState([]);
	const [mangaDatabase, setMangaDatabase] = useState([]);

	//* fetch data from database
	const getAnimeDatabase = async userId => {
		setLoading(true);
		const data = await AnimeDataService.getAllAnime(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setAnimeDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const getMangaDatabase = async userId => {
		setLoading(true);
		const data = await MangaDataService.getAllManga(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setMangaDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	//* handle delete
	const deleteAnime = async id => {
		setLoading(true);
		await AnimeDataService.deleteAnime(id);
		getAnimeDatabase(user.uid);
		setLoading(false);
	};

	const deleteManga = async id => {
		setLoading(true);
		await MangaDataService.deleteManga(id);
		getMangaDatabase(user.uid);
		setLoading(false);
	};

	useEffect(() => {
		getAnimeDatabase(user.uid);
		getMangaDatabase(user.uid);
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
					{selectMediaValue === 'Manga' ? (
						<MangaForm
							getMangaDatabase={getMangaDatabase}
							handleClose={handleClose}
							user={user}
						/>
					) : null}
				</Modal.Body>
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
					<RecentManga
						allManga={mangaDatabase}
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						user={user}
					/>
					<Link to='/media/manga' className='btn btn-light mb-3'>
						All Manga
					</Link>
				</>
			)}
		</>
	);
};

export default Homepage;
