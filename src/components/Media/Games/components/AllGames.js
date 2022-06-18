import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import CardComponent from '../../../Layout/CardComponent';
import SingleGameCard from './SingleGameCard';
import SingleGameTableRow from './SingleGameTableRow';
import DisplayMoreButton from '../../components/DisplayMoreButton';

//? <----- Functions ----->
import { sortNumber, sortString } from '../../utils/sortFunctions';
import DisplayFilterSearchPanel from '../../components/DisplayFilterSearchPanel';
import GamesTable from './GamesTable';

const AllGames = ({ allGames, deleteGame, getGamesDatabase, user }) => {
	//* sort games by name
	const sortedGames = allGames.sort(function (a, b) {
		const nameA = a.title.toLowerCase(),
			nameB = b.title.toLowerCase();
		if (nameA < nameB)
			//sort string ascending
			return -1;
		if (nameA > nameB) return 1;
		return 0; //default return value (no sorting)
	});

	//* display as list or grid state
	const [gamesDisplay, setGamesDisplay] = useState(true);

	//* menu items state
	const [menuItems, setMenuItems] = useState(sortedGames);

	//* menu items state
	const [displayMore, setDisplayMore] = useState(false);

	useEffect(() => {
		setMenuItems(sortedGames);
	}, [sortedGames]);

	const gameStatus = [
		'All Games',
		'Playing',
		'Completed',
		'On-Hold',
		'Dropped',
		'Plan to Play',
	];

	//* type filtering state
	const [status, setStatus] = useState(gameStatus);

	//* search state
	const [searchTerm, setSearchTerm] = useState('');

	//* sorting state
	const [order, setOrder] = useState('DSC');

	const filterType = gameStatus => {
		if (gameStatus === 'All Games') {
			setMenuItems(sortedGames);
			setStatus(status);
			return;
		}
		const newData = sortedGames.filter(type => type.status === gameStatus);
		// console.log(newData);
		setMenuItems(newData);
	};

	return (
		<CardComponent title='All Games'>
			<DisplayFilterSearchPanel
				filterType={filterType}
				mediaDisplay={gamesDisplay}
				setMediaDisplay={setGamesDisplay}
				setSearchTerm={setSearchTerm}
				searchPlaceholder='Search for a Game'
				status={status}
			/>
			{gamesDisplay ? (
				//* display as grid
				<>
					<section className='d-flex align-items-center justify-content-start flex-wrap'>
						{menuItems
							//? display first 20 elements
							.filter(value => {
								if (searchTerm === '') {
									return value;
								} else if (
									value.title
										.toLowerCase()
										.includes(searchTerm.toLocaleLowerCase())
								) {
									return value;
								}
								return 0;
							})
							.slice(0, 20)
							.map(game => (
								<SingleGameCard
									deleteGame={deleteGame}
									getGamesDatabase={getGamesDatabase}
									id={game.id}
									imageURL={game.imageURL}
									key={game.id}
									title={game.title}
									user={user}
								/>
							))}

						{displayMore
							? //? display the rest
							  menuItems
									.filter(value => {
										if (searchTerm === '') {
											return value;
										} else if (
											value.title
												.toLowerCase()
												.includes(searchTerm.toLocaleLowerCase())
										) {
											return value;
										}
										return 0;
									})
									.slice(20)
									.map(game => (
										<SingleGameCard
											deleteGame={deleteGame}
											getGamesDatabase={getGamesDatabase}
											id={game.id}
											imageURL={game.imageURL}
											key={game.id}
											title={game.title}
											user={user}
										/>
									))
							: null}
					</section>
					<DisplayMoreButton
						displayMore={displayMore}
						menuItems={menuItems}
						setDisplayMore={setDisplayMore}
					/>
				</>
			) : (
				//* display as table
				<>
					<GamesTable
						menuItems={menuItems}
						order={order}
						setMenuItems={setMenuItems}
						setOrder={setOrder}
						sortNumber={sortNumber}
						sortString={sortString}
					>
						{menuItems
							//? display first 20 elements
							.filter(value => {
								if (searchTerm === '') {
									return value;
								} else if (
									value.title
										.toLowerCase()
										.includes(searchTerm.toLocaleLowerCase())
								) {
									return value;
								}
								return 0;
							})
							.slice(0, 20)
							.map((game, index) => (
								<SingleGameTableRow
									id={game.id}
									image={game.imageURL}
									index={index + 1}
									key={game.id}
									lastModified={game.lastModified}
									playtime={game.playtime}
									rating={game.rating}
									status={game.status}
									title={game.title}
									type={game.type}
								/>
							))}

						{displayMore
							? //? display the rest
							  menuItems
									.filter(value => {
										if (searchTerm === '') {
											return value;
										} else if (
											value.title
												.toLowerCase()
												.includes(searchTerm.toLocaleLowerCase())
										) {
											return value;
										}
										return 0;
									})
									.slice(20)
									.map((game, index) => (
										<SingleGameTableRow
											id={game.id}
											image={game.imageURL}
											index={21 + index}
											key={game.id}
											lastModified={game.lastModified}
											playtime={game.playtime}
											rating={game.rating}
											status={game.status}
											title={game.title}
											type={game.type}
										/>
									))
							: null}
					</GamesTable>
					<DisplayMoreButton
						displayMore={displayMore}
						menuItems={menuItems}
						setDisplayMore={setDisplayMore}
					/>
				</>
			)}
		</CardComponent>
	);
};

export default AllGames;
