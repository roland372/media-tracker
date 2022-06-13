import React, { useState, useEffect } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import AllAnime from '../components/AllAnime';
import CardComponent from '../../../Layout/CardComponent';
import Form from '../components/Form';
import { Modal, ProgressBar } from 'react-bootstrap';
import RecentAnime from '../components/RecentAnime';
import FavouriteAnime from '../components/FavouriteAnime';

const Anime = () => {
	const { user } = useUserAuth();

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [animeDatabase, setAnimeDatabase] = useState([]);

	//* fetch data from database
	const getAnimeDatabase = async userId => {
		const data = await AnimeDataService.getAllAnime(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setAnimeDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	const deleteAnime = async id => {
		await AnimeDataService.deleteAnime(id);
		getAnimeDatabase(user.uid);
	};

	useEffect(() => {
		getAnimeDatabase(user.uid);
	}, [user.uid]);

	const totalEpisodesSum = animeDatabase.reduce((accumulator, object) => {
		return accumulator + parseInt(object.episodesMax);
	}, 0);

	const watchedEpisodesSum = animeDatabase.reduce((accumulator, object) => {
		return accumulator + parseInt(object.episodesMin);
	}, 0);

	const watchingAnime = animeDatabase.filter(
		anime => anime.status === 'Watching'
	);

	const completedAnime = animeDatabase.filter(
		anime => anime.status === 'Completed'
	);

	const onHoldAnime = animeDatabase.filter(anime => anime.status === 'On-Hold');

	const droppedAnime = animeDatabase.filter(
		anime => anime.status === 'Dropped'
	);

	const planToWatchAnime = animeDatabase.filter(
		anime => anime.status === 'Plan to Watch'
	);

	const totalRating = animeDatabase.reduce((accumulator, object) => {
		return accumulator + parseInt(object.rating);
	}, 0);

	const favourites = animeDatabase.filter(anime => anime.favourites);

	// animeDatabase.map(anime => console.log(anime.favourites));

	console.log(
		'watching:',
		watchingAnime.length,
		'\ncompleted:',
		completedAnime.length,
		'\non-hold:',
		onHoldAnime.length,
		'\ndropped:',
		droppedAnime.length,
		'\nplan to watch:',
		planToWatchAnime.length
	);

	console.log(
		watchingAnime.length +
			completedAnime.length +
			onHoldAnime.length +
			droppedAnime.length +
			planToWatchAnime.length
	);

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
					<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
						<button
							className='btn btn-primary'
							to='/media'
							onClick={() => handleShow()}
						>
							Add Anime
						</button>
						<Link className='btn btn-primary' to='/'>
							Back to Media
						</Link>
					</div>
					<div className='mx-2'>
						<hr />
					</div>
				</section>
			</CardComponent>

			<CardComponent title='Anime Stats'>
				<section className='mx-2'>
					<ProgressBar style={{ height: '30px' }}>
						<ProgressBar variant='success' now={35} key={1} />
						<ProgressBar variant='warning' now={20} key={2} />
						<ProgressBar variant='danger' now={10} key={3} />
						<ProgressBar variant='primary' now={10} key={4} />
						<ProgressBar variant='dark' now={2} key={5} />
					</ProgressBar>
					<hr />
					<section className='d-flex justify-content-between'>
						<div>Days {totalEpisodesSum / 60}</div>
						<div>Mean Score {totalRating / animeDatabase.length}</div>
					</section>
					<hr />
					<div className='d-flex justify-content-between'>
						<section className='text-start'>
							<div>Watching {watchingAnime.length}</div>
							<div>Completed {completedAnime.length}</div>
							<div>On-Hold {onHoldAnime.length}</div>
							<div>Dropped {droppedAnime.length}</div>
							<div>Plan to Watch {planToWatchAnime.length}</div>
						</section>
						<section className='text-end'>
							<div>Total Anime {animeDatabase.length}</div>
							<div>Favourites {favourites.length}</div>
							<div>Total Episodes {totalEpisodesSum}</div>
							<div>Watched Episodes {watchedEpisodesSum}</div>
						</section>
					</div>
				</section>
			</CardComponent>
			<RecentAnime
				allAnime={animeDatabase}
				deleteAnime={deleteAnime}
				user={user}
			/>
			<hr />
			<FavouriteAnime
				allAnime={animeDatabase}
				deleteAnime={deleteAnime}
				user={user}
			/>
			<hr />
			<AllAnime
				allAnime={animeDatabase}
				deleteAnime={deleteAnime}
				user={user}
			/>
		</>
	);
};

export default Anime;
