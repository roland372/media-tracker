import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import GamesDataService from '../services/games.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import AllGames from '../components/AllGames';
import CardComponent from '../../../Layout/CardComponent';
import Form from '../components/Form';
import { Modal } from 'react-bootstrap';
import RecentGames from '../components/RecentGames';
import FavouriteGames from '../components/FavouriteGames';
import GamesStats from '../components/GamesStats';
import Loader from '../../../Layout/Loader';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';

const Games = () => {
	useDocumentTitle('Games');

	const { user } = useUserAuth();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [gamesDatabase, setGamesDatabase] = useState([]);

	//* fetch data from database
	const getGamesDatabase = async userId => {
		setLoading(true);
		const data = await GamesDataService.getAllGames(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setGamesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const deleteGame = async id => {
		setLoading(true);
		await GamesDataService.deleteGame(id);
		getGamesDatabase(user.uid);
		setLoading(false);
	};

	useEffect(() => {
		getGamesDatabase(user.uid);
	}, [user.uid]);

	return (
		<>
			<CardComponent title='Games'>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header
						closeButton
						closeVariant='white'
						className='bg-primary-light text-color'
					>
						<Modal.Title>Add Game</Modal.Title>
					</Modal.Header>
					<Modal.Body className='bg-primary-dark text-color'>
						<Form
							handleClose={handleClose}
							user={user}
							getGamesDatabase={getGamesDatabase}
						/>
					</Modal.Body>
				</Modal>
				<section className='text-color'>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<button className='btn btn-primary' onClick={() => handleShow()}>
							Add Game
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
					<CardComponent title='Games Stats'>
						<GamesStats gamesDatabase={gamesDatabase} />
					</CardComponent>

					<AllGames
						allGames={gamesDatabase}
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						user={user}
					/>
					<hr />

					<RecentGames
						allGames={gamesDatabase}
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						user={user}
					/>
					<hr />

					<FavouriteGames
						allGames={gamesDatabase}
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						user={user}
					/>
				</>
			)}
		</>
	);
};

export default Games;
