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

const Form = ({ handleClose, user, getMangaDatabase }) => {
	//* initialize manga object
	const [manga, setManga] = useState({
		chaptersMax: 0,
		chaptersMin: 0,
		favourites: false,
		imageURL: '',
		lastModified: Date.now(),
		link: 'link',
		owner: user.uid,
		rating: 0,
		status: 'Plan to Read',
		synopsis: '',
		title: '',
		type: 'Manga',
		volumesMax: 0,
		volumesMin: 0,
	});

	const mangaAddedNotification = () =>
		toast.success('Manga Added', {
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
				await MangaDataService.addManga(manga);
				await getMangaDatabase(user.uid);
				console.log('manga added to database');
				mangaAddedNotification();
				handleClose();
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
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex ms-1'>{formErrors.title}</small>
			) : null}
			<div className='mt-2 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
					maxLength='1000'
					rows='3'
					onChange={e => handleSetSynopsis(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Select Type', value: '' }}
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
					defaultValue={{ label: 'Select Rating', value: '' }}
					options={ratingOptions}
					className='text-dark'
					onChange={e => handleSetRating(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{
						label: 'Select Status',
						value: '',
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
					onChange={e => handleSetFavourites(e)}
				/>
				<label className='form-check-label'>Add to Favourites?</label>
			</div>
			<button className='btn btn-success'>Add</button>
		</form>
	);
};

export default Form;
