import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import {
	mangaType,
	ratingOptions,
	statusOptions,
} from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';

//? <----- Firebase ----->
import MangaDataService from '../services/manga.services';

const EditForm = ({
	handleClose,
	singleManga,
	id,
	getSingleMangaDatabase,
	getMangaDatabase,
	user,
}) => {
	const {
		chaptersMax,
		chaptersMin,
		favourites,
		imageURL,
		link,
		rating,
		status,
		synopsis,
		title,
		type,
		volumesMax,
		volumesMin,
	} = singleManga;

	//* initialize manga object
	const [manga, setManga] = useState({
		chaptersMax: Number(chaptersMax),
		chaptersMin: Number(chaptersMin),
		favourites: favourites,
		imageURL: imageURL,
		lastModified: Date.now(),
		link: link,
		owner: user.uid,
		rating: rating,
		status: status,
		synopsis: synopsis,
		title: title,
		type: type,
		volumesMax: Number(volumesMax),
		volumesMin: Number(volumesMin),
	});

	const mangaUpdatedNotification = () =>
		toast.success('Manga Updated', {
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
		setManga({ ...manga, title: e.target.value });
	};
	const handleSetSynopsis = e => {
		setManga({ ...manga, synopsis: e.target.value });
	};
	const handleSetType = e => {
		setManga({ ...manga, type: e.value });
	};
	const handleSetLink = e => {
		setManga({ ...manga, link: e.target.value });
	};
	const handleSetImageURL = e => {
		setManga({ ...manga, imageURL: e.target.value });
	};
	const handleSetRating = e => {
		setManga({ ...manga, rating: e.value });
	};
	const handleSetStatus = e => {
		setManga({ ...manga, status: e.value });
	};
	const handleSetChaptersMin = e => {
		setManga({ ...manga, chaptersMin: e });
	};
	const handleSetChaptersMax = e => {
		setManga({ ...manga, chaptersMax: e });
	};
	const handleSetVolumesMin = e => {
		setManga({ ...manga, volumesMin: e });
	};
	const handleSetVolumesMax = e => {
		setManga({ ...manga, volumesMax: e });
	};
	const handleSetFavourites = e => {
		setManga({ ...manga, favourites: e.target.checked });
	};

	const onSubmit = async e => {
		e.preventDefault();

		setFormErrors(
			validation(
				manga.chaptersMax,
				manga.chaptersMin,
				manga.volumesMax,
				manga.volumesMin,
				manga.title
			)
		);
		if (
			manga.title.length !== 0 &&
			manga.chaptersMax >= manga.chaptersMin &&
			manga.volumesMax >= manga.volumesMin
		) {
			try {
				await MangaDataService.updateManga(id, manga);
				await getSingleMangaDatabase(id);
				console.log('manga edited');
				handleClose();
				mangaUpdatedNotification();
				getMangaDatabase(user?.uid);
				// console.log(manga);
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
					placeholder='Enter Manga Title'
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
					options={mangaType}
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
					<h5 className='pe-2'>Chapters</h5>
					<input
						style={{ width: '70px' }}
						className='form-control'
						maxLength='4'
						placeholder='1'
						defaultValue={status === 'Completed' ? chaptersMax : chaptersMin}
						onKeyPress={event => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						onChange={e => handleSetChaptersMin(e.target.value * 1)}
					/>
					<span className='mx-2'>/</span>
					<input
						style={{ width: '70px' }}
						className='form-control'
						maxLength='4'
						placeholder='24'
						defaultValue={chaptersMax}
						onKeyPress={event => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						onChange={e => handleSetChaptersMax(e.target.value * 1)}
					/>
				</div>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mb-1'>{formErrors.chapters}</small>
			) : null}
			<div className='mt-3 mb-2'>
				<div className='d-flex align-items-center'>
					<h5 className='pe-2'>Volumes</h5>
					<input
						style={{ width: '70px' }}
						className='form-control'
						maxLength='4'
						placeholder='1'
						defaultValue={status === 'Completed' ? volumesMax : volumesMin}
						onKeyPress={event => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						onChange={e => handleSetVolumesMin(e.target.value * 1)}
					/>
					<span className='mx-2'>/</span>
					<input
						style={{ width: '70px' }}
						className='form-control'
						maxLength='4'
						placeholder='24'
						defaultValue={volumesMax}
						onKeyPress={event => {
							if (!/[0-9]/.test(event.key)) {
								event.preventDefault();
							}
						}}
						onChange={e => handleSetVolumesMax(e.target.value * 1)}
					/>
				</div>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mb-1'>{formErrors.volumes}</small>
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
