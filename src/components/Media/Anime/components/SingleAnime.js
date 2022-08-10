import React, { useEffect, useState } from 'react';

//? <----- Router ----->
import { Link, useParams, useNavigate } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../../../Layout/Loader';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import EditForm from './EditForm';

const SingleAnime = () => {
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

	const animeDeletedNotification = () =>
		toast.success('Anime Deleted', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const [singleAnimeDatabase, setSingleAnimeDatabase] = useState({});

	const [animeDetails, setAnimeDetails] = useState({});

	const fetchAnime = async query => {
		setLoading(true);
		const temp = await fetch(`https://api.jikan.moe/v4/anime/${query}/full`)
			.then(res => res.json())
			.catch(err => console.log(err));
		setAnimeDetails(temp.data);
		setLoading(false);
	};

	const [animeImages, setAnimeImages] = useState({});

	const fetchImages = async id => {
		setLoading(true);
		const temp = await fetch(`https://api.jikan.moe/v4/anime/${id}/pictures`)
			.then(res => res.json())
			.catch(err => console.log(err));
		setAnimeImages(temp.data);

		setLoading(false);
	};

	const filteredAnime = singleAnimeDatabase?.anime?.filter(
		anime => anime.id === id
	);
	const fetchedAnimeID = filteredAnime?.[0]?.mal_id;

	useDocumentTitle(filteredAnime?.[0]?.title);

	useEffect(() => {
		const getSingleAnimeDatabase = async () => {
			setLoading(true);
			const data = await AnimeDataService?.getAnime(user?.uid);
			setSingleAnimeDatabase(data.data());
		};
		getSingleAnimeDatabase();
		setLoading(false);
	}, [user?.uid]);

	useEffect(() => {
		if (fetchedAnimeID !== undefined) {
			fetchAnime(fetchedAnimeID);
			fetchImages(fetchedAnimeID);
		}
	}, [fetchedAnimeID]);

	const getAnimeDatabase = userId => {};

	const deleteAnime = async id => {
		const filteredArray = singleAnimeDatabase?.anime?.filter(
			anime => anime.id !== id
		);

		singleAnimeDatabase.anime = filteredArray;

		await AnimeDataService.updateAnime(user?.uid, singleAnimeDatabase);
		animeDeletedNotification();
		navigate('/media/anime');
	};

	// console.log(animeDetails);
	// console.log(animeImages);

	return (
		<CardComponent title={filteredAnime?.[0]?.title}>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Edit Anime</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<EditForm
						handleClose={handleClose}
						singleAnime={singleAnimeDatabase}
						id={id}
						// getSingleAnimeDatabase={getSingleAnimeDatabase}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
			</Modal>
			<Modal show={showDelete} onHide={handleCloseDelete}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Deleting Anime</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					Are you sure you want to delete this Anime?
				</Modal.Body>
				<Modal.Footer className='bg-primary-dark text-color'>
					<button className='btn btn-warning' onClick={handleCloseDelete}>
						Cancel
					</button>
					<button
						className='btn btn-danger'
						onClick={() => {
							deleteAnime(id);
							handleCloseDelete();
						}}
					>
						Delete
					</button>
				</Modal.Footer>
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/anime'>
						Back to Anime
					</Link>
					<div>
						<button
							className='btn btn-danger mx-1'
							// onClick={() => deleteAnime(id)}
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
							className='img img-fluid text-start'
							width='200px'
							src={
								filteredAnime?.[0]?.imageURL
									? filteredAnime?.[0]?.imageURL
									: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
							}
							alt={filteredAnime?.[0]?.title}
						/>
						{animeDetails?.synopsis ? (
							<div className='col'>
								<h5 className='mt-lg-0 mt-3'>Synopsis</h5>
								<p className='px-3 text-start mx-3 new-line'>
									{animeDetails?.synopsis}
								</p>
							</div>
						) : null}
					</section>
					<section className='d-flex justify-content-around mt-3'>
						<section>
							<div>
								<h5>Type</h5>
								<p>{filteredAnime?.[0]?.type}</p>
							</div>
							<div>
								<h5>Status</h5>
								<p>{filteredAnime?.[0]?.status}</p>
							</div>
						</section>
						<section>
							<div>
								<h5>Episodes</h5>
								<p>
									{filteredAnime?.[0]?.episodesMin}/
									{filteredAnime?.[0]?.episodesMax}
								</p>
							</div>
						</section>
						<section>
							<div>
								<h5>Rating</h5>
								<p>⭐{filteredAnime?.[0]?.rating}</p>
							</div>
							{filteredAnime?.[0]?.link1 || filteredAnime?.[0]?.link2 ? (
								<div>
									<h5>Links</h5>
									{filteredAnime?.[0]?.link1 ? (
										<a
											href={filteredAnime?.[0]?.link1}
											target='_blank'
											rel='noreferrer'
										>
											<div>{filteredAnime?.[0]?.link1Name}</div>
										</a>
									) : null}
									{filteredAnime?.[0]?.link2 ? (
										<a
											href={filteredAnime?.[0]?.link2}
											target='_blank'
											rel='noreferrer'
										>
											<div>{filteredAnime?.[0]?.link2Name}</div>
										</a>
									) : null}
								</div>
							) : null}
						</section>
					</section>
					{animeDetails?.mal_id ? (
						<div>
							<hr />
							<section className='d-flex justify-content-around mt-3'>
								<section>
									{animeDetails?.year ? (
										<div>
											<h5>Year</h5>
											<p>{animeDetails?.year}</p>
										</div>
									) : null}
									<div>
										<h5>Status</h5>
										<p>{animeDetails?.status}</p>
									</div>
								</section>
								<section>
									<div>
										<h5>Genres</h5>
										{animeDetails?.genres?.map((genre, index) => (
											<div key={index}>{genre.name}</div>
										))}
									</div>
								</section>
								<section>
									<div>
										<h5>Source</h5>
										<p>{animeDetails?.source}</p>
									</div>
								</section>
							</section>
							{animeDetails?.relations?.length !== 0 ? (
								<div>
									<hr />
									<section className='pb-3'>
										<h5>Relations</h5>
										{animeDetails?.relations?.map((relation, index) => (
											<div key={index} className='text-start mx-3'>
												{relation?.entry?.map((entry, index) => (
													<div key={index}>
														{relation?.relation}:{' '}
														<a
															href={entry?.url}
															target='_blank'
															rel='noreferrer'
														>
															{entry?.name}
														</a>
													</div>
												))}
											</div>
										))}
									</section>
								</div>
							) : null}
							<hr />
							{animeDetails?.trailer?.embed_url ? (
								<section>
									<h5>Trailer</h5>
									<div className='iframe-container'>
										<iframe
											className='responsive-iframe pt-2'
											allowFullScreen={true}
											src={animeDetails?.trailer?.embed_url?.replace(
												'autoplay=1',
												'autoplay=0'
											)}
											title={animeDetails?.title}
										/>
									</div>
								</section>
							) : null}
							<hr />
							{animeImages?.lenght !== 0 ? (
								<div>
									<h4 className='pb-2'>Images</h4>
									<div className='row'>
										{animeImages.map((image, index) => (
											<div className='col-lg-2 col-sm-4 col-6 mb-2' key={index}>
												<img
													src={image?.jpg?.image_url}
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
						</div>
					) : null}
				</section>
			)}
		</CardComponent>
	);
};

export default SingleAnime;
