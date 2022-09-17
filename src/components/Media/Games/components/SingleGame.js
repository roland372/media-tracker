import React, { useEffect, useState } from 'react';

//? <----- Router ----->
import { Link, useParams, useNavigate } from 'react-router-dom';

//? <----- Firebase ----->
import GamesDataService from '../services/games.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../../Layout/Loader';
import EditForm from './EditForm';
import Button from '../../../Layout/Button';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';

const SingleGame = () => {
	const { id } = useParams();
	const { user } = useUserAuth();
	const navigate = useNavigate();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//* <----- Delete modal state ----->
	const [showDelete, setShowDelete] = useState(false);

	//* <----- Delete modal functions ----->
	const handleCloseDelete = () => setShowDelete(false);
	const handleShowDelete = () => setShowDelete(true);

	const gameDeletedNotification = () =>
		toast.success('Game Deleted', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const [singleGameDatabase, setSingleGameDatabase] = useState({});

	// const [gameDetails, setGameDetails] = useState([]);

	// const fetchGame = async query => {
	// 	axios({
	// 		url:
	// 			'https://circumvent-cors.herokuapp.com/https://api.igdb.com/v4/games?search=' +
	// 			query +
	// 			'&fields=name,url, id, cover.*, screenshots.*, websites.*, genres.*, total_rating, total_rating_count, summary, storyline, slug, similar_games.*, release_dates.*, platforms.*, first_release_date, artworks.*',
	// 		method: 'POST',
	// 		headers: {
	// 			'Client-ID': process.env.REACT_APP_igdbClientID,
	// 			Authorization: 'Bearer ' + process.env.REACT_APP_igdbAuthorization,
	// 		},
	// 	})
	// 		.then(response => {
	// 			// console.log(response.data);
	// 			setGameDetails(response.data);
	// 		})
	// 		.catch(err => {
	// 			console.error(err);
	// 		});
	// };

	// useEffect(() => {
	// 	fetchGame('dark souls');
	// }, []);

	const filteredGame = singleGameDatabase?.games?.filter(
		game => game?.id === id
	);

	useDocumentTitle(filteredGame?.[0]?.title);

	useEffect(() => {
		const getSingleGameDatabase = async () => {
			setLoading(true);
			const data = await GamesDataService?.getGame(user?.uid);
			setSingleGameDatabase(data?.data());
		};
		getSingleGameDatabase();
		setLoading(false);
	}, [user?.uid]);

	const getGamesDatabase = userId => {};

	const deleteGame = async id => {
		const filteredArray = singleGameDatabase?.games?.filter(
			game => game?.id !== id
		);

		singleGameDatabase.games = filteredArray;

		await GamesDataService.updateGame(user?.uid, singleGameDatabase);
		gameDeletedNotification();
		navigate('/media/games');
	};

	return (
		<CardComponent title={filteredGame?.[0]?.title}>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Edit Game</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<EditForm
						handleClose={handleClose}
						singleGame={singleGameDatabase}
						id={id}
						getGamesDatabase={getGamesDatabase}
						user={user}
					/>
				</Modal.Body>
			</Modal>
			<Modal show={showDelete} onHide={handleCloseDelete}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Deleting Game</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					Are you sure you want to delete this Game?
				</Modal.Body>
				<Modal.Footer className='bg-primary-dark text-color'>
					<Button color='warning' onClick={handleCloseDelete} text='Cancel' />
					<Button
						color='danger'
						onClick={() => {
							deleteGame(id);
							handleCloseDelete();
						}}
						text='Delete'
					/>
				</Modal.Footer>
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/games'>
						Back to Games
					</Link>
					<div>
						<span className='mx-1'>
							<Button
								color='danger'
								onClick={() => {
									handleShowDelete();
								}}
								text='Delete'
							/>
						</span>
						<Button color='success' onClick={() => handleShow()} text='Edit' />
					</div>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>

			{loading ? (
				<Loader />
			) : (
				<section className='mx-2 mt-2'>
					<section className='d-lg-flex align-items-start'>
						<img
							className='img img-fluid'
							width='200px'
							src={
								filteredGame?.[0]?.imageURL
									? filteredGame?.[0]?.imageURL
									: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
							}
							alt={filteredGame?.[0]?.title}
						/>
						{filteredGame?.[0]?.synopsis ? (
							<div className='col'>
								<h5 className='mt-lg-0 mt-3'>Synopsis</h5>
								<p className='px-3 text-start mx-3 new-line'>
									{filteredGame?.[0]?.synopsis}
								</p>
							</div>
						) : null}
					</section>
					<section className='d-flex justify-content-around mt-3'>
						<section>
							<div>
								<h5>Type</h5>
								<p>{filteredGame?.[0]?.type}</p>
							</div>
							<div>
								<h5>Status</h5>
								<p>{filteredGame?.[0]?.status}</p>
							</div>
						</section>
						<section>
							<div>
								<h5>Playtime</h5>
								<p>{filteredGame?.[0]?.playtime} Hours</p>
							</div>
						</section>
						<section>
							<div>
								<h5>Rating</h5>
								<p>⭐{filteredGame?.[0]?.rating}</p>
							</div>
							{filteredGame?.[0]?.link1 || filteredGame?.[0]?.link2 ? (
								<div>
									<h5>Links</h5>
									{filteredGame?.[0]?.link1 ? (
										<a
											href={filteredGame?.[0]?.link1}
											target='_blank'
											rel='noreferrer'
										>
											<div>{filteredGame?.[0]?.link1Name}</div>
										</a>
									) : null}
									{filteredGame?.[0]?.link2 ? (
										<a
											href={filteredGame?.[0]?.link2}
											target='_blank'
											rel='noreferrer'
										>
											<div>{filteredGame?.[0]?.link2Name}</div>
										</a>
									) : null}
								</div>
							) : null}
						</section>
					</section>
				</section>
			)}
		</CardComponent>
	);
};

export default SingleGame;
