import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import GamesDataService from '../services/games.services';

//? <----- Components ----->
import EditForm from './EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleGameCard = ({
	deleteGame,
	id,
	imageURL,
	getGamesDatabase,
	title,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleGame, setSingleGame] = useState({});

	const getSingleGameDatabase = async id => {
		const data = await GamesDataService.getGame(id);
		setSingleGame(data.data());
	};

	useEffect(() => {
		getSingleGameDatabase(id);
	}, [id]);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			mediaType='Games'
			title={title}
			singleMedia={singleGame}
			id={id}
			handleShow={handleShow}
			getSingleMediaDatabase={getSingleGameDatabase}
			deleteMedia={deleteGame}
			imageURL={imageURL}
		>
			<EditForm
				handleClose={handleClose}
				singleGame={singleGame}
				id={id}
				getSingleGameDatabase={getSingleGameDatabase}
				getGamesDatabase={getGamesDatabase}
				user={user}
			/>
		</SingleMediaCard>
	);
};

export default SingleGameCard;
