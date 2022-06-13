import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

const EditForm = ({ handleClose, singleAnime, id, getSingleAnimeDatabase }) => {
	const { user } = useUserAuth();

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

	//* select values
	const animeType = [
		{ value: 'TV-Show', label: 'TV-Show' },
		{ value: 'Movie', label: 'Movie' },
		{ value: 'OVA', label: 'OVA' },
	];

	const ratingOptions = [
		{ value: '1', label: '⭐1' },
		{ value: '2', label: '⭐2' },
		{ value: '3', label: '⭐3' },
		{ value: '4', label: '⭐4' },
		{ value: '5', label: '⭐5' },
		{ value: '6', label: '⭐6' },
		{ value: '7', label: '⭐7' },
		{ value: '8', label: '⭐8' },
		{ value: '9', label: '⭐9' },
		{ value: '10', label: '⭐10' },
	];

	const statusOptions = [
		{ value: 'Watching', label: 'Watching' },
		{ value: 'Completed', label: 'Completed' },
		{ value: 'On-Hold', label: 'On-Hold' },
		{ value: 'Dropped', label: 'Dropped' },
		{ value: 'Plan to Watch', label: 'Plan to Watch' },
	];

	//* initialize anime object
	const [anime, setAnime] = useState({
		title: title,
		synopsis: synopsis,
		type: type,
		link: link,
		imageURL: imageURL,
		rating: rating,
		status: status,
		episodesMin: episodesMin,
		episodesMax: episodesMax,
		favourites: favourites,
		owner: user.uid,
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
			// await AnimeDataService.addAnime(anime);
			await AnimeDataService.updateAnime(id, anime);
			getSingleAnimeDatabase(id);
			console.log('anime edited');
			handleClose();
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
					defaultValue={title}
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
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
						style={{ width: '50px' }}
						type='number'
						className='form-control '
						placeholder='1'
						defaultValue={episodesMin}
						onChange={e => handleSetEpisodesMin(e)}
					/>
					<span className='mx-2'>/</span>
					<input
						style={{ width: '50px' }}
						type='number'
						className='form-control '
						placeholder='24'
						defaultValue={episodesMax}
						onChange={e => handleSetEpisodesMax(e)}
					/>
				</div>
			</div>
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