import React, { useState } from 'react';

//? <----- Components ----->
import FetchedMedia from '../../components/FetchedMedia';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../Layout/Button';

const FetchedCharacters = ({
	charactersDatabase,
	CharactersDataService,
	fetchedCharacters,
	getCharactersDatabase,
	user,
}) => {
	const [singleCharacter, setSingleCharacter] = useState({
		favourites: false,
		gender: 'Female',
		hairColor: '',
		id: uuidv4(),
		imageURL: '',
		lastModified: Date.now(),
		link1: '',
		link1Name: 'MAL',
		link2: '',
		link2Name: 'Wiki',
		mal_id: '',
		name: '',
		owner: user?.uid,
		series: '',
		source: 'Anime',
	});

	const characterAddedNotification = () =>
		toast.success('Character Added', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	// const [characterSource, setCharacterSource] = useState('');

	// const fetchSource = async id => {
	// 	const source = await fetch(`https://api.jikan.moe/v4/characters/${id}/full`)
	// 		.then(res => res.json())
	// 		.catch(err => console.log(err));

	// 	setCharacterSource(source.data);
	// };

	const onSubmit = async e => {
		e.preventDefault();

		try {
			charactersDatabase?.[0]?.characters.push({
				...singleCharacter,
			});

			await CharactersDataService.updateCharacter(
				user?.uid,
				charactersDatabase[0]
			);

			await getCharactersDatabase(user?.uid);
			console.log('character added to database');
			singleCharacter.id = uuidv4();
			characterAddedNotification();
		} catch (error) {
			console.log(error);
		}
	};

	if (fetchedCharacters?.length === 0)
		return (
			<FetchedMedia cardTitle='Searched Characters'>
				<h5 className='mx-2 text-center'>No Characters Found</h5>
			</FetchedMedia>
		);

	return (
		<FetchedMedia cardTitle='Searched Characters'>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{fetchedCharacters?.map(character => (
					<section className='p-2' key={character.mal_id}>
						<OverlayTrigger
							trigger='click'
							placement='auto'
							rootClose={true}
							overlay={
								<Popover>
									<Popover.Header>{character.name}</Popover.Header>
									<Popover.Body onClick={() => document.body.click()}>
										{character.about ? (
											<>
												<section>
													<div>
														About:{' '}
														{typeof character.about === 'string'
															? character.about.slice(0, 200) + '...'
															: character.about}
													</div>
												</section>
												<hr />
											</>
										) : null}
										<div className='d-flex justify-content-start'>
											<form onSubmit={e => onSubmit(e)}>
												<Button
													color='primary'
													onClick={() => {
														const addCharacter = {
															...singleCharacter,
															mal_id: character.mal_id,
															name: character.name
																? character.name
																: 'character',
															link1: character.url,
															imageURL: character.images.jpg.image_url,
															owner: user?.uid,
															lastModified: Date.now(),
														};
														setSingleCharacter(addCharacter);
													}}
													sm
													text='Add'
												/>
											</form>
											<a
												href={character.url}
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
									character.images.jpg.image_url
										? character.images.jpg.image_url
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

export default FetchedCharacters;
