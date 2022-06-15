import React, { useEffect, useState } from 'react';

//? <----- Router ----->
import { Link, useParams } from 'react-router-dom';

//? <----- Firebase ----->
import AnimeDataService from '../services/anime.services';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';

const SingleAnime = () => {
	const { id } = useParams();

	const [singleAnimeDatabase, setSingleAnimeDatabase] = useState({});
	useDocumentTitle(singleAnimeDatabase?.title);

	useEffect(() => {
		const getAnimeDatabase = async id => {
			const data = await AnimeDataService.getAnime(id);
			setSingleAnimeDatabase(data.data());
		};

		getAnimeDatabase(id);
	}, [id]);

	const {
		title,
		imageURL,
		synopsis,
		type,
		link,
		episodesMin,
		episodesMax,
		status,
		rating,
	} = singleAnimeDatabase;

	return (
		<CardComponent title={title}>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
					<Link className='btn btn-primary' to='/media/anime'>
						Back to Anime
					</Link>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<section className='mx-2 mt-2'>
				<section className='d-lg-flex align-items-start'>
					<img
						className='img img-fluid'
						width='200px'
						src={
							imageURL
								? imageURL
								: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
						}
						alt={title}
					/>
					<div>
						<h5 className='mt-lg-0 mt-3'>Synopsis</h5>
						<p className='px-3 text-start'>{synopsis}</p>
						<section className='d-flex justify-content-around'>
							<div>
								<h5>Type</h5>
								<p>{type}</p>
							</div>
							<div>
								<h5>Link</h5>
								<a href={link} target='_blank' rel='noreferrer'>
									<p>Link</p>
								</a>
							</div>
							<div>
								<h5>Episodes</h5>
								<p>
									{episodesMin}/{episodesMax}
								</p>
							</div>
							<div>
								<h5>Status</h5>
								<p>{status}</p>
							</div>
							<div>
								<h5>Rating</h5>
								<p>⭐{rating}</p>
							</div>
						</section>
					</div>
				</section>
			</section>
		</CardComponent>
	);
};

export default SingleAnime;
