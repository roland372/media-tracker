import React, { useEffect, useState } from 'react';

//? <----- Router ----->
import { Link, useParams, useNavigate } from 'react-router-dom';

//? <----- Firebase ----->
import MangaDataService from '../services/manga.services';

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

const SingleManga = () => {
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

	const mangaDeletedNotification = () =>
		toast.success('Manga Deleted', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const [singleMangaDatabase, setSingleMangaDatabase] = useState({});

	const [mangaDetails, setMangaDetails] = useState([]);

	const fetchManga = async query => {
		setLoading(true);
		const temp = await fetch(`https://api.jikan.moe/v4/manga/${query}/full`)
			.then(res => res.json())
			.catch(err => console.log(err));
		setMangaDetails(temp.data);
		setLoading(false);
	};

	const filteredManga = singleMangaDatabase?.manga?.filter(
		manga => manga.id === id
	);

	const fetchedMangaID = filteredManga?.[0]?.mal_id;

	useDocumentTitle(filteredManga?.[0]?.title);

	useEffect(() => {
		const getSingleMangaDatabase = async () => {
			setLoading(true);
			const data = await MangaDataService?.getManga(user?.uid);
			setSingleMangaDatabase(data.data());
		};
		getSingleMangaDatabase();
		setLoading(false);
	}, [user?.uid]);

	useEffect(() => {
		if (fetchedMangaID !== undefined) fetchManga(fetchedMangaID);
	}, [fetchedMangaID]);

	const getMangaDatabase = userId => {};

	const deleteManga = async id => {
		const filteredArray = singleMangaDatabase?.manga?.filter(
			manga => manga.id !== id
		);

		singleMangaDatabase.manga = filteredArray;

		await MangaDataService.updateManga(user?.uid, singleMangaDatabase);
		mangaDeletedNotification();
		navigate('/media/manga');
	};

	return (
		<CardComponent title={filteredManga?.[0]?.title}>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Edit Manga</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<EditForm
						handleClose={handleClose}
						singleManga={singleMangaDatabase}
						id={id}
						getMangaDatabase={getMangaDatabase}
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
					<Modal.Title>Deleting Manga</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					Are you sure you want to delete this Manga?
				</Modal.Body>
				<Modal.Footer className='bg-primary-dark text-color'>
					<button className='btn btn-warning' onClick={handleCloseDelete}>
						Cancel
					</button>
					<button
						className='btn btn-danger'
						onClick={() => {
							deleteManga(id);
							handleCloseDelete();
						}}
					>
						Delete
					</button>
				</Modal.Footer>
			</Modal>

			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/manga'>
						Back to Manga
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
								filteredManga?.[0]?.imageURL
									? filteredManga?.[0]?.imageURL
									: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
							}
							alt={filteredManga?.[0]?.title}
						/>
						{mangaDetails?.synopsis ? (
							<div className='col'>
								<h5 className='mt-lg-0 mt-3'>Synopsis</h5>
								<p className='px-3 text-start mx-3 new-line'>
									{mangaDetails?.synopsis}
								</p>
							</div>
						) : null}
					</section>
					<section className='d-flex justify-content-around mt-3'>
						<section>
							<div>
								<h5>Type</h5>
								<p>{filteredManga?.[0]?.type}</p>
							</div>
							<div>
								<h5>Status</h5>
								<p>{filteredManga?.[0]?.status}</p>
							</div>
						</section>
						<section>
							<div>
								<h5>Chapters</h5>
								<p>
									{filteredManga?.[0]?.chaptersMin}/
									{filteredManga?.[0]?.chaptersMax}
								</p>
							</div>
							<div>
								<h5>Volumes</h5>
								<p>
									{filteredManga?.[0]?.volumesMin}/
									{filteredManga?.[0]?.volumesMax}
								</p>
							</div>
						</section>
						<section>
							<div>
								<h5>Rating</h5>
								<p>⭐{filteredManga?.[0]?.rating}</p>
							</div>
							{filteredManga?.[0]?.link1 || filteredManga?.[0]?.link2 ? (
								<div>
									<h5>Links</h5>
									{filteredManga?.[0]?.link1 ? (
										<a
											href={filteredManga?.[0]?.link1}
											target='_blank'
											rel='noreferrer'
										>
											<div>{filteredManga?.[0]?.link1Name}</div>
										</a>
									) : null}
									{filteredManga?.[0]?.link2 ? (
										<a
											href={filteredManga?.[0]?.link2}
											target='_blank'
											rel='noreferrer'
										>
											<div>{filteredManga?.[0]?.link2Name}</div>
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

export default SingleManga;
