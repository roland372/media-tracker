import React, { useState } from 'react';

//? <----- Firebase ----->
import EmotesDataService from '../services/emotes.services';

//? <----- Components ----->
import { toast } from 'react-toastify';
import validation from './FormValidation';
import Button from '../../Layout/Button';

//? <----- Other ----->
import { v4 as uuidv4 } from 'uuid';

const Form = ({ emotesDatabase, handleClose, user }) => {
	//* Initialize emote object
	const [emote, setEmote] = useState({
		id: uuidv4(),
		name: '',
		url: '',
		favourites: false,
		lastModified: Date.now(),
	});

	//* form errors state
	const [formErrors, setFormErrors] = useState({});

	//* notifications
	const emoteAddedNotfication = () =>
		toast.success('Emote Added', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	//* input handlers
	const handleSetName = e => {
		setEmote({ ...emote, name: e.target.value });
	};

	const handleSetURL = e => {
		setEmote({ ...emote, url: e.target.value });
	};

	const handleSetFavourites = e => {
		setEmote({ ...emote, favourites: e.target.checked });
	};

	const onSubmit = async e => {
		e.preventDefault();

		setFormErrors(validation(emote?.name, emote?.url));

		if (emote?.name?.length !== 0 && emote?.url?.length !== 0) {
			try {
				emotesDatabase?.[0]?.emotes.push({ ...emote });

				await EmotesDataService.updateEmote(user?.uid, emotesDatabase[0]);
				console.log('emote added to database');

				emoteAddedNotfication();
				handleClose();
				// getEmotesDatabase(user?.uid);
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<form onSubmit={e => onSubmit(e)}>
			<div>
				<input
					type='text'
					className='form-control mb-2'
					placeholder='Name'
					onChange={e => handleSetName(e)}
				/>
				{formErrors.name ? (
					<small className='text-danger d-flex mb-1'>{formErrors.name}</small>
				) : null}
				<input
					type='text'
					className='form-control mb-2'
					placeholder='URL'
					onChange={e => handleSetURL(e)}
				/>
				{formErrors.url ? (
					<small className='text-danger d-flex mb-2'>{formErrors.url}</small>
				) : null}
				<div className='mb-3 form-check'>
					<input
						type='checkbox'
						className='form-check-input'
						onChange={e => handleSetFavourites(e)}
					/>
					<label className='form-check-label'>Add to Favourites?</label>
				</div>
				<Button color='success' text='Add Emote' />
			</div>
		</form>
	);
};

export default Form;
