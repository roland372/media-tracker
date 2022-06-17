import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import {
	animeType,
	ratingOptions,
	statusOptions,
} from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

const EditForm = ({
	handleClose,
	singleAnime,
	id,
	getSingleAnimeDatabase,
	getAnimeDatabase,
	user,
}) => {
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
		favourites,
	} = singleAnime;

	//* initialize anime object
	const [anime, setAnime] = useState({
		title: title,
		synopsis: synopsis,
		type: type,
		link: link,
		imageURL: imageURL,
		rating: rating,
		status: status,
		episodesMin: Number(episodesMin),
		episodesMax: Number(episodesMax),
		favourites: favourites,
		owner: user.uid,
		lastModified: Date.now(),
	});

	const animeUpdatedNotification = () =>
		toast.success('Anime Updated', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	//* form errors state
	const [formErrors, setFormErrors] = useState({});

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
		setAnime({ ...anime, episodesMin: e });
	};
	const handleSetEpisodesMax = e => {
		setAnime({ ...anime, episodesMax: e });
	};
	const handleSetFavourites = e => {
		setAnime({ ...anime, favourites: e.target.checked });
	};

	// console.log('min', parseInt(anime.episodesMin));
	// console.log('max', parseInt(anime.episodesMax));

	const onSubmit = async e => {
		e.preventDefault();

		setFormErrors(
			validation(anime.episodesMax, anime.episodesMin, anime.title)
		);
		if (anime.title.length !== 0 && anime.episodesMax >= anime.episodesMin) {
			try {
				await AnimeDataService.updateAnime(id, anime);
				await getSingleAnimeDatabase(id);
				console.log('anime edited');
				handleClose();
				animeUpdatedNotification();
				getAnimeDatabase(user?.uid);
				// console.log(anime);
			} catch (error) {
				console.log(error);
			}
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
					defaultValue={title}
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mx-2'>{formErrors.title}</small>
			) : null}
			<div className='mt-2 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
					maxLength='1000'
					rows='3'
					defaultValue={synopsis}
					onChange={e => handleSetSynopsis(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: type, value: type }}
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
					defaultValue={link}
					onChange={e => handleSetLink(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Image URL'
					maxLength='200'
					defaultValue={imageURL}
					onChange={e => handleSetImageURL(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: '⭐' + rating, value: rating }}
					options={ratingOptions}
					className='text-dark'
					onChange={e => handleSetRating(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					// defaultValue={{ label: type, value: type }}
					defaultValue={{
						label: status,
						value: status,
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
						style={{ width: '70px' }}
						className='form-control'
						maxLength='4'
						placeholder='1'
						defaultValue={episodesMin}
						onKeyPress={event => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						// onPaste={event => {
						// 	if (!/[0-9]/.test(event.key)) {
						// 		event.preventDefault();
						// 	}
						// }}
						onChange={e => handleSetEpisodesMin(e.target.value * 1)}
					/>
					<span className='mx-2'>/</span>
					<input
						style={{ width: '70px' }}
						className='form-control'
						maxLength='4'
						placeholder='24'
						defaultValue={episodesMax}
						onKeyPress={event => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						// onPaste={event => {
						// 	if (!/[0-9]/.test(event.key)) {
						// 		event.preventDefault();
						// 	}
						// }}
						onChange={e => handleSetEpisodesMax(e.target.value * 1)}
					/>
				</div>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mb-1'>{formErrors.episodes}</small>
			) : null}
			<div className='mb-3 form-check'>
				<input
					type='checkbox'
					className='form-check-input'
					defaultChecked={favourites}
					onChange={e => handleSetFavourites(e)}
				/>
				<label className='form-check-label'>Add to Favourites?</label>
			</div>
			<button className='btn btn-warning'>Update</button>
		</form>
	);
};

export default EditForm;
