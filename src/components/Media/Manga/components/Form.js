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
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../Layout/Button';

//? <----- Firebase ----->
import MangaDataService from '../services/manga.services';

const Form = ({ mangaDatabase, handleClose, user, getMangaDatabase }) => {
	//* initialize manga object
	const [manga, setManga] = useState({
		id: uuidv4(),
		mal_id: '',
		chaptersMax: 0,
		chaptersMin: 0,
		favourites: false,
		imageURL: '',
		lastModified: Date.now(),
		link1: '',
		link1Name: 'Link',
		link2: '',
		link2Name: 'Link',
		owner: user.uid,
		rating: 0,
		status: 'Plan to Read',
		// synopsis: '',
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
	// const handleSetSynopsis = e => {
	// 	setManga({ ...manga, synopsis: e.target.value });
	// };
	const handleSetType = e => {
		setManga({ ...manga, type: e.value });
	};
	const handleSetLink1 = e => {
		setManga({ ...manga, link1: e.target.value });
	};
	const handleSetLink1Name = e => {
		setManga({ ...manga, link1Name: e.target.value });
	};
	const handleSetLink2 = e => {
		setManga({ ...manga, link2: e.target.value });
	};
	const handleSetLink2Name = e => {
		setManga({ ...manga, link2Name: e.target.value });
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

		setFormErrors(validation(manga.title));
		if (manga?.title?.length !== 0) {
			try {
				mangaDatabase?.[0]?.manga.push({
					...manga,
				});

				await MangaDataService.updateManga(user?.uid, mangaDatabase[0]);
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
			<div className='mt-3 mb-0'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Manga Title'
					maxLength='500'
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex ms-1'>{formErrors.title}</small>
			) : null}
			{/* <div className='mt-2 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
					maxLength='5000'
					rows='3'
					onChange={e => handleSetSynopsis(e)}
				/>
			</div> */}
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Select Type', value: '' }}
					options={mangaType}
					className='text-dark'
					onChange={e => handleSetType(e)}
					isSearchable={false}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 1 Name'
					maxLength='100'
					onChange={e => handleSetLink1Name(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 1'
					maxLength='500'
					onChange={e => handleSetLink1(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 2 Name'
					maxLength='100'
					onChange={e => handleSetLink2Name(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 2'
					maxLength='500'
					onChange={e => handleSetLink2(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Image URL'
					maxLength='500'
					onChange={e => handleSetImageURL(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Select Rating', value: '' }}
					options={ratingOptions}
					className='text-dark'
					onChange={e => handleSetRating(e)}
					isSearchable={false}
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
					isSearchable={false}
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
			{/* {formErrors ? (
				<small className='text-danger d-flex mb-1'>{formErrors.chapters}</small>
			) : null} */}
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
			{/* {formErrors ? (
				<small className='text-danger d-flex mb-1'>{formErrors.volumes}</small>
			) : null} */}
			<div className='mb-3 form-check'>
				<input
					type='checkbox'
					className='form-check-input'
					onChange={e => handleSetFavourites(e)}
				/>
				<label className='form-check-label'>Add to Favourites?</label>
			</div>
			<Button color='success' text='Add' />
		</form>
	);
};

export default Form;
