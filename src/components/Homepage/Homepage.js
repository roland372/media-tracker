import React, { useState, useEffect } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../Media/Anime/services/anime.services';
import CharactersDataService from '../Media/Characters/services/characters.services';
import GamesDataService from '../Media/Games/services/games.services';
import MangaDataService from '../Media/Manga/services/manga.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import AnimeForm from '../Media/Anime/components/Form';
import GameForm from '../Media/Games/components/Form';
import MangaForm from '../Media/Manga/components/Form';
import CharacterForm from '../Media/Characters/components/Form';
import RecentAnime from '../Media/Anime/components/RecentAnime';
import RecentGames from '../Media/Games/components/RecentGames';
import RecentManga from '../Media/Manga/components/RecentManga';
import RecentCharacters from '../Media/Characters/components/RecentCharacters';
import Loader from '../Layout/Loader';
import Button from '../Layout/Button';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Homepage = () => {
	useDocumentTitle('Home');

	const { user } = useUserAuth();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	const mediaOptions = [
		{ value: 'Anime', label: 'Anime' },
		// { value: 'Book', label: 'Book' },
		{ value: 'Character', label: 'Character' },
		{ value: 'Game', label: 'Game' },
		{ value: 'Manga', label: 'Manga' },
		// { value: 'Movie', label: 'Movie' },
	];

	let [selectMediaValue, setSelectMediaValue] = useState('');

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [animeDatabase, setAnimeDatabase] = useState([]);
	const [charactersDatabase, setCharactersDatabase] = useState([]);
	const [gamesDatabase, setGamesDatabase] = useState([]);
	const [mangaDatabase, setMangaDatabase] = useState([]);

	//* fetch data from database
	const getAnimeDatabase = async userId => {
		const data = await AnimeDataService.getAllAnime(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setAnimeDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const getCharactersDatabase = async userId => {
		const data = await CharactersDataService.getAllCharacters(userId);
		setCharactersDatabase(
			data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
		);
		setLoading(false);
	};

	const getGamesDatabase = async userId => {
		const data = await GamesDataService.getAllGames(userId);
		setGamesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const getMangaDatabase = async userId => {
		const data = await MangaDataService.getAllManga(userId);
		setMangaDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	//* handle delete
	const deleteAnime = async id => {
		const filteredArray = animeDatabase?.[0]?.anime?.filter(
			anime => anime.id !== id
		);

		animeDatabase[0].anime = filteredArray;

		await AnimeDataService.updateAnime(user?.uid, animeDatabase[0]);
		getAnimeDatabase(user?.uid);
		setLoading(false);
	};

	const deleteCharacter = async id => {
		const filteredArray = charactersDatabase?.[0]?.characters?.filter(
			character => character.id !== id
		);

		charactersDatabase[0].characters = filteredArray;

		await CharactersDataService.updateCharacter(
			user?.uid,
			charactersDatabase[0]
		);
		getCharactersDatabase(user?.uid);
		setLoading(false);
	};

	const deleteGame = async id => {
		const filteredArray = gamesDatabase?.[0]?.games?.filter(
			game => game.id !== id
		);

		gamesDatabase[0].games = filteredArray;

		await GamesDataService.updateGame(user?.uid, gamesDatabase[0]);
		getGamesDatabase(user?.uid);
		setLoading(false);
	};

	const deleteManga = async id => {
		const filteredArray = mangaDatabase?.[0]?.manga?.filter(
			manga => manga.id !== id
		);

		mangaDatabase[0].manga = filteredArray;

		await MangaDataService.updateManga(user?.uid, mangaDatabase[0]);
		getMangaDatabase(user?.uid);
		setLoading(false);
	};

	useEffect(() => {
		getAnimeDatabase(user.uid);
		getCharactersDatabase(user.uid);
		getGamesDatabase(user.uid);
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
						isSearchable={false}
					/>

					{selectMediaValue === 'Anime' ? (
						<AnimeForm
							animeDatabase={animeDatabase}
							getAnimeDatabase={getAnimeDatabase}
							handleClose={handleClose}
							user={user}
						/>
					) : null}
					{selectMediaValue === 'Character' ? (
						<CharacterForm
							charactersDatabase={charactersDatabase}
							getCharactersDatabase={getCharactersDatabase}
							handleClose={handleClose}
							user={user}
						/>
					) : null}
					{selectMediaValue === 'Game' ? (
						<GameForm
							gamesDatabase={gamesDatabase}
							getGamesDatabase={getGamesDatabase}
							handleClose={handleClose}
							user={user}
						/>
					) : null}
					{selectMediaValue === 'Manga' ? (
						<MangaForm
							mangaDatabase={mangaDatabase}
							getMangaDatabase={getMangaDatabase}
							handleClose={handleClose}
							user={user}
						/>
					) : null}
				</Modal.Body>
			</Modal>
			<CardComponent title='Welcome to Media-Tracker'>
				<div className='d-flex align-items-center justify-content-start ms-2 pt-1 mt-2'>
					<Button
						color='primary'
						onClick={() => {
							handleShow();
						}}
						text='Add Media'
					/>
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
						allAnime={animeDatabase?.[0]?.anime}
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
					{animeDatabase?.length < 1 ? null : (
						<Link to='/media/anime' className='btn btn-light'>
							All Anime
						</Link>
					)}

					<RecentCharacters
						allCharacters={charactersDatabase?.[0]?.characters}
						deleteCharacter={deleteCharacter}
						getCharactersDatabase={getCharactersDatabase}
						user={user}
					/>
					{charactersDatabase?.length < 1 ? null : (
						<Link to='/media/characters' className='btn btn-light'>
							All Characters
						</Link>
					)}

					<RecentGames
						allGames={gamesDatabase?.[0]?.games}
						deleteGame={deleteGame}
						getGamesDatabase={getGamesDatabase}
						user={user}
					/>
					{gamesDatabase?.length < 1 ? null : (
						<Link to='/media/games' className='btn btn-light'>
							All Games
						</Link>
					)}

					<RecentManga
						allManga={mangaDatabase?.[0]?.manga}
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						user={user}
					/>
					{mangaDatabase?.length < 1 ? null : (
						<Link to='/media/manga' className='btn btn-light mb-3'>
							All Manga
						</Link>
					)}
				</>
			)}
		</>
	);
};

export default Homepage;
