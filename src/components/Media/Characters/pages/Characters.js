import { useState, useEffect } from 'react';

//? <----- Redux ----->
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharactersDatabase } from '../../../../features/characters/charactersSlice';

//? <----- Firebase ----->
import CharactersDataService from '../services/characters.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../../context/UserAuthContext';

//? <----- Components ----->
import AllCharacters from '../components/AllCharacters';
import CardComponent from '../../../Layout/CardComponent';
import Form from '../components/Form';
import { Modal } from 'react-bootstrap';
import RecentCharacters from '../components/RecentCharacters';
import FavouriteCharacters from '../components/FavouriteCharacters';
import CharactersStats from '../components/CharactersStats';
import Loader from '../../../Layout/Loader';
import FetchedCharacters from '../components/FetchedCharacters';

//? <----- Icons ----->
import { AiOutlineSearch } from 'react-icons/ai';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../../hooks/useDocumentTitle';

const Characters = () => {
	useDocumentTitle('Characters');

	const dispatch = useDispatch();
	const characters = useSelector(store => store.characters);
	const charactersStore = [...characters?.characters];
	console.log(charactersStore?.[0]?.characters);

	// console.log(characters?.characters?.[0]?.characters);

	const { user } = useUserAuth();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [charactersDatabase, setCharactersDatabase] = useState([]);

	//* fetch data from database
	// const getCharactersDatabase = async userId => {
	// 	setLoading(true);
	// 	const data = await CharactersDataService.getAllCharacters(userId);
	// 	// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	// 	setCharactersDatabase(
	// 		data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
	// 	);
	// 	setLoading(false);
	// };
	// console.log(charactersDatabase);

	// const deleteCharacter = async id => {
	// 	setLoading(true);

	// 	const filteredArray = charactersDatabase?.[0]?.characters?.filter(
	// 		character => character.id !== id
	// 	);

	// 	charactersDatabase[0].characters = filteredArray;

	// 	await CharactersDataService.updateCharacter(
	// 		user?.uid,
	// 		charactersDatabase[0]
	// 	);
	// 	getCharactersDatabase(user?.uid);
	// 	setLoading(false);
	// };

	// const getCharacters = () => {
	// 	dispatch(fetchCharactersDatabase());
	// };

	useEffect(() => {
		setLoading(true);
		dispatch(fetchCharactersDatabase(user?.uid));
		setLoading(false);
	}, [dispatch, user?.uid]);

	// useEffect(() => {
	// 	getCharactersDatabase(user?.uid);
	// }, [user?.uid]);

	//* fetch characters from API
	const [charactersList, setCharactersList] = useState([]);
	const [search, setSearch] = useState('');

	const handleSearch = e => {
		e.preventDefault();

		fetchCharacters(search);
	};

	const fetchCharacters = async query => {
		const temp = await fetch(
			`https://api.jikan.moe/v4/characters?q=${query}&order_by=favorites&sort=desc`
		).then(res => res.json());

		setCharactersList(temp.data);
	};

	return (
		<>
			<CardComponent title='Characters'>
				<Modal show={show} onHide={handleClose}>
					<Modal.Header
						closeButton
						closeVariant='white'
						className='bg-primary-light text-color'
					>
						<Modal.Title>Add Character</Modal.Title>
					</Modal.Header>
					<Modal.Body className='bg-primary-dark text-color'>
						{/* <Form
							// charactersDatabase={charactersDatabase}
							charactersDatabase={characters?.characters}
							getCharactersDatabase={getCharactersDatabase}
							handleClose={handleClose}
							user={user}
						/> */}
					</Modal.Body>
				</Modal>

				<section className='text-color'>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<button className='btn btn-primary' onClick={() => handleShow()}>
							Add Character
						</button>
						<div className='mx-2'>or</div>
						<form onSubmit={handleSearch}>
							<div className='d-flex'>
								<input
									className='form-control'
									type='search'
									placeholder='Search for a Character'
									required
									value={search}
									onChange={e => setSearch(e.target.value)}
									onSubmit={e => setSearch(e.target.value)}
								/>
								<button className='btn btn-primary'>
									<AiOutlineSearch size={20} />
								</button>
							</div>
						</form>
					</div>
					<div className='mx-2'>
						<hr />
					</div>
				</section>
			</CardComponent>
			{/* {search ? (
				<FetchedCharacters
					charactersDatabase={charactersDatabase}
					CharactersDataService={CharactersDataService}
					fetchedCharacters={charactersList}
					getCharactersDatabase={getCharactersDatabase}
					user={user}
				/>
			) : null} */}

			{loading ? (
				<Loader />
			) : (
				<>
					<CardComponent title='Character Stats'>
						<CharactersStats
							// charactersDatabase={charactersDatabase?.[0]?.characters}
							charactersDatabase={characters?.characters?.[0]?.characters}
						/>
					</CardComponent>

					<AllCharacters
						allCharacters={characters?.characters?.[0]?.characters}
						// allCharacters={characters?.characters?.[0]?.characters}
						// deleteCharacter={deleteCharacter}
						// getCharactersDatabase={getCharactersDatabase}
						user={user}
					/>
					<hr />

					{/* <RecentCharacters
						allCharacters={charactersDatabase?.[0]?.characters}
						deleteCharacter={deleteCharacter}
						getCharactersDatabase={getCharactersDatabase}
						user={user}
					/>
					<hr /> */}

					{/* <FavouriteCharacters
						allCharacters={charactersDatabase?.[0]?.characters}
						deleteCharacter={deleteCharacter}
						getCharactersDatabase={getCharactersDatabase}
						user={user}
					/> */}
				</>
			)}
		</>
	);
};

export default Characters;
