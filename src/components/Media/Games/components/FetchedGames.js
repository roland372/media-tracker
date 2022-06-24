import React, { useState } from 'react';

//? <----- Components ----->
import FetchedMedia from '../../components/FetchedMedia';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const FetchedGames = ({
	gamesDatabase,
	GamesDataService,
	fetchedGames,
	getGamesDatabase,
	user,
}) => {
	const [singleGame, setSingleGame] = useState({
		favourites: false,
		gameID: '',
		id: uuidv4(),
		imageURL: '',
		lastModified: Date.now(),
		link1: '',
		link1Name: 'IGDB',
		link2: '',
		link2Name: 'Link',
		owner: user?.uid,
		playtime: 0,
		rating: 0,
		slug: '',
		status: 'Plan to Play',
		title: '',
		type: 'Game',
	});

	const gameAddedNotification = () =>
		toast.success('Game Added', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const onSubmit = async e => {
		e.preventDefault();

		try {
			gamesDatabase?.[0]?.games.push({
				...singleGame,
			});

			await GamesDataService.updateGame(user?.uid, gamesDatabase?.[0]);

			await getGamesDatabase(user?.uid);
			console.log('game added to database');
			singleGame.id = uuidv4();
			gameAddedNotification();
			// console.log(singleGame);
		} catch (error) {
			console.log(error);
		}
	};

	if (fetchedGames?.length === 0)
		return (
			<FetchedMedia cardTitle='Searched Games'>
				<h5 className='mx-2 text-center'>No Games Found</h5>
			</FetchedMedia>
		);

	return (
		<FetchedMedia cardTitle='Searched Games'>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{fetchedGames?.map(game => (
					<section className='p-2' key={game.slug}>
						<OverlayTrigger
							trigger='click'
							placement='auto'
							rootClose={true}
							overlay={
								<Popover>
									<Popover.Header>{game.name}</Popover.Header>
									<Popover.Body onClick={() => document.body.click()}>
										<section>
											{game.first_release_date ? (
												<div>
													Release Date:{' '}
													{new Date(
														game.first_release_date * 1000
													).toLocaleDateString('en-GB')}
												</div>
											) : null}
											{game.total_rating ? (
												<div>Rating: {Math.round(game.total_rating)}</div>
											) : null}
											{game.storyline ? (
												<div>
													Synopsis:{' '}
													{typeof game.storyline === 'string'
														? game.storyline.slice(0, 100) + '...'
														: game.storyline}
												</div>
											) : null}
										</section>
										<hr />
										<div className='d-flex justify-content-start'>
											<form onSubmit={e => onSubmit(e)}>
												<button
													className='btn btn-sm btn-primary'
													onClick={() => {
														// console.log(game);
														const addGame = {
															...singleGame,
															gameID: game.id,
															slug: game.slug,
															title: game.name ? game.name : 'game',
															link1: game.url,
															imageURL: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
															owner: user?.uid,
															lastModified: Date.now(),
														};
														setSingleGame(addGame);
													}}
												>
													Add
												</button>
											</form>
											<a href={game.url} target='_blank' rel='noreferrer'>
												<button className='btn btn-sm btn-success mx-1'>
													View More
												</button>
											</a>
										</div>
									</Popover.Body>
								</Popover>
							}
						>
							<img
								src={
									game?.cover?.image_id
										? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
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

export default FetchedGames;
