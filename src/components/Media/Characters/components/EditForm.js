import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import { genderOptions, sourceOptions } from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';
import Button from '../../../Layout/Button';

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

	const {
		favourites,
		gender,
		hairColor,
		imageURL,
		link1,
		link1Name,
		link2,
		link2Name,
		mal_id,
		name,
		series,
		source,
	} = filteredCharacter[0];

	//* initialize character object
	const [character, setCharacter] = useState({
		favourites: favourites,
		gender: gender,
		hairColor: hairColor,
		id: id,
		imageURL: imageURL,
		lastModified: Date.now(),
		link1: link1,
		link1Name: link1Name,
		link2: link2,
		link2Name: link2Name,
		mal_id: mal_id,
		name: name,
		owner: user.uid,
		series: series,
		source: source,
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
	const handleSetName = e => {
		setCharacter({ ...character, name: e.target.value });
	};
	const handleSetSource = e => {
		setCharacter({ ...character, source: e.value });
	};
	const handleSetGender = e => {
		setCharacter({ ...character, gender: e.value });
	};
	const handleSetSeries = e => {
		setCharacter({ ...character, series: e.target.value });
	};
	const handleSetHairColor = e => {
		setCharacter({ ...character, hairColor: e.target.value });
	};
	const handleSetLink1 = e => {
		setCharacter({ ...character, link1: e.target.value });
	};
	const handleSetLink1Name = e => {
		setCharacter({ ...character, link1Name: e.target.value });
	};
	const handleSetLink2 = e => {
		setCharacter({ ...character, link2: e.target.value });
	};
	const handleSetImageURL = e => {
		setCharacter({ ...character, imageURL: e.target.value });
	};
	const handleSetFavourites = e => {
		setCharacter({ ...character, favourites: e.target.checked });
	};

	const onSubmit = async e => {
		e.preventDefault();

		setFormErrors(validation(character?.name));
		if (character?.name?.length !== 0) {
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
					defaultValue={name}
					onChange={e => handleSetName(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mx-2'>{formErrors.name}</small>
			) : null}
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: source, value: source }}
					options={sourceOptions}
					className='text-dark'
					onChange={e => handleSetSource(e)}
					isSearchable={false}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: gender, value: gender }}
					options={genderOptions}
					className='text-dark'
					onChange={e => handleSetGender(e)}
					isSearchable={false}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Series Name'
					maxLength='100'
					defaultValue={series}
					onChange={e => handleSetSeries(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Hair Color'
					maxLength='100'
					defaultValue={hairColor}
					onChange={e => handleSetHairColor(e)}
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
					placeholder='Wiki URL'
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

			<div className='mb-3 form-check'>
				<input
					type='checkbox'
					className='form-check-input'
					defaultChecked={favourites}
					onChange={e => handleSetFavourites(e)}
				/>
				<label className='form-check-label'>Add to Favourites?</label>
			</div>
			<Button color='warning' text='Update' />
		</form>
	);
};

export default EditForm;
