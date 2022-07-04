import React from 'react';

//? <----- Components ----->
import SingleMangaCard from './SingleMangaCard';
import FavouriteMedia from '../../components/FavouriteMedia';
import CardComponent from '../../../Layout/CardComponent';

const FavouriteManga = ({ allManga, deleteManga, getMangaDatabase, user }) => {
	//* show only favourites
	const filteredManga = allManga?.filter(manga => manga.favourites);

	//* sort manga by name
	const sortedManga = filteredManga?.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	if (sortedManga?.length < 1)
		return (
			<CardComponent title='Favourite Manga'>
				<h4 className='text-center'>No Favourite Manga</h4>
			</CardComponent>
		);

	return (
		<FavouriteMedia cardTitle='Favourite Manga'>
			{user &&
				sortedManga?.map(manga => (
					<SingleMangaCard
						deleteManga={deleteManga}
						getMangaDatabase={getMangaDatabase}
						key={manga.id}
						singleMangaDatabase={manga}
						user={user}
					/>
				))}
		</FavouriteMedia>
	);
};

export default FavouriteManga;
