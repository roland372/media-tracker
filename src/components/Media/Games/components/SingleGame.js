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

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import EditForm from './EditForm';

const SingleGame = () => {
	const { id } = useParams();
	const { user } = useUserAuth();
	const navigate = useNavigate();

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
	useDocumentTitle(singleGameDatabase?.title);

	const getSingleGameDatabase = async id => {
		const data = await GamesDataService.getGame(id);
		setSingleGameDatabase(data.data());
	};

	const getGamesDatabase = userId => {};

	const deleteGame = async id => {
		await GamesDataService.deleteGame(id);
		gameDeletedNotification();
		navigate('/media/games');
	};

	useEffect(() => {
		getSingleGameDatabase(id);
	}, [id]);

	const {
		title,
		imageURL,
		synopsis,
		playtime,
		type,
		link1,
		link1Name,
		link2,
		link2Name,
		status,
		rating,
	} = singleGameDatabase;

	return (
		<CardComponent title={title}>
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
						getSingleGameDatabase={getSingleGameDatabase}
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
					<button className='btn btn-warning' onClick={handleCloseDelete}>
						Cancel
					</button>
					<button
						className='btn btn-danger'
						onClick={() => {
							deleteGame(id);
							handleCloseDelete();
						}}
					>
						Delete
					</button>
				</Modal.Footer>
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/games'>
						Back to Games
					</Link>
					<div>
						<button
							className='btn btn-danger mx-1'
							onClick={() => {
								handleShowDelete();
							}}
						>
							Delete
						</button>
						<button className='btn btn-success' onClick={() => handleShow()}>
							Edit
						</button>
					</div>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<section className='mx-2 mt-2'>
				<section className='d-lg-flex align-items-start'>
					<img
						className='img img-fluid'
						width='200px'
						src={
							imageURL
								? imageURL
								: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
						}
						alt={title}
					/>
					{synopsis ? (
						<div className='col'>
							<h5 className='mt-lg-0 mt-3'>Synopsis</h5>
							<p className='px-3 text-start mx-3'>{synopsis}</p>
						</div>
					) : null}
				</section>
				<section className='d-flex justify-content-around mt-3'>
					<section>
						<div>
							<h5>Type</h5>
							<p>{type}</p>
						</div>
						<div>
							<h5>Status</h5>
							<p>{status}</p>
						</div>
					</section>
					<section>
						<div>
							<h5>Playtime</h5>
							<p>{playtime} Hours</p>
						</div>
					</section>
					<section>
						<div>
							<h5>Rating</h5>
							<p>⭐{rating}</p>
						</div>
						{link1 || link2 ? (
							<div>
								<h5>Links</h5>
								{link1 ? (
									<a href={link1} target='_blank' rel='noreferrer'>
										<div>{link1Name}</div>
									</a>
								) : null}
								{link2 ? (
									<a href={link2} target='_blank' rel='noreferrer'>
										<div>{link2Name}</div>
									</a>
								) : null}
							</div>
						) : null}
					</section>
				</section>
			</section>
		</CardComponent>
	);
};

export default SingleGame;
