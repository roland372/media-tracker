import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- Components ----->
import EditForm from '../components/EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleAnimeCard = ({
	deleteAnime,
	id,
	imageURL,
	getAnimeDatabase,
	title,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleAnime, setSingleAnime] = useState({});

	const getSingleAnimeDatabase = async id => {
		const data = await AnimeDataService.getAnime(id);
		setSingleAnime(data.data());
	};

	useEffect(() => {
		getSingleAnimeDatabase(id);
	}, [id]);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			mediaType='Anime'
			title={title}
			singleMedia={singleAnime}
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
