import React from 'react';

//? <----- Components ----->
import { motion } from 'framer-motion';

//? <----- Icons ----->
import { IoGrid } from 'react-icons/io5';
import { FaThList } from 'react-icons/fa';

const DisplayFilterSearchPanel = ({
	filterType,
	mediaDisplay,
	setMediaDisplay,
	setSearchTerm,
	searchPlaceholder,
	status,
}) => {
	// console.log(status?.[0]);

	const statusColors = {
		'All Anime': 'bg-secondary',
		'All Games': 'bg-secondary',
		'All Manga': 'bg-secondary',
		'All Characters': 'bg-secondary',
		Watching: 'bg-success',
		Playing: 'bg-success',
		Reading: 'bg-success',
		Anime: 'bg-success',
		Completed: 'bg-primary',
		Game: 'bg-primary',
		'On-Hold': 'bg-warning',
		Manga: 'bg-warning',
		Dropped: 'bg-danger',
		'Plan to Watch': 'bg-light',
		'Plan to Play': 'bg-light',
		'Plan to Read': 'bg-light',
	};

	// console.log(statusColors[status?.[0]]);

	return (
		<div className='d-xl-flex align-items-center justify-content-between mx-2 mb-2 bg-primary-dark rounded p-2'>
			<motion.button
				className='btn btn-light mx-2 mt-xl-0 mt-2 shadow-none'
				onClick={() => setMediaDisplay(!mediaDisplay)}
				whileHover={{ scale: 1.1 }}
			>
				{mediaDisplay ? <FaThList size={20} /> : <IoGrid size={20} />}
			</motion.button>
			<section className='ps-2'>
				{status.map((category, index) => {
					return (
						<motion.button
							type='button'
							className={`btn btn-sm m-1 shadow-none ${statusColors[category]}`}
							key={index + category}
							onClick={() => filterType(category)}
							whileHover={{ scale: 1.1 }}
						>
							{/* {console.log(category)} */}
							<h5 className='text- dark my-1'>{category}</h5>
						</motion.button>
					);
				})}
			</section>
			<section className='mx-2 mb-xl-0 mb-2'>
				<input
					type='text'
					className='form-control'
					placeholder={searchPlaceholder}
					onChange={event => {
						setSearchTerm(event.target.value);
						// console.log(event.target.value);
					}}
				/>
			</section>
		</div>
	);
};

export default DisplayFilterSearchPanel;
