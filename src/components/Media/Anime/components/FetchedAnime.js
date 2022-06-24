import React, { useState } from 'react';

//? <----- Components ----->
import FetchedMedia from '../../components/FetchedMedia';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const FetchedAnime = ({
	animeDatabase,
	AnimeDataService,
	fetchedAnime,
	getAnimeDatabase,
	user,
}) => {
	const [singleAnime, setSingleAnime] = useState({
		id: uuidv4(),
		mal_id: '',
		title: '',
		// synopsis: '',
		type: 'TV-Show',
		link1: '',
		link1Name: 'MAL',
		link2: '',
		link2Name: 'Link',
		imageURL: '',
		rating: 0,
		status: 'Plan to Watch',
		episodesMin: 0,
		episodesMax: 0,
		favourites: false,
		owner: user?.uid,
		lastModified: Date.now(),
	});

	const animeAddedNotification = () =>
		toast.success('Anime Added', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const setAnimeType = type => {
		if (type === 'TV') {
			type = 'TV-Show';
		}
		return type;
	};

	const onSubmit = async e => {
		e.preventDefault();

		try {
			animeDatabase?.[0]?.anime.push({
				...singleAnime,
			});

			await AnimeDataService.updateAnime(user?.uid, animeDatabase[0]);

			await getAnimeDatabase(user?.uid);
			console.log('anime added to database');
			singleAnime.id = uuidv4();
			animeAddedNotification();
			// console.log(singleAnime);
		} catch (error) {
			console.log(error);
		}
	};

	if (fetchedAnime?.length === 0)
		return (
			<FetchedMedia cardTitle='Searched Anime'>
				<h5 className='mx-2 text-center'>No Anime Found</h5>
			</FetchedMedia>
		);

	return (
		<FetchedMedia cardTitle='Searched Anime'>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{fetchedAnime?.map(anime => (
					<section className='p-2' key={anime.mal_id}>
						<OverlayTrigger
							trigger='click'
							placement='auto'
							rootClose={true}
							overlay={
								<Popover>
									<Popover.Header>{anime.title}</Popover.Header>
									<Popover.Body onClick={() => document.body.click()}>
										<section>
											<div>Episodes: {anime.episodes}</div>
											<div>Type: {anime.type}</div>
											<div>
												Synopsis:{' '}
												{typeof anime.synopsis === 'string'
													? anime.synopsis.slice(0, 100) + '...'
													: anime.synopsis}
											</div>
										</section>
										<hr />
										<div className='d-flex justify-content-start'>
											<form onSubmit={e => onSubmit(e)}>
												<button
													className='btn btn-sm btn-primary'
													onClick={() => {
														// console.log(anime);
														const addAnime = {
															...singleAnime,
															mal_id: anime.mal_id,
															title: anime.title ? anime.title : 'anime',
															// synopsis: anime.synopsis ? anime.synopsis : '',
															type: setAnimeType(anime.type),
															link1: anime.url,
															//? v3
															// imageURL: anime.image_url,
															//? v4
															imageURL: anime.images.jpg.image_url,
															episodesMax: anime.episodes ? anime.episodes : 0,
															owner: user?.uid,
															lastModified: Date.now(),
														};
														setSingleAnime(addAnime);
													}}
												>
													Add
												</button>
											</form>
											<a href={anime.url} target='_blank' rel='noreferrer'>
												<button className='btn btn-sm btn-success mx-1'>
													View More
												</button>
											</a>
										</div>
									</Popover.Body>
								</Popover>
							}
						>
							{/* v3 */}
							{/* <img
								src={
									anime.image_url
										? anime.image_url
										: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
								}
								alt=''
								className='rounded media-img-card'
								role='button'
							/> */}
							{/* v4 */}
							<img
								src={
									anime.images.jpg.image_url
										? anime.images.jpg.image_url
										: 'http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-150x200.png'
								}
								alt=''
								className='rounded media-img-card'
								role='button'
							/>
						</OverlayTrigger>
					</section>
				))}
			</section>
		</FetchedMedia>
	);
};

export default FetchedAnime;
