import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import { gameType, ratingOptions, statusOptions } from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../Layout/Button';

//? <----- Firebase ----->
import GamesDataService from '../services/games.services';

const Form = ({ gamesDatabase, handleClose, user, getGamesDatabase }) => {
	//* initialize game object
	const [game, setGame] = useState({
		favourites: false,
		id: uuidv4(),
		imageURL: '',
		lastModified: Date.now(),
		link1: '',
		link1Name: 'Link',
		link2: '',
		link2Name: 'Link',
		owner: user.uid,
		playtime: 0,
		rating: 0,
		status: 'Plan to Play',
		// synopsis: '',
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
	// const handleSetSynopsis = e => {
	// 	setGame({ ...game, synopsis: e.target.value });
	// };
	const handleSetType = e => {
		setGame({ ...game, type: e.value });
	};
	const handleSetLink1 = e => {
		setGame({ ...game, link1: e.target.value });
	};
	const handleSetLink1Name = e => {
		setGame({ ...game, link1Name: e.target.value });
	};
	const handleSetLink2 = e => {
		setGame({ ...game, link2: e.target.value });
	};
	const handleSetLink2Name = e => {
		setGame({ ...game, link2Name: e.target.value });
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
		if (game?.title?.length !== 0) {
			try {
				gamesDatabase?.[0]?.games.push({
					...game,
				});

				await GamesDataService.updateGame(user?.uid, gamesDatabase[0]);
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
			<div className='mt-3 mb-0'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Game Title'
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
					options={gameType}
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
			<Button color='success' text='Add' />
		</form>
	);
};

export default Form;
