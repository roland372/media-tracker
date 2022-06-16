import React from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

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
							{singleMedia?.favourites ? (
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
										getSingleMediaDatabase(id);
									}}
								>
									Edit
								</button>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => deleteMedia(id)}
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
