import React, { useState } from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import AnimeForm from './Anime/components/Form';
import RecentAnime from './Anime/components/RecentAnime';

const AllMedia = () => {
	const mediaOptions = [
		{ value: 'anime', label: 'Anime' },
		{ value: 'manga', label: 'Manga' },
		{ value: 'game', label: 'Game' },
	];

	let [selectMediaValue, setSelectMediaValue] = useState('');

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<CardComponent title='Media'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Add Media</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<Select
						defaultValue={{ label: 'Select Media', value: 0 }}
						options={mediaOptions}
						className='text-dark'
						onChange={e => setSelectMediaValue(e.value)}
					/>

					{selectMediaValue === 'anime' ? (
						<AnimeForm handleClose={handleClose} />
					) : null}
				</Modal.Body>
				{/* <Modal.Footer className='bg-primary-dark text-color'>test</Modal.Footer> */}
			</Modal>
			<div className='d-flex align-items-center justify-content-start ms-2 pt-1'>
				<button
					className='btn btn-primary'
					onClick={() => {
						handleShow();
						console.log('clicked');
					}}
				>
					Add Media
				</button>
			</div>
			<div className='mx-2'>
				<hr />
			</div>
			<RecentAnime />
			<Link to='/media/anime'>All Anime</Link>
			<hr />
			<h5>Recent Manga</h5>
		</CardComponent>
	);
};

export default AllMedia;
