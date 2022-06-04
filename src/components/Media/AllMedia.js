import React, { useState } from 'react';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';
import SingleAnimeCard from './Anime/components/SingleAnimeCard';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

const AllMedia = () => {
	const mediaOptions = [
		{ value: 'anime', label: 'Anime' },
		{ value: 'manga', label: 'Manga' },
		{ value: 'game', label: 'Game' },
	];

	const animeType = [
		{ value: 'tv-show', label: 'TV-Show' },
		{ value: 'movie', label: 'Movie' },
		{ value: 'ova', label: 'OVA' },
	];

	const ratingOptions = [
		{ value: '1', label: '⭐1' },
		{ value: '2', label: '⭐2' },
		{ value: '3', label: '⭐3' },
	];

	const statusOptions = [
		{ value: 'watching', label: 'Watching' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'on-hold', label: 'On-Hold' },
		{ value: 'dropped', label: 'Dropped' },
		{ value: 'plan-to-watch', label: 'Plan to Watch' },
	];

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
					/>
					<form>
						<div className='mt-3 mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Enter Anime Title'
								maxLength='100'
							/>
						</div>
						<div className='mt-3 mb-2'>
							<textarea
								type='text'
								className='form-control'
								placeholder='Enter Synopsis'
								rows='3'
							/>
						</div>
						<div className='mt-3 mb-2'>
							<Select
								defaultValue={{ label: 'Select Type', value: 0 }}
								options={animeType}
								className='text-dark'
							/>
						</div>
						<div className='mt-3 mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Enter Link'
								maxLength='200'
							/>
						</div>
						<div className='mt-3 mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Enter Image URL'
								maxLength='200'
							/>
						</div>
						<div className='mt-3 mb-2'>
							<Select
								defaultValue={{ label: 'Rating', value: 0 }}
								options={ratingOptions}
								className='text-dark'
							/>
						</div>
						<div className='mt-3 mb-2'>
							<Select
								defaultValue={{
									label: 'Plan to Watch',
									value: 'plan-to-watch',
								}}
								options={statusOptions}
								className='text-dark'
							/>
						</div>
						<div className='mt-3 mb-2'>
							<div className='d-flex align-items-center'>
								<h5 className='pe-2'>Episodes</h5>
								<input
									style={{ width: '50px' }}
									type='number'
									className='form-control '
									placeholder='1'
								/>
								<span className='mx-2'>/</span>
								<input
									style={{ width: '50px' }}
									type='number'
									className='form-control '
									placeholder='24'
								/>
							</div>
						</div>
						<div className='mb-3 form-check'>
							<input type='checkbox' className='form-check-input' />
							<label className='form-check-label'>Add to Favourites?</label>
						</div>
						<button
							className='btn btn-success'
							onClick={e => {
								e.preventDefault();
								handleClose();
								console.log('Added');
							}}
						>
							Add
						</button>
					</form>
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
			{/* <h5>Anime</h5> */}
			{/* <SingleAnimeCard /> */}
			{/* <SingleAnimeCard /> */}
			{/* <SingleAnimeCard /> */}
			{/* <Link to='/media/anime'>anime</Link> */}
		</CardComponent>
	);
};

export default AllMedia;
