import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import MangaDataService from '../services/manga.services';

//? <----- Components ----->
import EditForm from './EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleMangaCard = ({
	deleteManga,
	getMangaDatabase,
	singleMangaDatabase,
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
			mediaType='Manga'
			singleMedia={singleMangaDatabase}
			id={singleMangaDatabase?.id}
			handleShow={handleShow}
			getSingleMediaDatabase={getSingleMangaDatabase}
			deleteMedia={deleteManga}
		>
			<EditForm
				handleClose={handleClose}
				singleManga={singleManga}
				id={singleMangaDatabase?.id}
				getSingleMangaDatabase={getSingleMangaDatabase}
				getMangaDatabase={getMangaDatabase}
				user={user}
			/>
		</SingleMediaCard>
	);
};

export default SingleMangaCard;
