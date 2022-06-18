import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import MangaDataService from '../services/manga.services';

//? <----- Components ----->
import EditForm from './EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleMangaCard = ({
	deleteManga,
	id,
	imageURL,
	getMangaDatabase,
	title,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleManga, setSingleManga] = useState({});

	const getSingleMangaDatabase = async id => {
		const data = await MangaDataService.getManga(id);
		setSingleManga(data.data());
	};

	useEffect(() => {
		getSingleMangaDatabase(id);
	}, [id]);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			mediaType='Manga'
			title={title}
			singleMedia={singleManga}
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
