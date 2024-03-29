//? <----- React ----->
import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import EmotesDataService from '../services/emotes.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../context/UserAuthContext';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../../Layout/CardComponent';
import Form from '../components/Form';
import Loader from '../../Layout/Loader';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from '../../Layout/Button';
import { copyImageToClipboard } from 'copy-image-clipboard';

//? <----- Icons ----->
import { AiFillStar } from 'react-icons/ai';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const EmotesList = () => {
	useDocumentTitle('Emotes');
	const { user } = useUserAuth();

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Modal functions ----->
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//* <----- Search state ----->
	const [searchValue, setSearchValue] = useState('');

	const [emotesDatabase, setEmotesDatabase] = useState([]);

	//* Notifications
	const copiedToClipboardNotification = emoteUrl =>
		toast.success(
			<div>
				<img src={emoteUrl} alt='' width='20px' className='me-1' />
				Copied to Clipboard
			</div>,
			{
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: '',
			}
		);

	//* fetch emotes from database
	const getEmotesDatabase = async userId => {
		const data = await EmotesDataService.getAllEmotes(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setEmotesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	// const handleClick = url => {
	// 	navigator.clipboard.writeText(url);
	// 	copiedToClipboardNotification(url);
	// };

	const handleClick = url => {
		copyImageToClipboard(url)
			.then(() => {
				// console.log('Image Copied');
				copiedToClipboardNotification(url);
			})
			.catch(e => {
				// console.log('Error: ', e.message);
				navigator.clipboard.writeText(url);
				copiedToClipboardNotification(url);
			});
	};

	useEffect(() => {
		getEmotesDatabase(user?.uid);
	}, [user?.uid]);

	return (
		<CardComponent title='Discord Emotes'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Add Emote</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<Form
						emotesDatabase={emotesDatabase}
						handleClose={handleClose}
						user={user}
					/>
				</Modal.Body>
			</Modal>
			{user?.uid === process.env.REACT_APP_adminID ? (
				<section>
					<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
						<span className='me-2'>
							<Button
								color='primary'
								onClick={() => handleShow()}
								text='Add Emote'
							/>
						</span>
						<Link className='' to='edit'>
							<Button color='warning' text='Edit Emotes' />
						</Link>
					</div>
					<div className='mx-2'>
						<hr />
					</div>
				</section>
			) : null}
			{loading ? (
				<Loader />
			) : (
				<section>
					{user?.uid === process.env.REACT_APP_adminID ? (
						<>
							<div className='mx-2 pb-1'>
								<h4>Favourite Emotes</h4>
							</div>
							<section className='d-flex align-items-center justify-content-between flex-wrap'>
								{emotesDatabase?.[0]?.emotes
									.sort((a, b) => (a.name > b.name ? 1 : -1))
									?.filter(emote => emote?.favourites)
									.map((emote, index) => (
										<div
											key={index}
											className='position-relative mb-3 flex-fill'
										>
											<OverlayTrigger
												placement='top'
												overlay={<Tooltip>{emote?.name}</Tooltip>}
											>
												<div className='position-relative mx-2 rounded bg-primary-dark p-2'>
													<img
														src={emote.url}
														alt=''
														height='64px'
														onClick={() => handleClick(emote.url)}
														role='button'
													/>
													<div className='position-absolute top-0 end-0'>
														{emote?.favourites ? (
															<AiFillStar
																size={25}
																className='text-warning rounded m-1'
															/>
														) : null}
													</div>
												</div>
											</OverlayTrigger>
										</div>
									))}
							</section>
							<hr />
						</>
					) : null}
					<div className='mx-2 pb-2'>
						<h4>All Emotes</h4>
					</div>
					<section className='mb-3 mx-2'>
						<input
							type='text'
							className='form-control'
							placeholder='Search for emote'
							value={searchValue}
							onChange={e => setSearchValue(e.target.value)}
						/>
					</section>
					<div className='d-flex align-items-center justify-content-between flex-wrap'>
						{emotesDatabase?.[0]?.emotes
							.sort((a, b) => (a.name > b.name ? 1 : -1))
							?.filter(emote =>
								emote?.name?.match(new RegExp(searchValue, 'i'))
							)
							.map((emote, index) => (
								<div key={index} className='position-relative mb-3 flex-fill'>
									<OverlayTrigger
										placement='top'
										overlay={<Tooltip>{emote?.name}</Tooltip>}
									>
										<div className='position-relative mx-2 rounded bg-primary-dark p-2'>
											<img
												src={emote.url}
												alt=''
												height='64px'
												onClick={() => handleClick(emote.url)}
												role='button'
											/>
											<div className='position-absolute top-0 end-0'>
												{emote?.favourites ? (
													<AiFillStar
														size={25}
														className='text-warning rounded m-1'
													/>
												) : null}
											</div>
										</div>
									</OverlayTrigger>
								</div>
							))}
						{/* {emotesDatabase?.[0]?.emotes?.map((emote, index) => (
						<div key={index} className='position-relative mb-3'>
							<OverlayTrigger
								placement='top'
								overlay={<Tooltip>{emote?.name}</Tooltip>}
							>
								<div className='position-relative mx-2 rounded bg-primary-dark p-2'>
									<img
										src={emote.url}
										alt=''
										width='56px'
										onClick={() => handleClick(emote.url)}
										role='button'
									/>
									<div className='position-absolute top-0 end-0'>
										{emote?.favourites ? (
											<AiFillStar
												size={25}
												className='text-warning rounded m-1'
											/>
										) : null}
									</div>
								</div>
							</OverlayTrigger>
						</div>
					))} */}
					</div>
				</section>
			)}
		</CardComponent>
	);
};

export default EmotesList;
