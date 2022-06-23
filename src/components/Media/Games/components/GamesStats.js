import React from 'react';

//? <----- Components ----->
import { ProgressBar } from 'react-bootstrap';
import { BsFillCircleFill } from 'react-icons/bs';

const GamesStats = ({ gamesDatabase }) => {
	function round(value, precision) {
		let multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}

	//* filter out games that have score 0
	const meanScore = gamesDatabase?.filter(game => game.rating !== 0)?.length;

	const playingGames = gamesDatabase?.filter(game => game.status === 'Playing');

	const completedGames = gamesDatabase?.filter(
		game => game.status === 'Completed'
	);

	const onHoldGames = gamesDatabase?.filter(game => game.status === 'On-Hold');

	const droppedGames = gamesDatabase?.filter(game => game.status === 'Dropped');

	const planToPlayGames = gamesDatabase?.filter(
		game => game.status === 'Plan to Play'
	);

	const totalRating = gamesDatabase?.reduce((accumulator, object) => {
		return accumulator + parseInt(object.rating);
	}, 0);

	const favourites = gamesDatabase?.filter(game => game.favourites);

	const totalPlaytime = gamesDatabase?.reduce((accumulator, object) => {
		return accumulator + parseInt(object.playtime);
	}, 0);

	// console.log(round(totalPlaytime / 24, 1));

	return (
		<section className='mx-2'>
			<ProgressBar style={{ height: '30px' }}>
				<ProgressBar
					variant='success'
					now={playingGames?.length * 100}
					key={1}
				/>
				<ProgressBar
					variant='primary'
					now={completedGames?.length * 100}
					key={2}
				/>
				<ProgressBar variant='warning' now={onHoldGames?.length * 100} key={3} />
				<ProgressBar variant='danger' now={droppedGames?.length * 100} key={4} />
				<ProgressBar
					variant='light'
					now={planToPlayGames?.length * 100}
					key={5}
				/>
			</ProgressBar>
			<hr />
			<section className='d-flex justify-content-between'>
				<div>Days: {round(totalPlaytime / 24, 1)}</div>
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
							<div className='ms-2'>Playing</div>
						</div>
						<span className='ms-4'>{playingGames?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-primary' />
							<div className='ms-2'>Completed</div>
						</div>
						<span className='ms-4'>{completedGames?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-warning' />
							<div className='ms-2'>On-Hold</div>
						</div>
						<span className='ms-4'>{onHoldGames?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-danger' />
							<div className='ms-2'>Dropped</div>
						</div>
						<span className='ms-4'>{droppedGames?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-light' />
							<div className='ms-2'>Plan to Play</div>
						</div>
						<span className='ms-4'>{planToPlayGames?.length}</span>
					</div>
				</section>
				<section className='d-flex flex-column'>
					<div className='d-flex justify-content-between'>
						<div>Total Games</div>
						<div className='ms-4'>{gamesDatabase?.length}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Favourites</div>
						<div className='ms-4'>{favourites?.length}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Playtime</div>
						<div className='ms-4'>{totalPlaytime} hours</div>
					</div>
				</section>
			</div>
		</section>
	);
};

export default GamesStats;
