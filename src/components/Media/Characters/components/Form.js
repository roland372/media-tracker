import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import { sourceOptions } from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

//? <----- Firebase ----->
import CharactersDataService from '../services/characters.services';

const Form = ({
	charactersDatabase,
	handleClose,
	user,
	getCharactersDatabase,
}) => {
	//* initialize character object
	const [character, setCharacter] = useState({
		favourites: false,
		id: uuidv4(),
		imageURL: '',
		lastModified: Date.now(),
		link1: '',
		link1Name: 'Link',
		link2: '',
		link2Name: 'Link',
		owner: user.uid,
		source: '',
		title: '',
	});

	const characterAddedNotification = () =>
		toast.success('Character Added', {
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
		setCharacter({ ...character, title: e.target.value });
	};
	const handleSetSource = e => {
		setCharacter({ ...character, source: e.value });
	};
	const handleSetLink1 = e => {
		setCharacter({ ...character, link1: e.target.value });
	};
	const handleSetLink1Name = e => {
		setCharacter({ ...character, link1Name: e.target.value });
	};
	const handleSetImageURL = e => {
		setCharacter({ ...character, imageURL: e.target.value });
	};
	const handleSetFavourites = e => {
		setCharacter({ ...character, favourites: e.target.checked });
	};

	const onSubmit = async e => {
		e.preventDefault();

		setFormErrors(validation(character.title));
		if (character?.title?.length !== 0) {
			try {
				charactersDatabase?.[0]?.characters.push({
					...character,
				});

				await CharactersDataService.updateCharacter(
					user?.uid,
					charactersDatabase[0]
				);
				console.log('character added to database');

				characterAddedNotification();
				handleClose();
				// console.log(character);
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
					placeholder='Enter Character Name'
					maxLength='500'
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex ms-1'>{formErrors.title}</small>
			) : null}
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Select Type', value: '' }}
					options={sourceOptions}
					className='text-dark'
					onChange={e => handleSetSource(e)}
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
					placeholder='Enter Image URL'
					maxLength='500'
					onChange={e => handleSetImageURL(e)}
				/>
			</div>
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