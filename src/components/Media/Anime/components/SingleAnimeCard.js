import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- Components ----->
import EditForm from '../components/EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleAnimeCard = ({
	deleteAnime,
	favourites,
	getAnimeDatabase,
	id,
	imageURL,
	title,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleAnime, setSingleAnime] = useState({});

	const getSingleAnimeDatabase = async () => {
		// const data = await AnimeDataService.getAnime('LL6XdGl6QKbjnCv67gon');
		const data = await AnimeDataService.getAnime(user?.uid);
		setSingleAnime(data.data());
	};

	// console.log(singleAnime);

	useEffect(() => {
		getSingleAnimeDatabase();
		//eslint-disable-next-line
	}, []);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			favourites={favourites}
			mediaType='Anime'
			title={title}
			singleMedia={singleAnime?.anime}
			id={id}
			handleShow={handleShow}
			getSingleMediaDatabase={getSingleAnimeDatabase}
			deleteMedia={deleteAnime}
			imageURL={imageURL}
		>
			<EditForm
				handleClose={handleClose}
				singleAnime={singleAnime}
				id={id}
				getSingleAnimeDatabase={getSingleAnimeDatabase}
				getAnimeDatabase={getAnimeDatabase}
				user={user}
			/>
		</SingleMediaCard>
	);
};

export default SingleAnimeCard;
