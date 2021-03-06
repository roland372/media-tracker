import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';
import FavouriteMedia from '../../components/FavouriteMedia';
import CardComponent from '../../../Layout/CardComponent';

const FavouriteAnime = ({ allAnime, deleteAnime, getAnimeDatabase, user }) => {
	//* show only favourites
	const filteredAnime = allAnime?.filter(anime => anime.favourites);

	//* sort anime by name
	const sortedAnime = filteredAnime?.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	if (sortedAnime?.length < 1)
		return (
			<CardComponent title='Favourite Anime'>
				<h4 className='text-center'>No Favourite Anime</h4>
			</CardComponent>
		);

	return (
		<FavouriteMedia cardTitle='Favourite Anime'>
			{user &&
				sortedAnime?.map(anime => (
					<SingleAnimeCard
						deleteAnime={deleteAnime}
						getAnimeDatabase={getAnimeDatabase}
						key={anime.id}
						singleAnimeDatabase={anime}
						user={user}
					/>
				))}
		</FavouriteMedia>
	);
};

export default FavouriteAnime;
