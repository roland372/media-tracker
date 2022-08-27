//? <----- Redux ----->
import { useSelector } from 'react-redux';

//? <----- Components ----->
import { ProgressBar } from 'react-bootstrap';
import { BsFillCircleFill } from 'react-icons/bs';

const CharactersStats = () => {
	const charactersStore = useSelector(store => store.characters);
	const charactersDatabase = charactersStore?.characters;

	const sourceAnime = charactersDatabase?.filter(
		character => character.source === 'Anime'
	);

	const sourceGame = charactersDatabase?.filter(
		character => character.source === 'Game'
	);

	const sourceManga = charactersDatabase?.filter(
		character => character.source === 'Manga'
	);

	const favourites = charactersDatabase?.filter(
		character => character.favourites
	);

	return (
		<section className='mx-2'>
			<ProgressBar style={{ height: '30px' }}>
				<ProgressBar
					variant='success'
					now={sourceAnime?.length * 100}
					key={1}
				/>
				<ProgressBar variant='primary' now={sourceGame?.length * 100} key={2} />
				<ProgressBar
					variant='warning'
					now={sourceManga?.length * 100}
					key={3}
				/>
			</ProgressBar>
			<hr />
			<div className='d-flex justify-content-between'>
				<section className='text-start'>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-success' />
							<div className='ms-2'>Anime</div>
						</div>
						<span className='ms-4'>{sourceAnime?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-primary' />
							<div className='ms-2'>Game</div>
						</div>
						<span className='ms-4'>{sourceGame?.length}</span>
					</div>
					<div className='d-flex align-items-center justify-content-between'>
						<div className='d-flex align-items-center'>
							<BsFillCircleFill className='text-warning' />
							<div className='ms-2'>Manga</div>
						</div>
						<span className='ms-4'>{sourceManga?.length}</span>
					</div>
				</section>
				<section className='d-flex flex-column'>
					<div className='d-flex justify-content-between'>
						<div>Total Characters</div>
						<div className='ms-4'>{charactersDatabase?.length}</div>
					</div>
					<div className='d-flex justify-content-between'>
						<div>Favourites</div>
						<div className='ms-4'>{favourites?.length}</div>
					</div>
				</section>
			</div>
		</section>
	);
};

export default CharactersStats;
