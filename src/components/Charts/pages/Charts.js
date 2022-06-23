import React, { useState, useEffect } from 'react';

//? <----- Components ----->

//? <----- Firebase ----->
import AnimeDataService from '../../Media/Anime/services/anime.services';
import GamesDataService from '../../Media/Games/services/games.services';
import MangaDataService from '../../Media/Manga/services/manga.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../context/UserAuthContext';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CardComponent from '../../Layout/CardComponent';
import Anime from '../components/Anime';
import Games from '../components/Games';
import Manga from '../components/Manga';

const Charts = () => {
	useDocumentTitle('Charts');

	const { user } = useUserAuth();

	//* <----- Database State ----->
	const [animeDatabase, setAnimeDatabase] = useState([]);
	const [gamesDatabase, setGamesDatabase] = useState([]);
	const [mangaDatabase, setMangaDatabase] = useState([]);

	//* get data from database
	const getAnimeDatabase = async userId => {
		const data = await AnimeDataService.getAllAnime(userId);
		setAnimeDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	const getGamesDatabase = async userId => {
		const data = await GamesDataService.getAllGames(userId);
		setGamesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	const getMangaDatabase = async userId => {
		const data = await MangaDataService.getAllManga(userId);
		setMangaDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		user && getAnimeDatabase(user?.uid);
		user && getGamesDatabase(user?.uid);
		user && getMangaDatabase(user?.uid);
	}, [user]);

	// function round(value, precision) {
	// 	let multiplier = Math.pow(10, precision || 0);
	// 	return Math.round(value * multiplier) / multiplier;
	// }

	return (
		<CardComponent title='Charts'>
			<section>
				<Anime animeDatabase={animeDatabase} />
				<div className='my-5 mx-2'>
					<hr />
				</div>
				<Games gamesDatabase={gamesDatabase} />
				<div className='my-5 mx-2'>
					<hr />
				</div>
				<Manga mangaDatabase={mangaDatabase} />
			</section>
		</CardComponent>
	);
};

export default Charts;
