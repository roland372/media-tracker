import React from 'react';

//? <----- Components ----->
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import MangaStats from '../../Media/Manga/components/MangaStats';

const Manga = ({ mangaMeanScore, mangaDatabase }) => {
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

	for (const element of mangaMeanScore) {
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
	const mangaStatusCount = {};

	for (const element of mangaDatabase) {
		if (mangaStatusCount[element.status]) {
			mangaStatusCount[element.status] += 1;
		} else {
			mangaStatusCount[element.status] = 1;
		}
	}
	const statusBackgroundColors = [];

	for (let i = 0; i < Object.keys(mangaStatusCount).length; i++) {
		if (Object.keys(mangaStatusCount)[i] === 'Completed') {
			statusBackgroundColors.push('#1266F1');
		}
		if (Object.keys(mangaStatusCount)[i] === 'Reading') {
			statusBackgroundColors.push('#00B74A');
		}
		if (Object.keys(mangaStatusCount)[i] === 'On-Hold') {
			statusBackgroundColors.push('#FFA900');
		}
		if (Object.keys(mangaStatusCount)[i] === 'Dropped') {
			statusBackgroundColors.push('#F93154');
		}
		if (Object.keys(mangaStatusCount)[i] === 'Plan to Read') {
			statusBackgroundColors.push('#FBFBFB');
		}
	}

	const chartDataStatusCount = {
		labels: Object.keys(mangaStatusCount),
		datasets: [
			{
				label: 'Status',
				data: Object.values(mangaStatusCount),
				borderColor: statusBackgroundColors,
				backgroundColor: statusBackgroundColors,
			},
		],
	};

	//* <----- Type count ----->
	const mangaTypeCount = {};

	for (const element of mangaDatabase) {
		if (mangaTypeCount[element.type]) {
			mangaTypeCount[element.type] += 1;
		} else {
			mangaTypeCount[element.type] = 1;
		}
	}

	const typeBackgroundColors = [];

	for (let i = 0; i < Object.keys(mangaTypeCount).length; i++) {
		if (Object.keys(mangaTypeCount)[i] === 'Manga') {
			typeBackgroundColors.push('#1266F1');
		}
		if (Object.keys(mangaTypeCount)[i] === 'Light Novel') {
			typeBackgroundColors.push('#B23CFD');
		}
		if (Object.keys(mangaTypeCount)[i] === 'Webtoon') {
			typeBackgroundColors.push('#00B74A');
		}
		if (Object.keys(mangaTypeCount)[i] === 'Manhua') {
			typeBackgroundColors.push('#39C0ED');
		}
		if (Object.keys(mangaTypeCount)[i] === 'Doujinshi') {
			typeBackgroundColors.push('#F93154');
		}
		if (Object.keys(mangaTypeCount)[i] === 'One-shot') {
			typeBackgroundColors.push('#FFA900');
		}
		if (Object.keys(mangaTypeCount)[i] === 'Novel') {
			typeBackgroundColors.push('#FBFBFB');
		}
	}

	const chartDataTypeCount = {
		labels: Object.keys(mangaTypeCount),
		datasets: [
			{
				label: 'Type',
				data: Object.values(mangaTypeCount),
				borderColor: typeBackgroundColors,
				backgroundColor: typeBackgroundColors,
			},
		],
	};

	return (
		<section>
			<div>
				<h2 className='pb-3'>Manga Stats</h2>
				<MangaStats mangaDatabase={mangaDatabase} />
			</div>
			<section className='mx-lg-5 p-lg-5'>
				<div>
					<h2>Manga Rating</h2>
					<Chart type='bar' data={chartDataRating} />
				</div>
			</section>
			<section
				className='m-2 d-flex flex-wrap col-12 
					align-items-center justify-content-evenly'
			>
				<div>
					<h2>Manga Status</h2>
					<Chart type='pie' data={chartDataStatusCount} />
				</div>
				<div>
					<h2>Manga Type</h2>
					<Chart type='pie' data={chartDataTypeCount} />
				</div>
			</section>
		</section>
	);
};

export default Manga;
