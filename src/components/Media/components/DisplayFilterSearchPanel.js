import React from 'react';

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
	return (
		<div className='d-xl-flex align-items-center justify-content-between mx-2 mb-2 bg-primary-dark rounded p-2'>
			<button
				className='btn btn-light mx-2 mt-xl-0 mt-2'
				onClick={() => setMediaDisplay(!mediaDisplay)}
			>
				{mediaDisplay ? <FaThList size={20} /> : <IoGrid size={20} />}
			</button>
			<section className='ps-2'>
				{status.map((category, index) => {
					return (
						<button
							type='button'
							className='btn btn-sm m-1 p-1'
							key={index + category}
							onClick={() => filterType(category)}
						>
							<h5 className='text-color my-1'>{category}</h5>
						</button>
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
