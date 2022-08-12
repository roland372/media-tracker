import React from 'react';

//? <----- Styles ----->
import '../styles/Styles.css';

const Pagination = ({ setCurrentPage, topMedia, mediaPerPage }) => {
	//* Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	const pageNumbers = [];

	for (
		let i = 1;
		i <= Math.ceil(topMedia?.data?.slice(0, -1).length / mediaPerPage);
		i++
	) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className='pagination mx-2'>
				{pageNumbers.map(number => (
					<li key={number} className='page-item paginationButtons'>
						<p
							onClick={() => {
								paginate(number);
							}}
							className='page-link'
						>
							{number}
						</p>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
