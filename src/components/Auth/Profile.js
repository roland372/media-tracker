import React, { useState, useEffect } from 'react';

//? <----- Router ----->
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

//? <----- User Auth ----->
import { useUserAuth } from '../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../Layout/CardComponent';
import DeleteAccount from './DeleteAccount';
import Loader from '../Layout/Loader';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Button from '../Layout/Button';

//? <----- Firebase ----->
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebaseConfig';

import UserDataService from './services/user.services';
import AnimeDataService from '../../components/Media/Anime/services/anime.services';
import CharactersDataService from '../../components/Media/Characters/services/characters.services';
import GamesDataService from '../../components/Media/Games/services/games.services';
import MangaDataService from '../../components/Media/Manga/services/manga.services';
import EmotesDataService from '../../components/Emotes/services/emotes.services';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Profile = () => {
	useDocumentTitle('Profile');

	const { logOut, user } = useUserAuth();

	const navigate = useNavigate();

	//* <----- Loading State ----->
	const [loading, setLoading] = useState(false);

	//* <----- Database State ----->
	const [animeDatabase, setAnimeDatabase] = useState([]);
	const [charactersDatabase, setCharactersDatabase] = useState([]);
	const [gamesDatabase, setGamesDatabase] = useState([]);
	const [mangaDatabase, setMangaDatabase] = useState([]);
	const [emotesDatabase, setEmotesDatabase] = useState([]);

	//* <----- User State ----->
	const [name, setName] = useState('');
	const [photo, setPhoto] = useState(null);
	const [photoURL, setPhotoURL] = useState(
		'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
	);
	const [profileColor, setProfileColor] = useState('');
	const [description, setDescription] = useState('');

	const [usersDatabase, setUsersDatabase] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);

	const [
		deleteFlag,
		// setDeleteFlag
	] = useState(false);

	//* <----- Modal State ----->
	const [showModal, setShowModal] = useState(false);

	//* <----- Toast Notifications ----->
	const profileUpdatedNotification = () =>
		toast.success('Profile Updated', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const fileUploadNotification = () =>
		toast.success('Avatar Uploaded', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	const loggedOutNotification = () =>
		toast.success('Logged Out', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	//* <----- Modal functions ----->
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	//* <----- Upload image ----->
	const upload = async (file, currentUser, setLoading) => {
		const imageRef = ref(storage, currentUser.uid + '.png');
		setLoading(true);
		await uploadBytes(imageRef, file).then(() => {
			getDownloadURL(imageRef)
				.then(url => {
					setPhotoURL(url);
				})
				.catch(err => {
					console.log(err);
				});
			setPhotoURL(null);
		});
		const photoURL = await getDownloadURL(imageRef);
		updateProfile(user, { photoURL: photoURL });
		setLoading(false);
		fileUploadNotification();
	};

	//* <----- Fetch user data from database ----->
	useEffect(() => {
		user && getAnimeDatabase(user?.uid);
		user && getCharactersDatabase(user?.uid);
		user && getGamesDatabase(user?.uid);
		user && getMangaDatabase(user?.uid);
		user && getEmotesDatabase(user?.uid);
		user && getUsersDatabase();
		// user && getCurrentUser();
		// if (user && user.photoURL) {
		// 	setPhotoURL(user.photoURL);
		// }
		// or
		if (user?.photoURL) {
			setPhotoURL(user.photoURL);
		}
	}, [user]);

	//* <----- Get currently logged in user ----->
	const getUsersDatabase = async () => {
		const data = await UserDataService.getAllUsers();
		setUsersDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	useEffect(() => {
		const getCurrentUser = () => {
			const currentUser = usersDatabase.filter(u => u.uid === user.uid);
			setName(currentUser[0]?.name);
			setDescription(currentUser[0]?.description);
			setProfileColor(currentUser[0]?.color);
			setCurrentUser(currentUser);
		};

		getCurrentUser();
	}, [usersDatabase, user.uid]);

	//* <----- Get user collections from database ----->
	const getAnimeDatabase = async userId => {
		const data = await AnimeDataService.getAllAnime(userId);
		setAnimeDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	const getCharactersDatabase = async userId => {
		const data = await CharactersDataService.getAllCharacters(userId);
		setCharactersDatabase(
			data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
		);
	};

	const getGamesDatabase = async userId => {
		const data = await GamesDataService.getAllGames(userId);
		setGamesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	const getMangaDatabase = async userId => {
		const data = await MangaDataService.getAllManga(userId);
		setMangaDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	const getEmotesDatabase = async userId => {
		const data = await EmotesDataService.getAllEmotes(userId);
		setEmotesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
	};

	//* <----- Handler functions ----->
	const handleLogout = async () => {
		try {
			await logOut();
			loggedOutNotification();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleFileChange = e => {
		if (e.target.files[0]) {
			setPhoto(e.target.files[0]);
		}
	};

	const handleFileUpload = () => {
		upload(photo, user, setLoading);
	};

	const handleProfileUpdate = async e => {
		e.preventDefault();

		currentUser[0].name = name;
		currentUser[0].description = description;
		currentUser[0].color = profileColor;
		try {
			await UserDataService.updateUser(currentUser[0].id, currentUser?.[0]);
			profileUpdatedNotification();
			setShowModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	// const handleDeleteAccount = () => {
	// 	setDeleteFlag(true);
	// 	//* Reauthenticate user
	// };

	//* <----- Color Themes ----->
	// const color = getComputedStyle(document.documentElement).getPropertyValue(
	// 	'--bg-primary-dark'
	// );

	// console.log(color);

	const blueTheme = {
		primaryDark: '#12232e',
		primaryMedium: '#203647',
		primaryLight: '#023e8a',
		secondaryMedium: '#284155',
		secondaryLight: '#4da8da',
		textColor: '#ffffff',
		linkColor: '#0dcaf0',
	};

	const grayTheme = {
		primaryDark: '#1c1c1c',
		primaryMedium: '#343434',
		primaryLight: '#696969',
		secondaryMedium: '#555555',
		secondaryLight: '#7c7c7c',
		textColor: '#ffffff',
		linkColor: '#0dcaf0',
	};

	const beigeTheme = {
		primaryDark: '#a67a5b',
		primaryMedium: '#c19770',
		primaryLight: '#e8dcb5',
		secondaryMedium: '#d5b895',
		secondaryLight: '#faf0dc',
		textColor: '#000000',
		linkColor: '#0800ff',
	};

	const randomColor1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor2 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor3 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor4 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor5 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor6 = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const randomColor7 = '#' + Math.floor(Math.random() * 16777215).toString(16);

	const randomTheme = {
		primaryDark: randomColor1,
		primaryMedium: randomColor2,
		primaryLight: randomColor3,
		secondaryMedium: randomColor4,
		secondaryLight: randomColor5,
		textColor: randomColor6,
		linkColor: randomColor7,
	};

	//* <----- Color Themes State ----->
	const [theme, setTheme] = useState(() => {
		const localTheme = JSON.parse(localStorage.getItem('themes'));
		return localTheme || blueTheme;
	});

	const setColor = theme => {
		document.documentElement.style.setProperty(
			'--bg-primary-dark',
			theme.primaryDark
		);
		document.documentElement.style.setProperty(
			'--bg-primary-medium',
			theme.primaryMedium
		);
		document.documentElement.style.setProperty(
			'--bg-primary-light',
			theme.primaryLight
		);
		document.documentElement.style.setProperty(
			'--bg-secondary-medium',
			theme.secondaryMedium
		);
		document.documentElement.style.setProperty(
			'--bg-secondary-light',
			theme.secondaryLight
		);
		document.documentElement.style.setProperty('--text-color', theme.textColor);
		document.documentElement.style.setProperty('--link-color', theme.linkColor);
		setTheme(theme);
	};

	//* when theme is changing, update it in local storage
	useEffect(() => {
		localStorage.setItem('themes', JSON.stringify(theme));
		setColor(theme);
	}, [theme]);

	//* <----- Backup ----->
	//* right click object in chrome console, select "set as global variable", it'll return "temp1"
	//* after that type copy(temp1) and it'll copy it to clipboard
	// console.log(animeDatabase?.[0]?.anime);
	// console.log(mangaDatabase?.[0]?.manga);
	// console.log(gamesDatabase?.[0]?.games);
	// console.log(charactersDatabase?.[0]?.characters);
	// console.log(emotesDatabase?.[0]?.emotes);

	return (
		<div>
			{deleteFlag ? (
				<DeleteAccount
					animeDatabase={animeDatabase}
					usersDatabase={usersDatabase}
				/>
			) : (
				<CardComponent title='Profile'>
					<Modal show={showModal} onHide={handleCloseModal}>
						<Modal.Header
							closeButton
							closeVariant='white'
							className='bg-primary-light text-color'
						>
							<Modal.Title>Edit Profile</Modal.Title>
						</Modal.Header>
						<Modal.Body className='bg-primary-dark text-color'>
							<form onSubmit={e => handleProfileUpdate(e)}>
								<div>
									<div>Name</div>
									<input
										type='text'
										className='form-control'
										maxLength='20'
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</div>
								<br />
								<div>
									<div>Edit Avatar</div>
									<div className='d-flex justify-content-between'>
										<input
											type='file'
											className='form-control-file'
											onChange={handleFileChange}
										/>
										<button
											disabled={loading || !photo}
											className='btn btn-primary shadow-none'
											onClick={handleFileUpload}
										>
											upload
										</button>
									</div>
									<div>Uploaded file</div>
									<img src={photoURL} alt='avatar' width='100px' />
								</div>
								<br />
								<div>
									<div>Profile Color</div>
									<div className='d-flex'>
										<input
											type='color'
											name=''
											id=''
											// value={currentUser?.[0]?.color}
											defaultValue={currentUser?.[0]?.color}
											onChange={e => setProfileColor(e.target.value)}
										/>
										<div className='mx-2'>
											New Color:{' '}
											<span
												className='p-1'
												style={{ backgroundColor: profileColor }}
											>
												{profileColor}
											</span>
										</div>
									</div>
								</div>
								<div>
									<div>Description</div>
									<textarea
										style={{ maxHeight: '150px' }}
										type='text'
										className='form-control'
										maxLength='150'
										value={description}
										// value={getCurrentUser()?.description}
										onChange={e => setDescription(e.target.value)}
									/>
									<div className='d-flex justify-content-end pt-3'>
										<Button
											color='warning'
											onClick={() => {}}
											text='Save changes'
										/>
									</div>
								</div>
							</form>
							<hr />
							{/* <Link
						to='/delete-account'
						className='btn btn-danger'
						onClick={handleDeleteAccount}
					>
						Delete Account
					</Link> */}
							{/* <Button color="danger" onClick={handleDeleteAccount} text="Delete Account" /> */}
						</Modal.Body>
					</Modal>
					{usersDatabase.length === 0 ? (
						<Loader />
					) : (
						<section>
							<h5 className='py-2'>Welcome {user && user.email}</h5>
							<section className='py-2 mx-2'>
								<div className='d-flex justify-content-center align-items-center'>
									<div className='col col-lg-6 mb-4 mb-lg-0'>
										<div className='bg-primary-dark mb-3 rounded'>
											<div className='row g-0'>
												<div
													className='col-md-4 text-center text-color'
													style={{
														borderTopLeftRadius: '0.3rem',
														borderBottomLeftRadius: '0.3rem',
														// backgroundColor: `${currentUser?.[0]?.color}`,
														backgroundColor: `${profileColor}`,
													}}
												>
													<img
														src={photoURL}
														alt='Avatar'
														className='img-fluid my-5 rounded-circle'
														style={{ width: '80px' }}
													/>
													<div className='px-3 text-break'>
														<h5>{name}</h5>
														{description ? <p>{description}</p> : null}
													</div>
												</div>
												<div className='col-md-8'>
													<div className='p-4'>
														<h6>Information</h6>
														<hr className='mt-0 mb-4' />
														<div className='row pt-1'>
															<div className='col-12 mb-3'>
																<h6>Email</h6>
																<p className='text-color'>{user.email}</p>
															</div>
														</div>
														<h6>Database</h6>
														<hr className='mt-0 mb-4' />
														<div className='row pt-1'>
															<div className='col-6 mb-3'>
																<h6>
																	<Link
																		to='/media/anime'
																		className='text-color'
																	>
																		Anime
																	</Link>
																</h6>
																<p className='text-color'>
																	{animeDatabase?.[0]?.anime?.length}
																	{''} Anime
																</p>
															</div>
															<div className='col-6 mb-3'>
																<h6>
																	<Link
																		to='/media/characters'
																		className='text-color'
																	>
																		Characters
																	</Link>
																</h6>
																<p className='text-color'>
																	{charactersDatabase?.[0]?.characters?.length}
																	{''} Characters
																</p>
															</div>
															<div className='col-6 mb-3'>
																<h6>
																	<Link
																		to='/media/games'
																		className='text-color'
																	>
																		Games
																	</Link>
																</h6>
																<p className='text-color'>
																	{gamesDatabase?.[0]?.games?.length}
																	{''} Games
																</p>
															</div>
															<div className='col-6 mb-3'>
																<h6>
																	<Link
																		to='/media/manga'
																		className='text-color'
																	>
																		Manga
																	</Link>
																</h6>
																<p className='text-color'>
																	{mangaDatabase?.[0]?.manga?.length}
																	{''} Manga
																</p>
															</div>
															<div className='col-6 mb-3'>
																<h6>
																	<Link to='/emotes' className='text-color'>
																		Emotes
																	</Link>
																</h6>
																<p className='text-color'>
																	{emotesDatabase?.[0]?.emotes?.length}
																	{''} Emotes
																</p>
															</div>
														</div>
														<h6>Color Themes</h6>
														<hr className='mt-0 mb-4' />
														<div className='pt-1 d-flex justify-content-start'>
															<div className='mb-3 mx-2'>
																<button
																	className='btn btn-sm text-light shadow-none'
																	style={{ backgroundColor: '#023e8a' }}
																	onClick={() => setColor(blueTheme)}
																>
																	Blue
																</button>
															</div>
															<div className='mb-3 mx-2'>
																<button
																	className='btn btn-sm text-light shadow-none'
																	style={{ backgroundColor: '#343434' }}
																	onClick={() => setColor(grayTheme)}
																>
																	Gray
																</button>
															</div>
															<div className='mb-3 mx-2'>
																<button
																	className='btn btn-sm text-light shadow-none'
																	style={{ backgroundColor: '#c19770' }}
																	onClick={() => setColor(beigeTheme)}
																>
																	Beige
																</button>
															</div>
															<div className='mb-3 mx-2'>
																<button
																	className='btn btn-sm text-dark bg-rainbow shadow-none'
																	onClick={() => setColor(randomTheme)}
																>
																	Random
																</button>
															</div>
														</div>
														<h6>Settings</h6>
														<hr className='mt-0 mb-4' />
														<div className='row pt-1'>
															<div className='col-6 mb-3'>
																<button
																	className='btn btn-sm btn-warning shadow-none'
																	onClick={handleShowModal}
																>
																	Edit Profile
																</button>
															</div>
															<div className='col-6 mb-3'>
																<button
																	className='btn btn-sm btn-primary shadow-none'
																	onClick={handleLogout}
																>
																	Log Out
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</section>
						</section>
					)}
					<div className='text-center d-flex flex-column align-items-center justify-content-center'>
						{/* <pre> {JSON.stringify(user, null, 2)}</pre> */}
					</div>
				</CardComponent>
			)}
		</div>
	);
};

export default Profile;
