import React from 'react';

//? <----- Components ----->
import { ProgressBar } from 'react-bootstrap';
import { BsFillCircleFill } from 'react-icons/bs';

const AnimeStats = ({ animeDatabase }) => {
	function round(value, precision) {
		let multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}

	//* filter out anime that have score 0
	const meanScore = animeDatabase.filter(anime => anime.rating !== 0).length;

	const totalEpisodesSum = animeDatabase.reduce((accumulator, object) => {
		return accumulator + parseInt(object.episodesMax);
	}, 0);

	const watchedEpisodesSum = animeDatabase.reduce((accumulator, object) => {
		return accumulator + parseInt(object.episodesMin);
	}, 0);

	const watchingAnime = animeDatabase.filter(
		anime => anime.status === 'Watching'
	);

	const completedAnime = animeDatabase.filter(
		anime => anime.status === 'Completed'
	);

	const onHoldAnime = animeDatabase.filter(anime => anime.status === 'On-Hold');

	const droppedAnime = animeDatabase.filter(
		anime => anime.status === 'Dropped'
	);

	const planToWatchAnime = animeDatabase.filter(
		anime => anime.status === 'Plan to Watch'
	);

	const totalRating = animeDatabase.reduce((accumulator, object) => {
		return accumulator + parseInt(object.rating);
	}, 0);

	const favourites = animeDatabase.filter(anime => anime.favourites);

	// console.log(
	// 	'watching:',
	// 	watchingAnime.length,
	// 	'\ncompleted:',
	// 	completedAnime.length,
	// 	'\non-hold:',
	// 	onHoldAnime.length,
	// 	'\ndropped:',
	// 	droppedAnime.length,
	// 	'\nplan to watch:',
	// 	planToWatchAnime.length
	// );

	// console.log(
	// 	watchingAnime.length,
	// 	completedAnime.length,
	// 	onHoldAnime.length,
	// 	droppedAnime.length,
	// 	planToWatchAnime.length
	// );

	return (
		<section className='mx-2'>
			<ProgressBar style={{ height: '30px' }}>
				<ProgressBar
					variant='success'
					now={watchingAnime.length * 100}
					key={1}
				/>
				<ProgressBar
					variant='primary'
					now={completedAnime.length * 100}
					key={2}
				/>
				<ProgressBar variant='warning' now={onHoldAnime.length * 100} key={3} />
				<ProgressBar variant='danger' now={droppedAnime.length * 100} key={4} />
				<ProgressBar
					variant='light'
					now={planToWatchAnime.length * 100}
					key={5}
				/>
			</ProgressBar>
			<hr />
			<section className='d-flex justify-content-between'>
				<div>Days: {round(watchedEpisodesSum / 60, 1)}</div>
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
							<div className='ms-2'>Watching</div>
						</div>
						<span className='ms-4'>{watchingAnime.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-primary' />
							<div className='ms-2'>Completed</div>
						</div>
						<span className='ms-4'>{completedAnime.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-warning' />
							<div className='ms-2'>On-Hold</div>
						</div>
						<span className='ms-4'>{onHoldAnime.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-danger' />
							<div className='ms-2'>Dropped</div>
						</div>
						<span className='ms-4'>{droppedAnime.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-light' />
							<div className='ms-2'>Plan to Watch</div>
						</div>
						<span className='ms-4'>{planToWatchAnime.length}</span>
					</div>

					{/* <div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-primary' />
							<span className='ms-1'>Completed {completedAnime.length}</span>
						</div>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-warning' />
							<span className='ms-1'>On-Hold {onHoldAnime.length}</span>
						</div>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-danger' />
							<span className='ms-1'>Dropped {droppedAnime.length}</span>
						</div>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-light' />
							<span className='ms-1'>
								Plan to Watch {planToWatchAnime.length}
							</span>
						</div> */}
				</section>
				{/* <section className='text-end'>
						<div>Total Anime {animeDatabase.length}</div>
						<div>Favourites {favourites.length}</div>
						<div>Total Episodes {totalEpisodesSum}</div>
						<div>Watched Episodes {watchedEpisodesSum}</div>
					</section> */}

				<section className='d-flex flex-column'>
					<div className='d-flex justify-content-between'>
						<div>Total Anime</div>
						<div className='ms-4'>{animeDatabase.length}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Favourites</div>
						<div className='ms-4'>{favourites.length}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Total Episodes</div>
						<div className='ms-4'>{totalEpisodesSum}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Watched Episodes</div>
						<div className='ms-4'>{watchedEpisodesSum}</div>
					</div>
					<div>&#8203;</div>
				</section>
			</div>
		</section>
	);
};

export default AnimeStats;
