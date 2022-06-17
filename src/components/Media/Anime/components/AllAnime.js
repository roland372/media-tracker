import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleAnimeCard from './SingleAnimeCard';
import SingleAnimeTableRow from './SingleAnimeTableRow';
import DisplayMoreButton from '../../components/DisplayMoreButton';

//? <----- Functions ----->
import { sortNumber, sortString } from '../../utils/sortFunctions';
import DisplayFilterSearchPanel from '../../components/DisplayFilterSearchPanel';
import AnimeTable from './AnimeTable';

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
	const [animeDisplay, setAnimeDisplay] = useState(true);

	//* menu items state
	const [menuItems, setMenuItems] = useState(sortedAnime);

	//* menu items state
	const [displayMore, setDisplayMore] = useState(false);

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
				//* display as grid
				<>
					<section className='d-flex align-items-center justify-content-start flex-wrap'>
						{menuItems
							//? display first 20 elements
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
							.slice(0, 20)
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

						{displayMore
							? //? display the rest
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
									.slice(20)
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
									))
							: null}
					</section>
					<DisplayMoreButton
						displayMore={displayMore}
						menuItems={menuItems}
						setDisplayMore={setDisplayMore}
					/>
				</>
			) : (
				//* display as table
				<>
					<AnimeTable
						menuItems={menuItems}
						order={order}
						setMenuItems={setMenuItems}
						setOrder={setOrder}
						sortNumber={sortNumber}
						sortString={sortString}
					>
						{menuItems
							//? display first 20 elements
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
							.slice(0, 20)
							.map((anime, index) => (
								<SingleAnimeTableRow
									episodesMax={anime.episodesMax}
									episodesMin={anime.episodesMin}
									id={anime.id}
									image={anime.imageURL}
									index={index + 1}
									key={anime.id}
									lastModified={anime.lastModified}
									rating={anime.rating}
									status={anime.status}
									title={anime.title}
									type={anime.type}
								/>
							))}

						{displayMore
							? //? display the rest
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
									.slice(20)
									.map((anime, index) => (
										<SingleAnimeTableRow
											episodesMax={anime.episodesMax}
											episodesMin={anime.episodesMin}
											id={anime.id}
											image={anime.imageURL}
											index={21 + index}
											key={anime.id}
											lastModified={anime.lastModified}
											rating={anime.rating}
											status={anime.status}
											title={anime.title}
											type={anime.type}
										/>
									))
							: null}
					</AnimeTable>
					<DisplayMoreButton
						displayMore={displayMore}
						menuItems={menuItems}
						setDisplayMore={setDisplayMore}
					/>
				</>
			)}
		</CardComponent>
	);
};

export default AllAnime;
