import React from 'react';

//? <----- Components ----->
import SingleMangaCard from './SingleMangaCard';
import RecentMedia from '../../components/RecentMedia';
import CardComponent from '../../../Layout/CardComponent';

const RecentManga = ({ allManga, deleteManga, getMangaDatabase, user }) => {
	//* sort manga by date
	const sortByDate = allManga.sort((a, b) => b.lastModified - a.lastModified);

	if (sortByDate.length < 1)
		return (
			<CardComponent title='Recent Manga'>
				<h4 className='text-center'>No Manga</h4>
			</CardComponent>
		);

	return (
		<RecentMedia cardTitle='Recent Manga'>
			{user &&
				sortByDate
					.filter(owner => owner.owner === user.uid)
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
		</RecentMedia>
	);
};

export default RecentManga;
