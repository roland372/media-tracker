import React, { useState } from 'react';

//? <----- Firebase ----->
import EmotesDataService from '../services/emotes.services';

//? <----- Components ----->
import { toast } from 'react-toastify';
import validation from './FormValidation';

const EditForm = ({
	handleClose,
	emotesDatabase,
	id,
	getEmotesDatabase,
	user,
}) => {
	const filteredEmote = emotesDatabase?.[0]?.emotes?.filter(
		emote => emote?.id === id
	);

	const { name, url, favourites } = filteredEmote[0];

	//* initialize emote object
	const [emote, setEmote] = useState({
		id: id,
		name: name,
		url: url,
		favourites: favourites,
		lastModified: Date.now(),
	});

	//* form errors state
	const [formErrors, setFormErrors] = useState({});

	//* notifications
	const emoteUpdatedNotfication = () =>
		toast.success('Emote Updated', {
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
				const newEmotesArray = emotesDatabase?.[0]?.emotes?.filter(
					emote => emote.id !== id
				);

				await newEmotesArray.push({
					...emote,
				});

				emotesDatabase[0].emotes = newEmotesArray;

				await EmotesDataService.updateEmote(user?.uid, emotesDatabase[0]);
				console.log('emote edited');

				await getEmotesDatabase(user?.uid);
				handleClose();
				emoteUpdatedNotfication();
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<form onSubmit={e => onSubmit(e)}>
			<img src={url} alt={name} width='56px' className='mb-2' />
			<div>
				<input
					type='text'
					className='form-control mb-2'
					placeholder='Name'
					defaultValue={name}
					onChange={e => handleSetName(e)}
				/>
				{formErrors.name ? (
					<small className='text-danger d-flex mb-1'>{formErrors.name}</small>
				) : null}
				<input
					type='text'
					className='form-control mb-2'
					placeholder='URL'
					defaultValue={url}
					onChange={e => handleSetURL(e)}
				/>
				{formErrors.url ? (
					<small className='text-danger d-flex mb-2'>{formErrors.url}</small>
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
				<button className='btn btn-warning shadow-none'>Edit Emote</button>
			</div>
		</form>
	);
};

export default EditForm;
