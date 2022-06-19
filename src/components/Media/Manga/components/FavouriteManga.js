import React from 'react';

//? <----- Components ----->
import SingleMangaCard from './SingleMangaCard';
import FavouriteMedia from '../../components/FavouriteMedia';
import CardComponent from '../../../Layout/CardComponent';

const FavouriteManga = ({ allManga, deleteManga, getMangaDatabase, user }) => {
	//* show only favourites
	const filteredManga = allManga.filter(manga => manga.favourites);

	if (filteredManga.length < 1)
		return (
			<CardComponent title='All Manga'>
				<h4 className='text-center'>No Favourite Manga</h4>
			</CardComponent>
		);

	return (
		<FavouriteMedia cardTitle='Favourite Manga'>
			{user &&
				filteredManga.map(manga => (
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
		</FavouriteMedia>
	);
};

export default FavouriteManga;
