import React from 'react';

//? <----- Components ----->
import Select from 'react-select';

const Form = props => {
	const animeType = [
		{ value: 'tv-show', label: 'TV-Show' },
		{ value: 'movie', label: 'Movie' },
		{ value: 'ova', label: 'OVA' },
	];

	const ratingOptions = [
		{ value: '1', label: '⭐1' },
		{ value: '2', label: '⭐2' },
		{ value: '3', label: '⭐3' },
	];

	const statusOptions = [
		{ value: 'watching', label: 'Watching' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'on-hold', label: 'On-Hold' },
		{ value: 'dropped', label: 'Dropped' },
		{ value: 'plan-to-watch', label: 'Plan to Watch' },
	];

	return (
		<form>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Anime Title'
					maxLength='100'
				/>
			</div>
			<div className='mt-3 mb-2'>
				<textarea
					type='text'
					className='form-control'
					placeholder='Enter Synopsis'
					rows='3'
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Select Type', value: 0 }}
					options={animeType}
					className='text-dark'
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Link'
					maxLength='200'
				/>
			</div>
			<div className='mt-3 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Enter Image URL'
					maxLength='200'
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{ label: 'Rating', value: 0 }}
					options={ratingOptions}
					className='text-dark'
				/>
			</div>
			<div className='mt-3 mb-2'>
				<Select
					defaultValue={{
						label: 'Plan to Watch',
						value: 'plan-to-watch',
					}}
					options={statusOptions}
					className='text-dark'
				/>
			</div>
			<div className='mt-3 mb-2'>
				<div className='d-flex align-items-center'>
					<h5 className='pe-2'>Episodes</h5>
					<input
						style={{ width: '50px' }}
						type='number'
						className='form-control '
						placeholder='1'
					/>
					<span className='mx-2'>/</span>
					<input
						style={{ width: '50px' }}
						type='number'
						className='form-control '
						placeholder='24'
					/>
				</div>
			</div>
			<div className='mb-3 form-check'>
				<input type='checkbox' className='form-check-input' />
				<label className='form-check-label'>Add to Favourites?</label>
			</div>
			<button
				className='btn btn-success'
				onClick={e => {
					e.preventDefault();
					props.handleClose();
					console.log('Added');
				}}
			>
				Add
			</button>
		</form>
	);
};

export default Form;
