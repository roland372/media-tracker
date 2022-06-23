import React from 'react';

//? <----- Components ----->
import { ProgressBar } from 'react-bootstrap';
import { BsFillCircleFill } from 'react-icons/bs';

const MangaStats = ({ mangaDatabase }) => {
	function round(value, precision) {
		let multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}

	//* filter out manga that have score 0
	const meanScore = mangaDatabase?.filter(manga => manga.rating !== 0).length;

	const totalChaptersSum = mangaDatabase?.reduce((accumulator, object) => {
		return accumulator + parseInt(object.chaptersMax);
	}, 0);

	const totalVolumesSum = mangaDatabase?.reduce((accumulator, object) => {
		return accumulator + parseInt(object.volumesMax);
	}, 0);

	const readChaptersSum = mangaDatabase?.reduce((accumulator, object) => {
		return accumulator + parseInt(object.chaptersMin);
	}, 0);

	const readVolumesSum = mangaDatabase?.reduce((accumulator, object) => {
		return accumulator + parseInt(object.volumesMin);
	}, 0);

	const readingManga = mangaDatabase?.filter(
		manga => manga.status === 'Reading'
	);

	const completedManga = mangaDatabase?.filter(
		manga => manga.status === 'Completed'
	);

	const onHoldManga = mangaDatabase?.filter(manga => manga.status === 'On-Hold');

	const droppedManga = mangaDatabase?.filter(
		manga => manga.status === 'Dropped'
	);

	const planToReadManga = mangaDatabase?.filter(
		manga => manga.status === 'Plan to Read'
	);

	const totalRating = mangaDatabase?.reduce((accumulator, object) => {
		return accumulator + parseInt(object.rating);
	}, 0);

	const favourites = mangaDatabase?.filter(manga => manga.favourites);

	//* calculate total days
	const filteredMangaVolumes = mangaDatabase
		?.filter(manga => manga.type === 'Manga')
		?.reduce((accumulator, object) => {
			return accumulator + parseInt(object.volumesMin);
		}, 0);

	const filteredWebtoonChapters = mangaDatabase
		?.filter(manga => manga.type === 'Webtoon')
		?.reduce((accumulator, object) => {
			return accumulator + parseInt(object.chaptersMin);
		}, 0);

	const filteredLightNovelVolumes = mangaDatabase
		?.filter(manga => manga.type === 'Light Novel')
		?.reduce((accumulator, object) => {
			return accumulator + parseInt(object.volumesMin);
		}, 0);

	// 1 volume = 2 hours
	// console.log((filteredMangaVolumes * 2) / 24);

	// 1 chapter = 20 mins
	// console.log((filteredWebtoonChapters * (1 / 3)) / 24);

	// 1 volume = 6 hours
	// console.log((filteredLightNovelVolumes * 6) / 24);

	const watchedDays =
		(filteredMangaVolumes * 1) / 24 +
		(filteredWebtoonChapters * (1 / 12)) / 24 +
		(filteredLightNovelVolumes * 6) / 24;
	// console.log(watchedDays);

	return (
		<section className='mx-2'>
			<ProgressBar style={{ height: '30px' }}>
				<ProgressBar
					variant='success'
					now={readingManga?.length * 100}
					key={1}
				/>
				<ProgressBar
					variant='primary'
					now={completedManga?.length * 100}
					key={2}
				/>
				<ProgressBar variant='warning' now={onHoldManga?.length * 100} key={3} />
				<ProgressBar variant='danger' now={droppedManga?.length * 100} key={4} />
				<ProgressBar
					variant='light'
					now={planToReadManga?.length * 100}
					key={5}
				/>
			</ProgressBar>
			<hr />
			<section className='d-flex justify-content-between'>
				<div>Days: {round(watchedDays, 1)}</div>
				<div>
					Mean Score: {meanScore === 0 ? 0 : round(totalRating / meanScore, 1)}
				</div>
			</section>
			<hr />
			<div className='d-flex justify-content-between'>
				<section className='text-start'>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-success' />
							<div className='ms-2'>Reading</div>
						</div>
						<span className='ms-4'>{readingManga?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-primary' />
							<div className='ms-2'>Completed</div>
						</div>
						<span className='ms-4'>{completedManga?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-warning' />
							<div className='ms-2'>On-Hold</div>
						</div>
						<span className='ms-4'>{onHoldManga?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-danger' />
							<div className='ms-2'>Dropped</div>
						</div>
						<span className='ms-4'>{droppedManga?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-light' />
							<div className='ms-2'>Plan to Read</div>
						</div>
						<span className='ms-4'>{planToReadManga?.length}</span>
					</div>
				</section>

				<section className='d-flex flex-column'>
					<div className='d-flex justify-content-between'>
						<div>Total Manga</div>
						<div className='ms-4'>{mangaDatabase?.length}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Favourites</div>
						<div className='ms-4'>{favourites?.length}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Total Chapters</div>
						<div className='ms-4'>{totalChaptersSum}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Read Chapters</div>
						<div className='ms-4'>{readChaptersSum}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Total Volumes</div>
						<div className='ms-4'>{totalVolumesSum}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Read Volumes</div>
						<div className='ms-4'>{readVolumesSum}</div>
					</div>
				</section>
			</div>
		</section>
	);
};

export default MangaStats;
