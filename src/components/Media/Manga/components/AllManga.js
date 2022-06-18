import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleMangaCard from './SingleMangaCard';
import SingleMangaTableRow from './SingleMangaTableRow';
import DisplayMoreButton from '../../components/DisplayMoreButton';

//? <----- Functions ----->
import { sortNumber, sortString } from '../../utils/sortFunctions';
import DisplayFilterSearchPanel from '../../components/DisplayFilterSearchPanel';
import MangaTable from './MangaTable';

const AllManga = ({ allManga, deleteManga, getMangaDatabase, user }) => {
	//* sort manga by name
	const sortedManga = allManga.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	//* display as list or grid state
	const [mangaDisplay, setMangaDisplay] = useState(true);

	//* menu items state
	const [menuItems, setMenuItems] = useState(sortedManga);

	//* menu items state
	const [displayMore, setDisplayMore] = useState(false);

	useEffect(() => {
		setMenuItems(sortedManga);
	}, [sortedManga]);

	const mangaStatus = [
		'All Manga',
		'Reading',
		'Completed',
		'On-Hold',
		'Dropped',
		'Plan to Read',
	];

	//* type filtering state
	const [status, setStatus] = useState(mangaStatus);

	//* search state
	const [searchTerm, setSearchTerm] = useState('');

	//* sorting state
	const [order, setOrder] = useState('DSC');

	const filterType = mangaStatus => {
		if (mangaStatus === 'All Manga') {
			setMenuItems(sortedManga);
			setStatus(status);
			return;
		}
		const newData = sortedManga.filter(type => type.status === mangaStatus);
		// console.log(newData);
		setMenuItems(newData);
	};

	return (
		<CardComponent title='All Manga'>
			<DisplayFilterSearchPanel
				filterType={filterType}
				mediaDisplay={mangaDisplay}
				setMediaDisplay={setMangaDisplay}
				setSearchTerm={setSearchTerm}
				searchPlaceholder='Search for Manga'
				status={status}
			/>
			{mangaDisplay ? (
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
							.map(manga => (
								<SingleMangaCard
									deleteManga={deleteManga}
									getMangaDatabase={getMangaDatabase}
									id={manga.id}
									imageURL={manga.imageURL}
									key={manga.id}
									title={manga.title}
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
									.map(manga => (
										<SingleMangaCard
											deleteManga={deleteManga}
											getMangaDatabase={getMangaDatabase}
											id={manga.id}
											imageURL={manga.imageURL}
											key={manga.id}
											title={manga.title}
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
					<MangaTable
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
							.map((manga, index) => (
								<SingleMangaTableRow
									chaptersMax={manga.chaptersMax}
									chaptersMin={manga.chaptersMin}
									id={manga.id}
									image={manga.imageURL}
									index={index + 1}
									key={manga.id}
									lastModified={manga.lastModified}
									rating={manga.rating}
									status={manga.status}
									title={manga.title}
									type={manga.type}
									volumesMax={manga.volumesMax}
									volumesMin={manga.volumesMin}
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
									.map((manga, index) => (
										<SingleMangaTableRow
											chaptersMax={manga.chaptersMax}
											chaptersMin={manga.chaptersMin}
											id={manga.id}
											image={manga.imageURL}
											index={21 + index}
											key={manga.id}
											lastModified={manga.lastModified}
											rating={manga.rating}
											status={manga.status}
											title={manga.title}
											type={manga.type}
											volumesMax={manga.volumesMax}
											volumesMin={manga.volumesMin}
										/>
									))
							: null}
					</MangaTable>
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

export default AllManga;
