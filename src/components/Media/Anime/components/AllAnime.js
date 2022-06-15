import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleAnimeCard from './SingleAnimeCard';
import SingleAnimeTable from './SingleAnimeTable';

//? <----- Icons ----->
import { IoGrid } from 'react-icons/io5';
import { FaThList, FaSort } from 'react-icons/fa';

const AllAnime = ({ allAnime, deleteAnime, user }) => {
	//* sort anime by name
	const sortedAnime = allAnime.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});
	// console.log(allAnime);

	//* display as list or grid state
	const [animeDisplay, setAnimeDisplay] = useState(false);

	//* menu items state
	const [menuItems, setMenuItems] = useState(sortedAnime);

	useEffect(() => {
		setMenuItems(sortedAnime);
	}, [sortedAnime]);

	// const animeType = [...new Set(allAnime.map(animeType => animeType.type))];

	const animeStatus = [
		'All Anime',
		'Watching',
		'Completed',
		'On-Hold',
		'Dropped',
		'Plan to Watch',
	];

	//* type filtering state
	const [status, setStatus] = useState(animeStatus);

	//* search state
	const [searchTerm, setSearchTerm] = useState('');

	//* sorting state
	const [order, setOrder] = useState('DSC');

	const sorting = column => {
		if (order === 'ASC') {
			const sorted = [...menuItems].sort((a, b) =>
				a[column] > b[column] ? 1 : -1
			);
			setMenuItems(sorted);
			setOrder('DSC');
		}
		if (order === 'DSC') {
			const sorted = [...menuItems].sort((a, b) =>
				a[column] < b[column] ? 1 : -1
			);
			setMenuItems(sorted);
			setOrder('ASC');
		}
	};

	const filterType = animeStatus => {
		if (animeStatus === 'All Anime') {
			setMenuItems(sortedAnime);
			setStatus(status);
			return;
		}
		const newData = sortedAnime.filter(type => type.status === animeStatus);
		// console.log(newData);
		setMenuItems(newData);
	};

	return (
		<CardComponent title='All Anime'>
			<div className='d-lg-flex align-items-center justify-content-between mx-2'>
				<button
					className='btn btn-warning'
					onClick={() => setAnimeDisplay(!animeDisplay)}
				>
					{animeDisplay ? <IoGrid size={20} /> : <FaThList size={20} />}
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
				<section>
					<input
						type='text'
						className='form-control'
						placeholder='Search for anime'
						onChange={event => {
							setSearchTerm(event.target.value);
							// console.log(event.target.value);
						}}
					/>
				</section>
			</div>
			{animeDisplay ? (
				<div className='table-responsive mx-2 rounded'>
					<table
						id='table-striped'
						className='table table-sm bg-secondary-medium text-color table-striped align-middle table-borderless'
						style={{ minWidth: '700px' }}
					>
						<thead className='bg-primary-dark text-center'>
							<tr>
								<th className='px-2' scope='col'>
									#
								</th>
								<th scope='col'>Image</th>
								<th scope='col'>
									Anime Title
									<FaSort onClick={() => sorting('title')} />
								</th>
								<th scope='col'>
									Score
									<FaSort onClick={() => sorting('rating')} />
								</th>
								<th scope='col'>
									Type
									<FaSort onClick={() => sorting('type')} />
								</th>
								<th scope='col'>
									Progress
									<FaSort onClick={() => sorting('episodesMin')} />
								</th>
								<th scope='col'>
									Last Modified
									<FaSort onClick={() => sorting('lastModified')} />
								</th>
							</tr>
						</thead>
						<tbody>
							{menuItems
								.filter(value => {
									if (searchTerm === '') {
										return value;
									} else if (
										value.title
											.toLowerCase()
											.includes(searchTerm.toLocaleLowerCase())
									) {
										return value;
									}
									return 0;
								})
								.map((anime, index) => (
									<SingleAnimeTable
										key={index}
										id={anime.id}
										image={anime.imageURL}
										index={index + 1}
										title={anime.title}
										rating={anime.rating}
										type={anime.type}
										episodesMin={anime.episodesMin}
										episodesMax={anime.episodesMax}
										lastModified={anime.lastModified}
										status={anime.status}
									/>
								))}
						</tbody>
					</table>
				</div>
			) : (
				<section className='d-flex align-items-center justify-content-start flex-wrap'>
					{user &&
						menuItems
							.filter(value => {
								if (searchTerm === '') {
									return value;
								} else if (
									value.title
										.toLowerCase()
										.includes(searchTerm.toLocaleLowerCase())
								) {
									return value;
								}
								return 0;
							})
							.map(anime => (
								<SingleAnimeCard
									deleteAnime={deleteAnime}
									id={anime.id}
									imageURL={anime.imageURL}
									key={anime.id}
									title={anime.title}
								/>
							))}
				</section>
			)}
		</CardComponent>
	);
};

export default AllAnime;
