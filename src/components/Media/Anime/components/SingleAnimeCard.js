import React, { useState, useEffect } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- Components ----->
import EditForm from '../components/EditForm';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

//? <----- Icons ----->
import { AiFillStar } from 'react-icons/ai';

const SingleAnimeCard = ({
	title,
	imageURL,
	id,
	deleteAnime,
	getAnimeDatabase,
	user,
}) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [singleAnime, setSingleAnime] = useState({});

	const getSingleAnimeDatabase = async id => {
		const data = await AnimeDataService.getAnime(id);
		setSingleAnime(data.data());
	};

	useEffect(() => {
		getSingleAnimeDatabase(id);
	}, [id]);

	return (
		<section className='p-2 bg-image'>
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
						singleAnime={singleAnime}
						id={id}
						getSingleAnimeDatabase={getSingleAnimeDatabase}
						getAnimeDatabase={getAnimeDatabase}
						user={user}
					/>
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
			</Modal>
			<OverlayTrigger
				trigger='click'
				placement='auto'
				rootClose={true}
				// delay={{ show: 100, hide: 2000 }}
				overlay={
					<Popover>
						<Popover.Header>
							{title}{' '}
							{singleAnime?.favourites ? (
								<AiFillStar size={18} className='text-warning' />
							) : null}
						</Popover.Header>
						<Popover.Body onClick={() => document.body.click()}>
							<div className='d-flex justify-content-start'>
								<Link
									to={`/media/anime/${id}`}
									className='btn btn-sm btn-primary'
								>
									View
								</Link>
								<button
									className='btn btn-sm btn-success mx-1'
									onClick={() => {
										handleShow();
										getSingleAnimeDatabase(id);
									}}
								>
									Edit
								</button>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => deleteAnime(id)}
								>
									Delete
								</button>
							</div>
						</Popover.Body>
					</Popover>
				}
			>
				<div className='position-relative'>
					<img
						style={{ height: '200px', width: '150px' }}
						src={
							imageURL
								? imageURL
								: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
						}
						alt=''
						className='img img-fluid'
						role='button'
					/>
				</div>
			</OverlayTrigger>
		</section>
	);
};

export default SingleAnimeCard;
