import React from 'react';

//? <----- Components ----->
import SingleMangaCard from './SingleMangaCard';
import RecentMedia from '../../components/RecentMedia';
import CardComponent from '../../../Layout/CardComponent';

const RecentManga = ({ allManga, deleteManga, getMangaDatabase, user }) => {
	//* sort manga by date
	const sortByDate = allManga?.sort((a, b) => b.lastModified - a.lastModified);

	if (sortByDate?.length < 1)
		return (
			<CardComponent title='Recent Manga'>
				<h4 className='text-center'>No Manga</h4>
			</CardComponent>
		);

	// console.log(allManga);

	return (
		<RecentMedia cardTitle='Recent Manga'>
			{user &&
				sortByDate
					?.slice(0, 20)
					?.map(manga => (
						<SingleMangaCard
							deleteManga={deleteManga}
							getMangaDatabase={getMangaDatabase}
							key={manga.id}
							singleMangaDatabase={manga}
							user={user}
						/>
					))}
		</RecentMedia>
	);
};

export default RecentManga;
