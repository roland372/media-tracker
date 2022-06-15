import React from 'react';
import CardComponent from '../../../Layout/CardComponent';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const FavouriteAnime = ({ allAnime, deleteAnime, getAnimeDatabase, user }) => {
	//* show only favourites
	const filteredAnime = allAnime.filter(anime => anime.favourites);

	return (
		<CardComponent title='Favourites'>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{user &&
					filteredAnime
						.filter(owner => owner.owner === user.uid)
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
		</CardComponent>
	);
};

export default FavouriteAnime;
