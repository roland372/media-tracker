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
import EditForm from '../components/EditForm';
import EmoteImage from '../components/EmoteImage';
import Loader from '../../Layout/Loader';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from '../../Layout/Button';

//? <----- Icons ----->
import { AiOutlineEdit, AiFillStar } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const EditEmotes = () => {
	useDocumentTitle('Edit Emotes');

	const { user } = useUserAuth();

	const [emoteID, setEmoteID] = useState('');

	//* <----- Loading state ----->
	const [loading, setLoading] = useState(<Loader />);

	//* <----- Modal state ----->
	const [show, setShow] = useState(false);

	//* <----- Delete modal state ----->
	const [showDelete, setShowDelete] = useState(false);

	//* <----- Delete modal functions ----->
	const handleShowDelete = id => {
		setEmoteID(id);

		setShowDelete(true);
	};
	const handleCloseDelete = () => setShowDelete(false);

	//* <----- Modal functions ----->
	const handleShow = id => {
		setEmoteID(id);
		setShow(true);
	};
	const handleClose = () => setShow(false);

	//* <----- Search state ----->
	const [searchValue, setSearchValue] = useState('');

	const [emotesDatabase, setEmotesDatabase] = useState([]);

	//* Notifications
	const emoteDeletedNotfication = () =>
		toast.success('Emote Deleted', {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: '',
		});

	//* fetch emotes from database
	const getEmotesDatabase = async userId => {
		const data = await EmotesDataService.getAllEmotes(userId);
		// console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setEmotesDatabase(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		setLoading(false);
	};

	const handleDeleteEmote = async id => {
		const filteredEmotes = emotesDatabase?.[0]?.emotes?.filter(
			emote => emote.id !== id
		);

		emotesDatabase[0].emotes = filteredEmotes;

		await EmotesDataService.updateEmote(user?.uid, emotesDatabase[0]);
		emoteDeletedNotfication();
		getEmotesDatabase(user?.uid);
		setLoading(false);
	};

	useEffect(() => {
		getEmotesDatabase(user?.uid);
	}, [user?.uid]);

	return (
		<CardComponent title='Edit Emotes'>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Edit Emote</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					<EditForm
						handleClose={handleClose}
						emotesDatabase={emotesDatabase}
						id={emoteID}
						getEmotesDatabase={getEmotesDatabase}
						user={user}
					/>
				</Modal.Body>
			</Modal>
			<Modal show={showDelete} onHide={handleCloseDelete}>
				<Modal.Header
					closeButton
					closeVariant='white'
					className='bg-primary-light text-color'
				>
					<Modal.Title>Deleting emote</Modal.Title>
				</Modal.Header>
				<Modal.Body className='bg-primary-dark text-color'>
					Are you sure you want to delete this emote?
					<EmoteImage id={emoteID} emotesDatabase={emotesDatabase} />
				</Modal.Body>
				<Modal.Footer className='bg-primary-dark text-color'>
					<Button color='warning' onClick={handleCloseDelete} text='Cancel' />
					<Button
						color='danger'
						onClick={() => {
							handleDeleteEmote(emoteID);
							handleCloseDelete();
						}}
						text='Delete'
					/>
				</Modal.Footer>
			</Modal>
			<section>
				<div className='d-flex align-items-center justify-content-start mx-2 pt-1'>
					<Link className='btn btn-primary' to='/emotes'>
						Back to Emotes
					</Link>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<section className='mb-2 mx-2'>
				<input
					type='text'
					className='form-control'
					placeholder='Search for emote'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>
			</section>
			{loading ? (
				<Loader />
			) : (
				<section className='d-flex align-items-center justify-content-between flex-wrap'>
					{emotesDatabase?.[0]?.emotes
						.sort((a, b) => (a.name > b.name ? 1 : -1))
						?.filter(emote => emote?.name?.match(new RegExp(searchValue, 'i')))
						.map((emote, index) => (
							<div
								key={index}
								className='mx-2 rounded bg-primary-dark p-2 mb-3 position-relative flex-fill'
							>
								<div className='mt-1'>
									<OverlayTrigger
										placement='top'
										overlay={
											<Tooltip>
												<div>
													<div>{emote?.name}</div>
													{/* <div>{emote?.url}</div> */}
												</div>
											</Tooltip>
										}
									>
										<div className='mx-2 rounded bg-primary-dark p-2'>
											<img src={emote.url} alt='' height='64px' />
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
								<div>
									<Button
										onClick={() => handleShow(emote?.id)}
										sm
										text={<AiOutlineEdit size={20} className='text-success' />}
									/>
									<Button
										onClick={() => handleShowDelete(emote?.id)}
										sm
										text={<BsTrash size={20} className='text-danger' />}
									/>
								</div>
							</div>
						))}
				</section>
			)}
		</CardComponent>
	);
};

export default EditEmotes;
