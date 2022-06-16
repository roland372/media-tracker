import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleAnimeCard from './SingleAnimeCard';
import SingleAnimeTableRow from './SingleAnimeTableRow';

//? <----- Functions ----->
import { sortNumber, sortString } from '../../utils/sortFunctions';
import DisplayFilterSearchPanel from '../../components/DisplayFilterSearchPanel';
import MediaTable from '../../components/MediaTable';

const AllAnime = ({ allAnime, deleteAnime, getAnimeDatabase, user }) => {
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
			<DisplayFilterSearchPanel
				filterType={filterType}
				mediaDisplay={animeDisplay}
				setMediaDisplay={setAnimeDisplay}
				setSearchTerm={setSearchTerm}
				searchPlaceholder='Search for Anime'
				status={status}
			/>
			{animeDisplay ? (
				<MediaTable
					menuItems={menuItems}
					order={order}
					setMenuItems={setMenuItems}
					setOrder={setOrder}
					sortNumber={sortNumber}
					sortString={sortString}
				>
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
							<SingleAnimeTableRow
								episodesMax={anime.episodesMax}
								episodesMin={anime.episodesMin}
								id={anime.id}
								image={anime.imageURL}
								index={index + 1}
								key={index}
								lastModified={anime.lastModified}
								rating={anime.rating}
								status={anime.status}
								title={anime.title}
								type={anime.type}
							/>
						))}
				</MediaTable>
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
									getAnimeDatabase={getAnimeDatabase}
									id={anime.id}
									imageURL={anime.imageURL}
									key={anime.id}
									title={anime.title}
									user={user}
								/>
							))}
				</section>
			)}
		</CardComponent>
	);
};

export default AllAnime;
