import React from 'react';

//? <----- Components ----->
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import AnimeStats from '../../Media/Anime/components/AnimeStats';

const Anime = ({ animeMeanScore, animeDatabase }) => {
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

	for (const element of animeMeanScore) {
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

	//* <----- Episodes count ----->
	const totalEpisodesCount = {};

	for (const element of animeDatabase) {
		if (totalEpisodesCount[element.episodesMax]) {
			totalEpisodesCount[element.episodesMax] += 1;
		} else {
			totalEpisodesCount[element.episodesMax] = 1;
		}
	}

	const chartDataTotalEpisodes = {
		labels: Object.keys(totalEpisodesCount),
		datasets: [
			{
				label: 'Total Anime',
				data: Object.values(totalEpisodesCount),
				borderColor: '#1266F1',
				backgroundColor: '#1266F1',
			},
		],
	};

	//* <----- Status count ----->
	const animeStatusCount = {};

	for (const element of animeDatabase) {
		if (animeStatusCount[element.status]) {
			animeStatusCount[element.status] += 1;
		} else {
			animeStatusCount[element.status] = 1;
		}
	}
	// const keysSorted = Object.keys(animeStatusCount).sort(function (a, b) {
	// 	return animeStatusCount[a] - animeStatusCount[b];
	// });
	const statusBackgroundColors = [];

	for (let i = 0; i < Object.keys(animeStatusCount).length; i++) {
		if (Object.keys(animeStatusCount)[i] === 'Completed') {
			statusBackgroundColors.push('#1266F1');
		}
		if (Object.keys(animeStatusCount)[i] === 'Watching') {
			statusBackgroundColors.push('#00B74A');
		}
		if (Object.keys(animeStatusCount)[i] === 'On-Hold') {
			statusBackgroundColors.push('#FFA900');
		}
		if (Object.keys(animeStatusCount)[i] === 'Dropped') {
			statusBackgroundColors.push('#F93154');
		}
		if (Object.keys(animeStatusCount)[i] === 'Plan to Watch') {
			statusBackgroundColors.push('#FBFBFB');
		}
	}

	const chartDataStatusCount = {
		labels: Object.keys(animeStatusCount),
		datasets: [
			{
				label: 'Status',
				data: Object.values(animeStatusCount),
				borderColor: statusBackgroundColors,
				backgroundColor: statusBackgroundColors,
			},
		],
	};

	//* <----- Type count ----->
	const animeTypeCount = {};

	for (const element of animeDatabase) {
		if (animeTypeCount[element.type]) {
			animeTypeCount[element.type] += 1;
		} else {
			animeTypeCount[element.type] = 1;
		}
	}

	const typeBackgroundColors = [];

	for (let i = 0; i < Object.keys(animeTypeCount).length; i++) {
		if (Object.keys(animeTypeCount)[i] === 'TV-Show') {
			typeBackgroundColors.push('#1266F1');
		}
		if (Object.keys(animeTypeCount)[i] === 'Movie') {
			typeBackgroundColors.push('#00B74A');
		}
		if (Object.keys(animeTypeCount)[i] === 'OVA') {
			typeBackgroundColors.push('#39C0ED');
		}
	}

	const chartDataTypeCount = {
		labels: Object.keys(animeTypeCount),
		datasets: [
			{
				label: 'Type',
				data: Object.values(animeTypeCount),
				borderColor: typeBackgroundColors,
				backgroundColor: typeBackgroundColors,
			},
		],
	};

	return (
		<section>
			<div>
				<h2 className='pb-2'>Anime Stats</h2>
				<AnimeStats animeDatabase={animeDatabase} />
			</div>
			<section
				className='m-2 d-flex flex-wrap col-12 
					align-items-center justify-content-evenly'
			>
				<div>
					<h2>Anime Rating</h2>
					<Chart type='bar' data={chartDataRating} />
				</div>
				<div>
					<h2>Anime Episodes Count</h2>
					<Chart type='bar' data={chartDataTotalEpisodes} />
				</div>
			</section>
			<section
				className='m-2 d-flex flex-wrap col-12 
					align-items-center justify-content-evenly'
			>
				<div>
					<h2>Anime Status</h2>
					<Chart type='pie' data={chartDataStatusCount} />
				</div>
				<div>
					<h2>Anime Type</h2>
					<Chart type='pie' data={chartDataTypeCount} />
				</div>
			</section>
		</section>
	);
};

export default Anime;
