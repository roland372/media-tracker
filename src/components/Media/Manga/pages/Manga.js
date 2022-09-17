import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import MangaDataService from '../services/manga.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import AllManga from '../components/AllManga';
import CardComponent from '../../../Layout/CardComponent';
import Form from '../components/Form';
import { Modal } from 'react-bootstrap';
import RecentManga from '../components/RecentManga';
import FavouriteManga from '../components/FavouriteManga';
import MangaStats from '../components/MangaStats';
import Loader from '../../../Layout/Loader';
import FetchedManga from '../components/FetchedManga';
import Button from '../../../Layout/Button';

//? <----- Icons ----->
import { AiOutlineSearch } from 'react-icons/ai';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';

const Manga = () => {
	useDocumentTitle('Manga');

	const { user } = useUserAuth();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [mangaDatabase, setMangaDatabase] = useState([]);

	//* fetch data from database
	const getMangaDatabase = async userId => {
		// setLoading(true);
		const data = await MangaDataService.getAllManga(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setMangaDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const deleteManga = async id => {
		// setLoading(true);

		const filteredArray = mangaDatabase?.[0]?.manga?.filter(
			manga => manga.id !== id
		);

		mangaDatabase[0].manga = filteredArray;

		await MangaDataService.updateManga(user?.uid, mangaDatabase[0]);
		getMangaDatabase(user?.uid);
		setLoading(false);
	};

	useEffect(() => {
		getMangaDatabase(user?.uid);
	}, [user?.uid]);

	//* fetch manga from API
	const [mangaList, setMangaList] = useState([]);
	const [search, setSearch] = useState('');

	const handleSearch = e => {
		e.preventDefault();

		fetchManga(search);
	};

	const fetchManga = async query => {
		const temp = await fetch(
			`https://api.jikan.moe/v4/manga?q=${query}&order_by=scored`
		).then(res => res.json());
		// &sort=asc

		setMangaList(temp.data);
		// console.log(temp.data);
	};
	return (
		<>
			<CardComponent title='Manga'>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header
						closeButton
						closeVariant='white'
						className='bg-primary-light text-color'
					>
						<Modal.Title>Add Manga</Modal.Title>
					</Modal.Header>
					<Modal.Body className='bg-primary-dark text-color'>
						<Form
							mangaDatabase={mangaDatabase}
							handleClose={handleClose}
							user={user}
							getMangaDatabase={getMangaDatabase}
						/>
					</Modal.Body>
				</Modal>
				<section className='text-color'>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<Button
							color='primary'
							onClick={() => handleShow()}
							text='Add Manga'
						/>
						<div className='mx-2'>or</div>
						<form onSubmit={handleSearch}>
							<div className='d-flex'>
								<input
									className='form-control'
									type='search'
									placeholder='Search for Manga'
									required
									value={search}
									onChange={e => setSearch(e.target.value)}
									onSubmit={e => setSearch(e.target.value)}
								/>
								<Button color='primary' text={<AiOutlineSearch size={20} />} />
							</div>
						</form>
					</div>
					<div className='mx-2'>
						<hr />
					</div>
				</section>
			</CardComponent>

			{search ? (
				<FetchedManga
					fetchedManga={mangaList}
					getMangaDatabase={getMangaDatabase}
					mangaDatabase={mangaDatabase}
					MangaDataService={MangaDataService}
					user={user}
				/>
			) : null}

			{loading ? (
				<Loader />
			) : (
				<>
					<CardComponent title='Manga Stats'>
						<MangaStats mangaDatabase={mangaDatabase?.[0]?.manga} />
					</CardComponent>

					<AllManga
						allManga={mangaDatabase?.[0]?.manga}
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						user={user}
					/>
					<hr />

					<RecentManga
						allManga={mangaDatabase?.[0]?.manga}
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						user={user}
					/>
					<hr />

					<FavouriteManga
						allManga={mangaDatabase?.[0]?.manga}
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						user={user}
					/>
				</>
			)}
		</>
	);
};

export default Manga;
