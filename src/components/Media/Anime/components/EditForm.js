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
	// getSingleAnimeDatabase,
	getAnimeDatabase,
	user,
}) => {
	const filteredAnime = singleAnime?.anime?.filter(anime => anime.id === id);

	const {
		title,
		imageURL,
		mal_id,
		// synopsis,
		type,
		link1,
		link1Name,
		link2,
		link2Name,
		episodesMin,
		episodesMax,
		status,
		rating,
		favourites,
	} = filteredAnime[0];

	//* initialize anime object
	const [anime, setAnime] = useState({
		id: id,
		mal_id: mal_id,
		title: title,
		// synopsis: synopsis,
		type: type,
		link1: link1,
		link1Name: link1Name,
		link2: link2,
		link2Name: link2Name,
		imageURL: imageURL,
		rating: rating,
		status: status,
		episodesMin: Number(episodesMin),
		episodesMax: Number(episodesMax),
		favourites: favourites,
		owner: user?.uid,
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
	// const handleSetSynopsis = e => {
	// 	setAnime({ ...anime, synopsis: e.target.value });
	// };
	const handleSetType = e => {
		setAnime({ ...anime, type: e.value });
	};
	const handleSetLink1 = e => {
		setAnime({ ...anime, link1: e.target.value });
	};
	const handleSetLink1Name = e => {
		setAnime({ ...anime, link1Name: e.target.value });
	};
	const handleSetLink2 = e => {
		setAnime({ ...anime, link2: e.target.value });
	};
	const handleSetLink2Name = e => {
		setAnime({ ...anime, link2Name: e.target.value });
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

		setFormErrors(validation(anime?.title));
		if (anime?.title?.length !== 0) {
			try {
				const newAnimeArray = singleAnime?.anime?.filter(
					anime => anime.id !== id
				);

				await newAnimeArray.push({
					...anime,
				});

				singleAnime.anime = newAnimeArray;

				await AnimeDataService.updateAnime(user?.uid, singleAnime);
				console.log('anime edited');
				
				await getAnimeDatabase(user?.uid);
				handleClose();
				animeUpdatedNotification();
				// console.log(anime);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<form onSubmit={e => onSubmit(e)}>
			<div className='mt-3 mb-0'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Anime Title'
					maxLength='500'
					defaultValue={title}
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mx-2'>{formErrors.title}</small>
			) : null}
			{/* <div className='mt-2 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
					maxLength='5000'
					rows='3'
					defaultValue={synopsis}
					onChange={e => handleSetSynopsis(e)}
				/>
			</div> */}
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
					placeholder='Enter Link 1 Name'
					maxLength='100'
					defaultValue={link1Name}
					onChange={e => handleSetLink1Name(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 1'
					maxLength='500'
					defaultValue={link1}
					onChange={e => handleSetLink1(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 2 Name'
					maxLength='100'
					defaultValue={link2Name}
					onChange={e => handleSetLink2Name(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 2'
					maxLength='500'
					defaultValue={link2}
					onChange={e => handleSetLink2(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Image URL'
					maxLength='500'
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
						defaultValue={status === 'Completed' ? episodesMax : episodesMin}
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
			{/* {formErrors ? (
				<small className='text-danger d-flex mb-1'>{formErrors.episodes}</small>
			) : null} */}
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
