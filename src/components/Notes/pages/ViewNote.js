//? <----- React ----->
import { useEffect } from 'react';

//? <----- Router ----->
import { useParams } from 'react-router-dom';

//? <----- Redux ----->
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../../../features/notes/noteSlice';

//? <----- Components ----->
import CardComponent from '../../Layout/CardComponent';
import BackButton from '../components/BackButton';

const ViewNote = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const notes = useSelector(store => store.notes);
	const currentNote = notes?.notes?.filter(note => note?.noteID === params?.id);
	// const { title, note, lastModified } = currentNote[0];

	useEffect(() => {
		dispatch(fetchNotes());
	}, [dispatch]);

	return (
		<CardComponent title={currentNote[0]?.title}>
			<BackButton />
			<section className='text-start mx-2'>
				<div className='text-muted'>
					Last Modified:{' '}
					{new Date(currentNote[0]?.lastModified).toLocaleDateString('en-GB', {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</div>
				<div>{currentNote[0]?.note}</div>
			</section>
		</CardComponent>
	);
};

export default ViewNote;
