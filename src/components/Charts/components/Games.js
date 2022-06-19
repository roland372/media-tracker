import React from 'react';

//? <----- Components ----->
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import GamesStats from '../../Media/Games/components/GamesStats';

const Games = ({ gamesMeanScore, gamesDatabase }) => {
	//* <----- Mean Score ----->
	const meanScoreCount = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0,
		9: 0,
		10: 0,
	};

	for (const element of gamesMeanScore) {
		if (meanScoreCount[element.rating]) {
			meanScoreCount[element.rating] += 1;
		} else {
			meanScoreCount[element.rating] = 1;
		}
	}

	const chartDataRating = {
		labels: Object.keys(meanScoreCount),
		datasets: [
			{
				label: 'Rating',
				data: Object.values(meanScoreCount),
				borderColor: '#b68d07',
				backgroundColor: '#b68d07',
			},
		],
	};

	//* <----- Status count ----->
	const gameStatusCount = {};

	for (const element of gamesDatabase) {
		if (gameStatusCount[element.status]) {
			gameStatusCount[element.status] += 1;
		} else {
			gameStatusCount[element.status] = 1;
		}
	}

	const statusBackgroundColors = [];

	for (let i = 0; i < Object.keys(gameStatusCount).length; i++) {
		if (Object.keys(gameStatusCount)[i] === 'Completed') {
			statusBackgroundColors.push('#1266F1');
		}
		if (Object.keys(gameStatusCount)[i] === 'Playing') {
			statusBackgroundColors.push('#00B74A');
		}
		if (Object.keys(gameStatusCount)[i] === 'On-Hold') {
			statusBackgroundColors.push('#FFA900');
		}
		if (Object.keys(gameStatusCount)[i] === 'Dropped') {
			statusBackgroundColors.push('#F93154');
		}
		if (Object.keys(gameStatusCount)[i] === 'Plan to Play') {
			statusBackgroundColors.push('#FBFBFB');
		}
	}

	const chartDataStatusCount = {
		labels: Object.keys(gameStatusCount),
		datasets: [
			{
				label: 'Status',
				data: Object.values(gameStatusCount),
				borderColor: statusBackgroundColors,
				backgroundColor: statusBackgroundColors,
			},
		],
	};

	//* <----- Type count ----->
	const gameTypeCount = {};

	for (const element of gamesDatabase) {
		if (gameTypeCount[element.type]) {
			gameTypeCount[element.type] += 1;
		} else {
			gameTypeCount[element.type] = 1;
		}
	}

	const typeBackgroundColors = [];

	for (let i = 0; i < Object.keys(gameTypeCount).length; i++) {
		if (Object.keys(gameTypeCount)[i] === 'Game') {
			typeBackgroundColors.push('#1266F1');
		}
		if (Object.keys(gameTypeCount)[i] === 'Visual Novel') {
			typeBackgroundColors.push('#00B74A');
		}
	}

	const chartDataTypeCount = {
		labels: Object.keys(gameTypeCount),
		datasets: [
			{
				label: 'Type',
				data: Object.values(gameTypeCount),
				borderColor: typeBackgroundColors,
				backgroundColor: typeBackgroundColors,
			},
		],
	};

	return (
		<section>
			<div>
				<h2 className='pb-3'>Games Stats</h2>
				<GamesStats gamesDatabase={gamesDatabase} />
			</div>
			<section className='mx-lg-5 p-lg-5'>
				<div>
					<h2>Games Rating</h2>
					<Chart type='bar' data={chartDataRating} />
				</div>
			</section>
			<section
				className='m-2 d-flex flex-wrap col-12 
					align-items-center justify-content-evenly'
			>
				<div>
					<h2>Games Status</h2>
					<Chart type='pie' data={chartDataStatusCount} />
				</div>
				<div>
					<h2>Games Type</h2>
					<Chart type='pie' data={chartDataTypeCount} />
				</div>
			</section>
		</section>
	);
};

export default Games;
