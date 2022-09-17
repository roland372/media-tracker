import React, { useState } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Button from '../../Layout/Button';

//? <----- Icons ----->
import { AiFillStar } from 'react-icons/ai';

const SingleMediaCard = ({
	children,
	show,
	handleClose,
	mediaType,
	singleMedia,
	id,
	handleShow,
	getSingleMediaDatabase,
	deleteMedia,
}) => {
	const mediaDeletedNotification = () =>
		toast.success(`${mediaType} Deleted`, {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	//* <----- Delete modal state ----->
	const [showDelete, setShowDelete] = useState(false);

	//* <----- Delete modal functions ----->
	const handleCloseDelete = () => setShowDelete(false);
	const handleShowDelete = () => setShowDelete(true);

	return (
		<section className='p-2'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Edit {mediaType}</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					{children}
				</Modal.Body>
			</Modal>
			<Modal show={showDelete} onHide={handleCloseDelete}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Deleting {mediaType}</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					Are you sure you want to delete this {mediaType}?
				</Modal.Body>
				<Modal.Footer className='bg-primary-dark text-color'>
					<Button color='warning' onClick={handleCloseDelete} text='Cancel' />
					<Button
						color='danger'
						onClick={() => {
							deleteMedia(id);
							handleCloseDelete();
							mediaDeletedNotification();
						}}
						text='Delete'
					/>
				</Modal.Footer>
			</Modal>
			<OverlayTrigger
				trigger='click'
				placement='auto'
				rootClose={true}
				// delay={{ show: 100, hide: 2000 }}
				overlay={
					<Popover>
						<Popover.Header>
							{mediaType === 'Characters'
								? singleMedia?.name
								: singleMedia?.title}{' '}
							{singleMedia?.favourites ? (
								<AiFillStar size={18} className='text-warning' />
							) : null}
						</Popover.Header>
						<Popover.Body onClick={() => document.body.click()}>
							{mediaType === 'Anime' ? (
								<section>
									<div>Type: {singleMedia?.type}</div>
									<div>
										Link:{' '}
										<a
											href={singleMedia?.link1}
											target='_blank'
											rel='noreferrer'
										>
											{singleMedia?.link1Name}
										</a>
									</div>
									<div>
										Episodes: {singleMedia?.episodesMin} /{' '}
										{singleMedia?.episodesMax}
									</div>
									<div>Rating: ⭐{singleMedia?.rating}</div>
									<div>Status: {singleMedia?.status}</div>
									<hr />
								</section>
							) : null}
							{mediaType === 'Manga' ? (
								<section>
									<div>Type: {singleMedia?.type}</div>
									<div>
										Link:{' '}
										<a
											href={singleMedia?.link1}
											target='_blank'
											rel='noreferrer'
										>
											{singleMedia?.link1Name}
										</a>
									</div>
									<div>
										Chapters: {singleMedia?.chaptersMin} /{' '}
										{singleMedia?.chaptersMax}
									</div>
									<div>
										Volumes: {singleMedia?.volumesMin} /{' '}
										{singleMedia?.volumesMax}
									</div>
									<div>Rating: ⭐{singleMedia?.rating}</div>
									<div>Status: {singleMedia?.status}</div>
									<hr />
								</section>
							) : null}
							{mediaType === 'Games' ? (
								<section>
									<div>Type: {singleMedia?.type}</div>
									<div>
										Link:{' '}
										<a
											href={singleMedia?.link1}
											target='_blank'
											rel='noreferrer'
										>
											{singleMedia?.link1Name}
										</a>
									</div>
									<div>Playtime: {singleMedia?.playtime} hours</div>
									<div>Rating: ⭐{singleMedia?.rating}</div>
									<div>Status: {singleMedia?.status}</div>
									<hr />
								</section>
							) : null}
							{mediaType === 'Characters' ? (
								<section>
									<div>
										Links:{' '}
										<a
											href={singleMedia?.link1}
											target='_blank'
											rel='noreferrer'
										>
											{singleMedia?.link1Name}
										</a>
										{singleMedia?.link2 ? (
											<span>
												,{' '}
												<a
													href={singleMedia?.link2}
													target='_blank'
													rel='noreferrer'
												>
													{singleMedia?.link2Name}
												</a>
											</span>
										) : null}
									</div>
									<div>Source: {singleMedia?.source}</div>
									<div>Gender: {singleMedia?.gender}</div>
									<div>Series: {singleMedia?.series}</div>
									<div>Hair Color: {singleMedia?.hairColor}</div>
									<hr />
								</section>
							) : null}
							<section className='d-flex justify-content-start'>
								<Link
									to={`/media/${mediaType.toLowerCase()}/${id}`}
									className='btn btn-sm btn-primary shadow-none'
								>
									View
								</Link>
								<span className='mx-1'>
									<Button
										color='success'
										onClick={() => {
											handleShow();
											getSingleMediaDatabase(id);
										}}
										sm
										text='Edit'
									/>
								</span>
								<Button
									color='danger'
									onClick={() => {
										//  deleteMedia(id);
										handleShowDelete();
									}}
									sm
									text='Delete'
								/>
							</section>
						</Popover.Body>
					</Popover>
				}
			>
				<div className='position-relative'>
					<img
						src={
							singleMedia?.imageURL
								? singleMedia?.imageURL
								: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
						}
						alt=''
						className='rounded media-img-card'
						role='button'
					/>
					{/* <div className='bottom-0 start-0 p-2 m-2'>
						{singleMedia?.title}
					</div> */}
					{mediaType === 'Anime' ? (
						<div>
							<div className='position-absolute top-0 end-0'>
								{singleMedia?.favourites ? (
									<AiFillStar size={25} className='text-warning rounded m-1' />
								) : null}
							</div>
							<div className='position-absolute top-0 start-0 badge bg-dark m-1'>
								Ep {singleMedia?.episodesMin} / {singleMedia?.episodesMax}
							</div>
							<div className='position-absolute bottom-0 start-0 badge bg-dark m-1'>
								<div className='text-wrap'>{singleMedia?.title}</div>
							</div>
						</div>
					) : null}
					{mediaType === 'Games' ? (
						<div>
							<div className='position-absolute top-0 end-0'>
								{singleMedia?.favourites ? (
									<AiFillStar size={25} className='text-warning rounded m-1' />
								) : null}
							</div>
							<div className='position-absolute top-0 start-0 badge bg-dark m-1'>
								{singleMedia?.playtime} hours
							</div>
							<div className='position-absolute bottom-0 start-0 badge bg-dark m-1'>
								<div className='text-wrap'>{singleMedia?.title}</div>
							</div>
						</div>
					) : null}
					{mediaType === 'Manga' ? (
						<div>
							<div className='position-absolute top-0 end-0'>
								{singleMedia?.favourites ? (
									<AiFillStar size={25} className='text-warning rounded m-1' />
								) : null}
							</div>
							<div className='position-absolute top-0 start-0 badge bg-dark m-1 text-start'>
								<div>
									Ch {singleMedia?.chaptersMin} / {singleMedia?.chaptersMax}
								</div>
								<div>
									Vol {singleMedia?.volumesMin} / {singleMedia?.volumesMax}
								</div>
							</div>
							<div className='position-absolute bottom-0 start-0 badge bg-dark m-1'>
								<div className='text-wrap'>{singleMedia?.title}</div>
							</div>
						</div>
					) : null}
					{mediaType === 'Characters' ? (
						<div>
							<div className='position-absolute top-0 end-0'>
								{singleMedia?.favourites ? (
									<AiFillStar size={25} className='text-warning rounded m-1' />
								) : null}
							</div>
							<div className='position-absolute bottom-0 start-0 badge bg-dark m-1'>
								<div className='text-wrap'>{singleMedia?.name}</div>
							</div>
						</div>
					) : null}
				</div>
			</OverlayTrigger>
		</section>
	);
};

export default SingleMediaCard;
