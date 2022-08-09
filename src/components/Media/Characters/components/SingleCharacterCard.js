import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import CharactersDataService from '../services/characters.services';

//? <----- Components ----->
import EditForm from './EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleCharacterCard = ({
	deleteCharacter,
	getCharactersDatabase,
	singleCharacterDatabase,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleCharacter, setSingleCharacter] = useState({});

	const getSingleCharacterDatabase = async () => {
		const data = await CharactersDataService.getCharacter(user?.uid);
		setSingleCharacter(data.data());
	};

	useEffect(() => {
		getSingleCharacterDatabase();
		//eslint-disable-next-line
	}, []);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			mediaType='Characters'
			singleMedia={singleCharacterDatabase}
			id={singleCharacterDatabase?.id}
			handleShow={handleShow}
			getSingleMediaDatabase={getSingleCharacterDatabase}
			deleteMedia={deleteCharacter}
		>
			<EditForm
				handleClose={handleClose}
				singleCharacter={singleCharacter}
				id={singleCharacterDatabase?.id}
				getSingleCharacterDatabase={getSingleCharacterDatabase}
				getCharactersDatabase={getCharactersDatabase}
				user={user}
			/>
		</SingleMediaCard>
	);
};

export default SingleCharacterCard;
