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
import FetchedAnime from '../components/FetchedAnime';

//? <----- Icons ----->
import { AiOutlineSearch } from 'react-icons/ai';

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

	let [animeDatabase, setAnimeDatabase] = useState([]);

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
		const filteredArray = animeDatabase[0].anime.filter(
			anime => anime.id !== id
		);
		animeDatabase[0].anime = filteredArray;
		await AnimeDataService.updateAnime(
			// 'LL6XdGl6QKbjnCv67gon',
			user?.uid,
			animeDatabase[0]
		);
		getAnimeDatabase(user.uid);
		setLoading(false);
	};

	useEffect(() => {
		getAnimeDatabase(user.uid);
	}, [user.uid]);

	//* fetch anime from API
	const [animeList, setAnimeList] = useState([]);
	const [search, setSearch] = useState('');

	const handleSearch = e => {
		e.preventDefault();

		fetchAnime(search);
	};

	const fetchAnime = async query => {
		//? v3
		// const temp = await fetch(
		// 	`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=20`
		// ).then(res => res.json());

		//? v4
		const temp = await fetch(
			`https://api.jikan.moe/v4/anime?q=${query}&order_by=scored`
		).then(res => res.json());

		setAnimeList(temp.data);
	};

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
							animeDatabase={animeDatabase}
							getAnimeDatabase={getAnimeDatabase}
							handleClose={handleClose}
							user={user}
						/>
					</Modal.Body>
					{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
				</Modal>
				<section className='text-color'>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<button className='btn btn-primary' onClick={() => handleShow()}>
							Add Anime
						</button>
						<div className='mx-2'>or</div>
						<form onSubmit={handleSearch}>
							<div className='d-flex'>
								<input
									className='form-control'
									type='search'
									placeholder='Search for an Anime'
									required
									value={search}
									onChange={e => setSearch(e.target.value)}
									onSubmit={e => setSearch(e.target.value)}
								/>
								<button className='btn btn-primary'>
									<AiOutlineSearch size={20} />
								</button>
							</div>
						</form>
					</div>
					<div className='mx-2'>
						<hr />
					</div>
				</section>
			</CardComponent>
			{search ? (
				<FetchedAnime
					animeDatabase={animeDatabase}
					AnimeDataService={AnimeDataService}
					fetchedAnime={animeList}
					getAnimeDatabase={getAnimeDatabase}
					user={user}
				/>
			) : null}
			{loading ? (
				<Loader />
			) : (
				<>
					<CardComponent title='Anime Stats'>
						<AnimeStats animeDatabase={animeDatabase?.[0]?.anime} />
					</CardComponent>

					<AllAnime
						allAnime={animeDatabase?.[0]?.anime}
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
					<hr />

					<RecentAnime
						allAnime={animeDatabase?.[0]?.anime}
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
					<hr />

					<FavouriteAnime
						allAnime={animeDatabase?.[0]?.anime}
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
