import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import { gameType, ratingOptions, statusOptions } from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';

//? <----- Firebase ----->
import GamesDataService from '../services/games.services';

const Form = ({ handleClose, user, getGamesDatabase }) => {
	//* initialize game object
	const [game, setGame] = useState({
		favourites: false,
		imageURL: '',
		lastModified: Date.now(),
		link: 'link',
		owner: user.uid,
		playtime: 0,
		rating: 0,
		status: 'Plan to Play',
		synopsis: '',
		title: '',
		type: 'Game',
	});

	const gameAddedNotification = () =>
		toast.success('Game Added', {
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
		setGame({ ...game, title: e.target.value });
	};
	const handleSetSynopsis = e => {
		setGame({ ...game, synopsis: e.target.value });
	};
	const handleSetType = e => {
		setGame({ ...game, type: e.value });
	};
	const handleSetLink = e => {
		setGame({ ...game, link: e.target.value });
	};
	const handleSetImageURL = e => {
		setGame({ ...game, imageURL: e.target.value });
	};
	const handleSetRating = e => {
		setGame({ ...game, rating: e.value });
	};
	const handleSetStatus = e => {
		setGame({ ...game, status: e.value });
	};
	const handleSetPlaytime = e => {
		setGame({ ...game, playtime: e });
	};
	const handleSetFavourites = e => {
		setGame({ ...game, favourites: e.target.checked });
	};

	const onSubmit = async e => {
		e.preventDefault();

		setFormErrors(validation(game.title));
		if (game.title.length !== 0) {
			try {
				await GamesDataService.addGame(game);
				await getGamesDatabase(user.uid);
				console.log('game added to database');
				gameAddedNotification();
				handleClose();
				// console.log(game);
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
					placeholder='Enter Game Title'
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
					options={gameType}
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
					<h5 className='pe-2'>Playtime (Hours)</h5>
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
						onChange={e => handleSetPlaytime(e.target.value * 1)}
					/>
				</div>
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
