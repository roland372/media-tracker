import React from 'react';

import Select from 'react-select';

const SingleAnimeCard = () => {
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
		<section className='border'>
			<h3>Jojo</h3>
			<h5>Synopsis</h5>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia iusto
				quisquam harum pariatur a, molestiae error corrupti laborum
				necessitatibus porro!
			</p>
			<h5>
				Type <span>TV-Series</span>
			</h5>
			<a
				href='https://reactrouter.com/docs/en/v6/getting-started/overview'
				target='_blank'
				rel='noreferrer'
			>
				Link
			</a>
			<div>
				<img
					className='img img-fluid'
					width='200px'
					src='https://cdn.myanimelist.net/images/manga/3/179882l.jpg'
					alt='Jojo'
				/>
			</div>
			<Select
				defaultValue={{ label: 'Rating', value: 0 }}
				options={ratingOptions}
				className='text-dark'
			/>
			<Select
				defaultValue={{ label: 'Plan to Watch', value: 'plan-to-watch' }}
				options={statusOptions}
				className='text-dark'
			/>
			<div>Episodes: 23/24</div>
		</section>
	);
};

export default SingleAnimeCard;
