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

//? <----- Icons ----->
import { AiOutlineEdit } from 'react-icons/ai';
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
					<button
						className='btn btn-warning shadow-none'
						onClick={handleCloseDelete}
					>
						Cancel
					</button>
					<button
						className='btn btn-danger shadow-none'
						onClick={() => {
							handleDeleteEmote(emoteID);
							handleCloseDelete();
						}}
					>
						Delete
					</button>
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
			{loading ? (
				<Loader />
			) : (
				<section className='d-flex align-items-center justify-content-start flex-wrap'>
					{emotesDatabase?.[0]?.emotes?.map((emote, index) => (
						<div key={index} className='mx-2 rounded bg-primary-dark p-2'>
							<div className='mt-1'>
								<OverlayTrigger
									placement='top'
									overlay={<Tooltip>{emote?.name}</Tooltip>}
								>
									<img src={emote.url} alt='' width='56px' />
								</OverlayTrigger>
							</div>
							<div>
								<button
									className='btn btn-sm shadow-none'
									onClick={() => handleShow(emote?.id)}
								>
									<AiOutlineEdit size={20} className='text-success' />
								</button>
								<button
									className='btn btn-sm shadow-none'
									// onClick={() => handleDeleteEmote(emote?.id)}
									onClick={() => handleShowDelete(emote?.id)}
								>
									<BsTrash size={20} className='text-danger' />
								</button>
							</div>
						</div>
					))}
				</section>
			)}
		</CardComponent>
	);
};

export default EditEmotes;
