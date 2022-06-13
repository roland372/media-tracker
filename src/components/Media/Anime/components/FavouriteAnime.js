import React from 'react';
import CardComponent from '../../../Layout/CardComponent';

//? <----- Components ----->
import SingleAnimeCard from './SingleAnimeCard';

const FavouriteAnime = ({ allAnime, deleteAnime, user }) => {
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
								key={anime.id}
								title={anime.title}
								imageURL={anime.imageURL}
								id={anime.id}
								deleteAnime={deleteAnime}
							/>
						))}

				{/* <SingleAnimeCard />
				<SingleAnimeCard />
				<SingleAnimeCard /> */}
			</section>
		</CardComponent>
	);
};

export default FavouriteAnime;
