import React, { useState } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

//? <----- Icons ----->
import { AiFillStar } from 'react-icons/ai';

const SingleMediaCard = ({
	children,
	show,
	handleClose,
	mediaType,
	title,
	singleMedia,
	id,
	handleShow,
	getSingleMediaDatabase,
	deleteMedia,
	imageURL,
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
					<button className='btn btn-warning' onClick={handleCloseDelete}>
						Cancel
					</button>
					<button
						className='btn btn-danger'
						onClick={() => {
							deleteMedia(id);
							handleCloseDelete();
							mediaDeletedNotification();
						}}
					>
						Delete
					</button>
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
							{title}{' '}
							{singleMedia?.favourites ? (
								<AiFillStar size={18} className='text-warning' />
							) : null}
						</Popover.Header>
						<Popover.Body onClick={() => document.body.click()}>
							<div className='d-flex justify-content-start'>
								<Link
									to={`/media/${mediaType.toLowerCase()}/${id}`}
									className='btn btn-sm btn-primary'
								>
									View
								</Link>
								<button
									className='btn btn-sm btn-success mx-1'
									onClick={() => {
										handleShow();
										getSingleMediaDatabase(id);
									}}
								>
									Edit
								</button>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => {
										//  deleteMedia(id);
										handleShowDelete();
									}}
								>
									Delete
								</button>
							</div>
						</Popover.Body>
					</Popover>
				}
			>
				<img
					src={
						imageURL
							? imageURL
							: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
					}
					alt=''
					className='rounded media-img-card'
					role='button'
				/>
			</OverlayTrigger>
		</section>
	);
};

export default SingleMediaCard;
