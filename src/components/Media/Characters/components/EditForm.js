import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import { sourceOptions } from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';

//? <----- Firebase ----->
import CharactersDataService from '../services/characters.services';

const EditForm = ({
	handleClose,
	singleCharacter,
	id,
	// getSingleCharacterDatabase,
	getCharactersDatabase,
	user,
}) => {
	const filteredCharacter = singleCharacter?.characters?.filter(
		character => character.id === id
	);

	const { favourites, imageURL, link1, link1Name, mal_id, source, title } =
		filteredCharacter[0];

	//* initialize character object
	const [character, setCharacter] = useState({
		favourites: favourites,
		imageURL: imageURL,
		id: id,
		lastModified: Date.now(),
		link1: link1,
		link1Name: link1Name,
		mal_id: mal_id,
		owner: user.uid,
		source: source,
		title: title,
	});

	const characterUpdatedNotification = () =>
		toast.success('Character Updated', {
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

		setFormErrors(validation(character?.title));
		if (character?.title?.length !== 0) {
			try {
				const newCharactersArray = singleCharacter?.characters?.filter(
					character => character.id !== id
				);

				await newCharactersArray.push({
					...character,
				});

				singleCharacter.characters = newCharactersArray;

				await CharactersDataService.updateCharacter(user?.uid, singleCharacter);
				console.log('character edited');

				await getCharactersDatabase(user?.uid);
				handleClose();
				characterUpdatedNotification();
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
					defaultValue={title}
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mx-2'>{formErrors.title}</small>
			) : null}
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: source, value: source }}
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
					placeholder='Enter Image URL'
					maxLength='500'
					defaultValue={imageURL}
					onChange={e => handleSetImageURL(e)}
				/>
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
