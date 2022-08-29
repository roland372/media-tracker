import React, { useEffect, useState } from 'react';

//? <----- Router ----->
import { Link, useParams, useNavigate } from 'react-router-dom';

//? <----- Firebase ----->
import CharactersDataService from '../services/characters.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../../Layout/Loader';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import EditForm from './EditForm';

const SingleCharacter = () => {
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

	const characterDeletedNotification = () =>
		toast.success('Character Deleted', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const [singleCharacterDatabase, setSingleCharacterDatabase] = useState({});

	const [characterDetails, setCharacterDetails] = useState({});

	const fetchCharacter = async id => {
		setLoading(true);
		const temp = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`)
			.then(res => res.json())
			.catch(err => console.log(err));
		setCharacterDetails(temp?.data);
		setLoading(false);
	};

	const [characterImages, setCharacterImages] = useState({});

	const fetchImages = async id => {
		setLoading(true);
		const temp = await fetch(
			`https://api.jikan.moe/v4/characters/${id}/pictures`
		)
			.then(res => res.json())
			.catch(err => console.log(err));
		setCharacterImages(temp?.data);
		setLoading(false);
	};

	const filteredCharacter = singleCharacterDatabase?.characters?.filter(
		character => character?.id === id
	);

	const fetchedCharacterID = filteredCharacter?.[0]?.mal_id;

	useDocumentTitle(filteredCharacter?.[0]?.title);

	useEffect(() => {
		const getSingleCharacterDatabase = async () => {
			setLoading(true);
			const data = await CharactersDataService?.getCharacter(user?.uid);
			setSingleCharacterDatabase(data?.data());
		};
		getSingleCharacterDatabase();
		setLoading(false);
	}, [user?.uid]);

	useEffect(() => {
		if (fetchedCharacterID !== undefined) {
			fetchCharacter(fetchedCharacterID);
			fetchImages(fetchedCharacterID);
		}
	}, [fetchedCharacterID]);

	const getCharactersDatabase = userId => {};

	const deleteCharacter = async id => {
		const filteredArray = singleCharacterDatabase?.characters?.filter(
			character => character?.id !== id
		);

		singleCharacterDatabase.characters = filteredArray;

		await CharactersDataService.updateCharacter(
			user?.uid,
			singleCharacterDatabase
		);
		characterDeletedNotification();
		navigate('/media/characters');
	};

	// console.log(characterDetails);
	// console.log(characterImages);

	return (
		<CardComponent title={filteredCharacter?.[0]?.title}>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Edit Character</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<EditForm
						handleClose={handleClose}
						singleCharacter={singleCharacterDatabase}
						id={id}
						getCharactersDatabase={getCharactersDatabase}
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
					<Modal.Title>Deleting Character</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					Are you sure you want to delete this Character?
				</Modal.Body>
				<Modal.Footer className='bg-primary-dark text-color'>
					<button className='btn btn-warning' onClick={handleCloseDelete}>
						Cancel
					</button>
					<button
						className='btn btn-danger'
						onClick={() => {
							deleteCharacter(id);
							handleCloseDelete();
						}}
					>
						Delete
					</button>
				</Modal.Footer>
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/characters'>
						Back to Characters
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

			{loading ? (
				<Loader />
			) : (
				<section className='mx-2 mt-2'>
					<section className='d-lg-flex align-items-start'>
						<img
							className='img img-fluid'
							width='200px'
							src={
								filteredCharacter?.[0]?.imageURL
									? filteredCharacter?.[0]?.imageURL
									: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
							}
							alt={filteredCharacter?.[0]?.title}
						/>
						{characterDetails?.about ? (
							<div className='col'>
								<h5 className='mt-lg-0 mt-3'>About</h5>
								<p className='px-3 text-start mx-3 new-line'>
									{characterDetails?.about}
								</p>
							</div>
						) : null}
					</section>
					{characterDetails?.mal_id ? (
						<div>
							<hr />
							<section>
								{characterDetails?.anime?.length !== 0 ? (
									<div>
										<h4 className='pb-2'>Anime</h4>
										<div className='row'>
											{characterDetails?.anime?.map((character, index) => (
												<OverlayTrigger
													key={index}
													placement='top'
													overlay={
														<Tooltip>
															<div className='text-start'>
																<div>{character?.anime?.title}</div>
																<div>Role: {character?.role}</div>
															</div>
														</Tooltip>
													}
												>
													<div className='col-lg-2 col-sm-4 col-6 mb-2'>
														<a
															href={character?.anime?.url}
															target='_blank'
															rel='noreferrer'
														>
															<img
																src={character?.anime?.images?.jpg?.image_url}
																alt=''
																className='w-100 shadow-1-strong rounded mb-2'
																style={{
																	width: '20vh',
																	height: '30vh',
																	objectFit: 'cover',
																}}
															/>
														</a>
													</div>
												</OverlayTrigger>
											))}
										</div>
									</div>
								) : null}
							</section>
							<hr />
							<section>
								{characterDetails?.manga?.length !== 0 ? (
									<div>
										<h4 className='pb-2'>Manga</h4>
										<div className='row'>
											{characterDetails?.manga?.map((character, index) => (
												<OverlayTrigger
													key={index}
													placement='top'
													overlay={
														<Tooltip>
															<div className='text-start'>
																<div>{character?.manga?.title}</div>
																<div>Role: {character?.role}</div>
															</div>
														</Tooltip>
													}
												>
													<div className='col-lg-2 col-sm-4 col-6 mb-2'>
														<a
															href={character?.manga?.url}
															target='_blank'
															rel='noreferrer'
														>
															<img
																src={character?.manga?.images?.jpg?.image_url}
																alt=''
																className='w-100 shadow-1-strong rounded mb-2'
																style={{
																	width: '20vh',
																	height: '30vh',
																	objectFit: 'cover',
																}}
															/>
														</a>
													</div>
												</OverlayTrigger>
											))}
										</div>
									</div>
								) : null}
							</section>
							<hr />
							<section>
								{characterImages?.length !== 0 ? (
									<div>
										<h4 className='pb-2'>Images</h4>
										<div className='row'>
											{characterImages?.map((character, index) => (
												<div
													className='col-lg-2 col-sm-4 col-6 mb-2'
													key={index}
												>
													<img
														src={character?.jpg?.image_url}
														alt=''
														className='w-100 shadow-1-strong rounded mb-2'
														style={{
															width: '20vh',
															height: '30vh',
															objectFit: 'cover',
														}}
													/>
												</div>
											))}
										</div>
									</div>
								) : null}
							</section>
						</div>
					) : null}
				</section>
			)}
		</CardComponent>
	);
};

export default SingleCharacter;
