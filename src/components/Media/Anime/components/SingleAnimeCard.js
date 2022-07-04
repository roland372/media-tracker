import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- Components ----->
import EditForm from '../components/EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleAnimeCard = ({
	deleteAnime,
	getAnimeDatabase,
	singleAnimeDatabase,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleAnime, setSingleAnime] = useState({});

	const getSingleAnimeDatabase = async () => {
		const data = await AnimeDataService.getAnime(user?.uid);
		setSingleAnime(data.data());
	};

	useEffect(() => {
		getSingleAnimeDatabase();
		//eslint-disable-next-line
	}, []);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			mediaType='Anime'
			singleMedia={singleAnimeDatabase}
			id={singleAnimeDatabase?.id}
			handleShow={handleShow}
			getSingleMediaDatabase={getSingleAnimeDatabase}
			deleteMedia={deleteAnime}
		>
			<EditForm
				handleClose={handleClose}
				singleAnime={singleAnime}
				id={singleAnimeDatabase?.id}
				getSingleAnimeDatabase={getSingleAnimeDatabase}
				getAnimeDatabase={getAnimeDatabase}
				user={user}
			/>
		</SingleMediaCard>
	);
};

export default SingleAnimeCard;
