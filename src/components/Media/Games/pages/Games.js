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
import FetchedGames from '../components/FetchedGames';
import axios from 'axios';

//? <----- Icons ----->
import { AiOutlineSearch } from 'react-icons/ai';

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
		// setLoading(true);
		const data = await GamesDataService.getAllGames(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setGamesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const deleteGame = async id => {
		// setLoading(true);

		const filteredArray = gamesDatabase?.[0]?.games?.filter(
			game => game.id !== id
		);

		gamesDatabase[0].games = filteredArray;

		await GamesDataService.updateGame(user?.uid, gamesDatabase[0]);
		getGamesDatabase(user?.uid);
		setLoading(false);
	};

	useEffect(() => {
		getGamesDatabase(user?.uid);
	}, [user?.uid]);

	//* fetch games from API
	const [gamesList, setGamesList] = useState([]);
	const [search, setSearch] = useState('');

	const handleSearch = e => {
		e.preventDefault();

		fetchGames(search);
	};

	const fetchGames = async query => {
		axios({
			url:
				'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games?search=' +
				// 'https://circumvent-cors.herokuapp.com/https://api.igdb.com/v4/games?search=' +
				query +
				'&fields=name,url, id, cover.*, screenshots.*, websites.*, genres.*, total_rating, total_rating_count, summary, storyline, slug, similar_games.*, release_dates.*, platforms.*, first_release_date, artworks.*',
			method: 'POST',
			headers: {
				'Client-ID': process.env.REACT_APP_igdbClientID,
				Authorization: 'Bearer ' + process.env.REACT_APP_igdbAuthorization,
				'Access-Control-Allow-Origin': '*',
			},
		})
			.then(response => {
				// console.log(response.data);
				setGamesList(response.data);
			})
			.catch(err => {
				console.error(err);
			});
	};

	// useEffect(() => {
	// 	fetchGames('fate/stay night');
	// }, []);

	// console.log(gamesList?.[0]?.cover);
	// console.log(gamesList?.[0]?.cover?.image_id);
	// 97934
	// https://images.igdb.com/igdb/image/upload/t_cover_big/co23ke.jpg

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
							gamesDatabase={gamesDatabase}
							getGamesDatabase={getGamesDatabase}
							handleClose={handleClose}
							user={user}
						/>
					</Modal.Body>
				</Modal>

				{/* <img
					src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${gamesList?.[0]?.cover?.image_id}.jpg`}
					alt=''
				/> */}
				{/* <img
					src={`https://images.igdb.com/igdb/image/upload/t_1080p/${gamesList?.[0]?.cover?.image_id}.jpg`}
					alt=''
				/> */}
				<section className='text-color'>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<button className='btn btn-primary' onClick={() => handleShow()}>
							Add Game
						</button>
						<div className='mx-2'>or</div>
						<form onSubmit={handleSearch}>
							<div className='d-flex'>
								<input
									className='form-control'
									type='search'
									placeholder='Search for a Game'
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
				<FetchedGames
					gamesDatabase={gamesDatabase}
					GamesDataService={GamesDataService}
					fetchedGames={gamesList}
					getGamesDatabase={getGamesDatabase}
					user={user}
				/>
			) : null}

			{loading ? (
				<Loader />
			) : (
				<>
					<CardComponent title='Games Stats'>
						<GamesStats gamesDatabase={gamesDatabase?.[0]?.games} />
					</CardComponent>

					<AllGames
						allGames={gamesDatabase?.[0]?.games}
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						user={user}
					/>
					<hr />

					<RecentGames
						allGames={gamesDatabase?.[0]?.games}
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						user={user}
					/>
					<hr />

					<FavouriteGames
						allGames={gamesDatabase?.[0]?.games}
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
