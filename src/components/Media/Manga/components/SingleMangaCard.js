import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import MangaDataService from '../services/manga.services';

//? <----- Components ----->
import EditForm from './EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleMangaCard = ({
	deleteManga,
	favourites,
	getMangaDatabase,
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

	const [singleManga, setSingleManga] = useState({});
	// console.log(singleManga.title);

	const getSingleMangaDatabase = async () => {
		const data = await MangaDataService.getManga(user?.uid);
		setSingleManga(data.data());
	};

	useEffect(() => {
		getSingleMangaDatabase();
		//eslint-disable-next-line
	}, []);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			favourites={favourites}
			mediaType='Manga'
			title={title}
			singleMedia={singleManga?.anime}
			id={id}
			handleShow={handleShow}
			getSingleMediaDatabase={getSingleMangaDatabase}
			deleteMedia={deleteManga}
			imageURL={imageURL}
		>
			<EditForm
				handleClose={handleClose}
				singleManga={singleManga}
				id={id}
				getSingleMangaDatabase={getSingleMangaDatabase}
				getMangaDatabase={getMangaDatabase}
				user={user}
			/>
		</SingleMediaCard>
	);
};

export default SingleMangaCard;
