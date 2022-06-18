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
		setLoading(true);
		const data = await MangaDataService.getAllManga(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setMangaDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const deleteManga = async id => {
		setLoading(true);
		await MangaDataService.deleteManga(id);
		getMangaDatabase(user.uid);
		setLoading(false);
	};

	useEffect(() => {
		getMangaDatabase(user.uid);
	}, [user.uid]);

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
							handleClose={handleClose}
							user={user}
							getMangaDatabase={getMangaDatabase}
						/>
					</Modal.Body>
				</Modal>
				<section className='text-color'>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<button className='btn btn-primary' onClick={() => handleShow()}>
							Add Manga
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
					<MangaStats mangaDatabase={mangaDatabase} />

					<AllManga
						allManga={mangaDatabase}
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						user={user}
					/>
					<hr />

					<RecentManga
						allManga={mangaDatabase}
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						user={user}
					/>
					<hr />

					<FavouriteManga
						allManga={mangaDatabase}
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
