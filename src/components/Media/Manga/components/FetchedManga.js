import React, { useState } from 'react';

//? <----- Components ----->
import FetchedMedia from '../../components/FetchedMedia';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../Layout/Button';

const FetchedManga = ({
	mangaDatabase,
	MangaDataService,
	fetchedManga,
	getMangaDatabase,
	user,
}) => {
	const [singleManga, setSingleManga] = useState({
		id: uuidv4(),
		mal_id: '',
		title: '',
		// synopsis: '',
		type: 'Manga',
		link1: '',
		link1Name: 'MAL',
		link2: '',
		link2Name: 'Link',
		imageURL: '',
		rating: 0,
		status: 'Plan to Read',
		chaptersMax: 0,
		chaptersMin: 0,
		volumesMax: 0,
		volumesMin: 0,
		favourites: false,
		owner: user?.uid,
		lastModified: Date.now(),
	});

	const mangaAddedNotification = () =>
		toast.success('Manga Added', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const setMangaType = type => {
		if (type === 'Manhwa') {
			type = 'Webtoon';
		}
		return type;
	};

	const onSubmit = async e => {
		e.preventDefault();

		try {
			mangaDatabase?.[0]?.manga.push({
				...singleManga,
			});

			await MangaDataService.updateManga(user?.uid, mangaDatabase[0]);

			await getMangaDatabase(user?.uid);
			console.log('manga added to database');
			singleManga.id = uuidv4();
			mangaAddedNotification();
			// console.log(singleManga);
		} catch (error) {
			console.log(error);
		}
	};

	if (fetchedManga?.length === 0)
		return (
			<FetchedMedia cardTitle='Searched Manga'>
				<h5 className='mx-2 text-center'>No Manga Found</h5>
			</FetchedMedia>
		);

	return (
		<FetchedMedia cardTitle='Searched Manga'>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{fetchedManga?.map(manga => (
					<section className='p-2' key={manga.mal_id}>
						<OverlayTrigger
							trigger='click'
							placement='auto'
							rootClose={true}
							overlay={
								<Popover>
									<Popover.Header>{manga.title}</Popover.Header>
									<Popover.Body onClick={() => document.body.click()}>
										<section>
											<div>Chapters: {manga.chapters}</div>
											<div>Volumes: {manga.volumes}</div>
											<div>Type: {manga.type}</div>
											<div>
												Synopsis:{' '}
												{typeof manga.synopsis === 'string'
													? manga.synopsis.slice(0, 100) + '...'
													: manga.synopsis}
											</div>
										</section>
										<hr />
										<div className='d-flex justify-content-start'>
											<form onSubmit={e => onSubmit(e)}>
												<Button
													color='primary'
													onClick={() => {
														// console.log(manga);
														const addManga = {
															...singleManga,
															mal_id: manga.mal_id,
															title: manga.title ? manga.title : 'manga',
															// synopsis: manga.synopsis ? manga.synopsis : '',
															type: setMangaType(manga.type),
															link1: manga.url,
															imageURL: manga.images.jpg.image_url,
															chaptersMax: manga.chapters ? manga.chapters : 0,
															volumesMax: manga.volumes ? manga.volumes : 0,
															owner: user?.uid,
															lastModified: Date.now(),
														};
														setSingleManga(addManga);
													}}
													sm
													text='Add'
												/>
											</form>
											<a
												href={manga.url}
												target='_blank'
												rel='noreferrer'
												className='mx-1'
											>
												<Button color='success' sm text='View More' />
											</a>
										</div>
									</Popover.Body>
								</Popover>
							}
						>
							<img
								src={
									manga.images.jpg.image_url
										? manga.images.jpg.image_url
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

export default FetchedManga;
