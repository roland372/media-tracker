//? <----- React ----->
import React, { useState, useEffect } from 'react';

//? <----- Firebase ----->
import EmotesDataService from '../services/emotes.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../context/UserAuthContext';

//? <----- Components ----->
import CardComponent from '../../Layout/CardComponent';
import Loader from '../../Layout/Loader';
import { toast } from 'react-toastify';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const EmotesList = () => {
	useDocumentTitle('Emotes');
	const { user } = useUserAuth();

	//* Initialize emote object
	const [emote, setEmote] = useState({
		name: '',
		url: '',
	});

	const [loading, setLoading] = useState(<Loader />);
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

	const emoteAddedNotfication = () =>
		toast.success('Emote Added', {
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

	//* Input handlers
	const handleSetName = e => {
		setEmote({ ...emote, name: e.target.value });
	};

	const handleSetURL = e => {
		setEmote({ ...emote, url: e.target.value });
	};

	const handleClick = url => {
		navigator.clipboard.writeText(url);
		copiedToClipboardNotification(url);
	};

	const onSubmit = async e => {
		e.preventDefault();
		try {
			emotesDatabase?.[0]?.emotes.push({ ...emote });

			await EmotesDataService.updateEmote(user?.uid, emotesDatabase[0]);
			console.log('emote added to database');
			// console.log(emotesDatabase?.[0]?.emotes);

			emoteAddedNotfication();
			getEmotesDatabase(user?.uid);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getEmotesDatabase(user?.uid);
	}, [user?.uid]);

	return (
		<CardComponent title='Discord Emotes'>
			<form onSubmit={e => onSubmit(e)}>
				<div className='mx-2'>
					<h4>Add Emote</h4>
					<input
						type='text'
						className='form-control mb-2'
						placeholder='Name'
						onChange={e => handleSetName(e)}
					/>
					<input
						type='text'
						className='form-control mb-2'
						placeholder='URL'
						onChange={e => handleSetURL(e)}
					/>
					<button className='btn btn-success'>Add Emote</button>
				</div>
			</form>
			<section className='d-flex align-items-center justify-content-start flex-wrap'>
				{emotesDatabase?.[0]?.emotes?.map((emote, index) => (
					<div key={index} className='mx-2'>
						<img
							src={emote.url}
							alt=''
							width='56px'
							onClick={() => handleClick(emote.url)}
						/>
					</div>
				))}
			</section>
		</CardComponent>
	);
};

export default EmotesList;
