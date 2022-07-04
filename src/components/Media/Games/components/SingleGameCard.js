import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import GamesDataService from '../services/games.services';

//? <----- Components ----->
import EditForm from './EditForm';
import SingleMediaCard from '../../components/SingleMediaCard';

const SingleGameCard = ({
	deleteGame,
	getGamesDatabase,
	singleGameDatabase,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleGame, setSingleGame] = useState({});

	const getSingleGameDatabase = async () => {
		const data = await GamesDataService.getGame(user?.uid);
		setSingleGame(data.data());
	};

	useEffect(() => {
		getSingleGameDatabase();
		//eslint-disable-next-line
	}, []);

	return (
		<SingleMediaCard
			show={show}
			handleClose={handleClose}
			mediaType='Games'
			singleMedia={singleGameDatabase}
			id={singleGameDatabase?.id}
			handleShow={handleShow}
			getSingleMediaDatabase={getSingleGameDatabase}
			deleteMedia={deleteGame}
		>
			<EditForm
				handleClose={handleClose}
				singleGame={singleGame}
				id={singleGameDatabase?.id}
				getSingleGameDatabase={getSingleGameDatabase}
				getGamesDatabase={getGamesDatabase}
				user={user}
			/>
		</SingleMediaCard>
	);
};

export default SingleGameCard;
