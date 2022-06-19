import React from 'react';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';
import FavouriteMedia from '../../components/FavouriteMedia';
import CardComponent from '../../../Layout/CardComponent';

const FavouriteAnime = ({ allAnime, deleteAnime, getAnimeDatabase, user }) => {
	//* show only favourites
	const filteredAnime = allAnime.filter(anime => anime.favourites);

	if (filteredAnime.length < 1)
		return (
			<CardComponent title='All Anime'>
				<h4 className='text-center'>No Favourite Anime</h4>
			</CardComponent>
		);

	return (
		<FavouriteMedia cardTitle='Favourite Anime'>
			{user &&
				filteredAnime.map(anime => (
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
		</FavouriteMedia>
	);
};

export default FavouriteAnime;
