import React, { useState } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import AllAnime from './AllAnime';
import CardComponent from '../../../Layout/CardComponent';
import Form from '../components/Form';
import { Modal } from 'react-bootstrap';

const Anime = ({ anime }) => {
	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<CardComponent title='Anime'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Add Anime</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<Form handleClose={handleClose} />
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
			</Modal>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-between mx-2 pt-1'>
					<button
						className='btn btn-primary'
						to='/media'
						onClick={() => handleShow()}
					>
						Add Anime
					</button>
					<Link className='btn btn-primary' to='/media'>
						Back to Media
					</Link>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<AllAnime />
		</CardComponent>
	);
};

export default Anime;
