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

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import EditForm from './EditForm';

const SingleAnime = () => {
	const { id } = useParams();
	const { user } = useUserAuth();
	const navigate = useNavigate();

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
	useDocumentTitle(singleAnimeDatabase?.title);

	const getSingleAnimeDatabase = async id => {
		const data = await AnimeDataService.getAnime(id);
		setSingleAnimeDatabase(data.data());
	};

	const getAnimeDatabase = userId => {};

	const deleteAnime = async id => {
		await AnimeDataService.deleteAnime(id);
		animeDeletedNotification();
		navigate('/media/anime');
	};

	useEffect(() => {
		getSingleAnimeDatabase(id);
	}, [id]);

	const {
		title,
		imageURL,
		synopsis,
		type,
		link,
		episodesMin,
		episodesMax,
		status,
		rating,
	} = singleAnimeDatabase;

	return (
		<CardComponent title={title}>
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
						getSingleAnimeDatabase={getSingleAnimeDatabase}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/anime'>
						Back to Anime
					</Link>
					<div>
						<button
							className='btn btn-danger mx-1'
							onClick={() => deleteAnime(id)}
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
						<div className=''>
							<h5 className='mt-lg-0 mt-3 text-center'>Synopsis</h5>
							<p className='px-3 text-start'>{synopsis}</p>
						</div>
					) : null}
				</section>
				<section className='d-flex justify-content-around mt-3'>
					<div>
						<h5>Type</h5>
						<p>{type}</p>
					</div>
					<div>
						<h5>Link</h5>
						<a href={link} target='_blank' rel='noreferrer'>
							<p>Link</p>
						</a>
					</div>
					<div>
						<h5>Episodes</h5>
						<p>
							{episodesMin}/{episodesMax}
						</p>
					</div>
					<div>
						<h5>Status</h5>
						<p>{status}</p>
					</div>
					<div>
						<h5>Rating</h5>
						<p>⭐{rating}</p>
					</div>
				</section>
			</section>
		</CardComponent>
	);
};

export default SingleAnime;
