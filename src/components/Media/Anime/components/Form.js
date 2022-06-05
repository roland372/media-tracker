import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

const Form = props => {
	//* select values
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

	//* initialize anime object
	const [anime, setAnime] = useState({
		title: '',
		synopsis: '',
		type: '',
		link: '',
		imageURL: '',
		rating: 0,
		status: '',
		episodesMin: 0,
		episodesMax: 0,
		favourites: false,
		// owner: user.uid,
		lastModified: Date.now(),
	});

	//* input handlers
	const handleSetTitle = e => {
		setAnime({ ...anime, title: e.target.value });
	};
	const handleSetSynopsis = e => {
		setAnime({ ...anime, synopsis: e.target.value });
	};
	const handleSetType = e => {
		setAnime({ ...anime, type: e.value });
	};
	const handleSetLink = e => {
		setAnime({ ...anime, link: e.target.value });
	};
	const handleSetImageURL = e => {
		setAnime({ ...anime, imageURL: e.target.value });
	};
	const handleSetRating = e => {
		setAnime({ ...anime, rating: e.value });
	};
	const handleSetStatus = e => {
		setAnime({ ...anime, status: e.value });
	};
	const handleSetEpisodesMin = e => {
		setAnime({ ...anime, episodesMin: e.target.value });
	};
	const handleSetEpisodesMax = e => {
		setAnime({ ...anime, episodesMax: e.target.value });
	};
	const handleSetFavourites = e => {
		setAnime({ ...anime, favourites: e.target.checked });
	};

	const onSubmit = async e => {
		e.preventDefault();
		try {
			await AnimeDataService.addAnime(anime);
			console.log('anime added to database');
			props.handleClose();
			console.log(anime);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={e => onSubmit(e)}>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Anime Title'
					maxLength='100'
					// value={anime.name}
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
					rows='3'
					onChange={e => handleSetSynopsis(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Select Type', value: 0 }}
					options={animeType}
					className='text-dark'
					onChange={e => handleSetType(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link'
					maxLength='200'
					onChange={e => handleSetLink(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Image URL'
					maxLength='200'
					onChange={e => handleSetImageURL(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Rating', value: 0 }}
					options={ratingOptions}
					className='text-dark'
					onChange={e => handleSetRating(e)}
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
					onChange={e => handleSetStatus(e)}
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
						onChange={e => handleSetEpisodesMin(e)}
					/>
					<span className='mx-2'>/</span>
					<input
						style={{ width: '50px' }}
						type='number'
						className='form-control '
						placeholder='24'
						onChange={e => handleSetEpisodesMax(e)}
					/>
				</div>
			</div>
			<div className='mb-3 form-check'>
				<input
					type='checkbox'
					className='form-check-input'
					onChange={e => handleSetFavourites(e)}
				/>
				<label className='form-check-label'>Add to Favourites?</label>
			</div>
			<button
				className='btn btn-success'
				// onClick={e => {
				// 	// e.preventDefault();
				// 	props.handleClose();
				// 	console.log(anime);
				// }}
			>
				Add
			</button>
		</form>
	);
};

export default Form;
