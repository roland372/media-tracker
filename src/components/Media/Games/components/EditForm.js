import React, { useState } from 'react';

//? <----- Components ----->
import Select from 'react-select';
import { gameType, ratingOptions, statusOptions } from '../utils/selectOptions';
import validation from './FormValidation';
import { toast } from 'react-toastify';
import Button from '../../../Layout/Button';

//? <----- Firebase ----->
import GamesDataService from '../services/games.services';

const EditForm = ({
	handleClose,
	singleGame,
	id,
	// getSingleGameDatabase,
	getGamesDatabase,
	user,
}) => {
	const filteredGame = singleGame?.games?.filter(game => game.id === id);

	const {
		favourites,
		imageURL,
		link1,
		link1Name,
		link2,
		link2Name,
		playtime,
		rating,
		status,
		// synopsis,
		title,
		type,
	} = filteredGame[0];

	//* initialize game object
	const [game, setGame] = useState({
		favourites: favourites,
		imageURL: imageURL,
		id: id,
		lastModified: Date.now(),
		link1: link1,
		link1Name: link1Name,
		link2: link2,
		link2Name: link2Name,
		owner: user.uid,
		playtime: playtime,
		rating: rating,
		status: status,
		// synopsis: synopsis,
		title: title,
		type: type,
	});

	const gameUpdatedNotification = () =>
		toast.success('Game Updated', {
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

		setFormErrors(validation(game?.title));
		if (game?.title?.length !== 0) {
			try {
				const newGamesArray = singleGame?.games?.filter(game => game.id !== id);

				await newGamesArray.push({
					...game,
				});

				singleGame.games = newGamesArray;

				await GamesDataService.updateGame(user?.uid, singleGame);
				console.log('game edited');

				await getGamesDatabase(user?.uid);
				handleClose();
				gameUpdatedNotification();
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
					defaultValue={title}
					onChange={e => handleSetTitle(e)}
				/>
			</div>
			{formErrors ? (
				<small className='text-danger d-flex mx-2'>{formErrors.title}</small>
			) : null}
			{/* <div className='mt-2 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
					maxLength='5000'
					rows='3'
					defaultValue={synopsis}
					onChange={e => handleSetSynopsis(e)}
				/>
			</div> */}
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: type, value: type }}
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
					placeholder='Enter Link 2 Name'
					maxLength='100'
					defaultValue={link2Name}
					onChange={e => handleSetLink2Name(e)}
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link 2'
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
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: '⭐' + rating, value: rating }}
					options={ratingOptions}
					className='text-dark'
					onChange={e => handleSetRating(e)}
					isSearchable={false}
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
						defaultValue={playtime}
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
