//? <----- Router ----->
import { useParams } from 'react-router-dom';

//? <----- Redux ----->
import { useSelector } from 'react-redux';
import CardComponent from '../../Layout/CardComponent';
import BackButton from '../components/BackButton';

const ViewNote = () => {
	const params = useParams();
	const notes = useSelector(store => store.notes);
	const currentNote = notes.filter(note => note.id === params.id);
	const { title, note, lastModified } = currentNote[0];

	return (
		<CardComponent title={title}>
			<BackButton />
			<section className='text-start mx-2'>
				<div className='text-muted'>Last Modified {lastModified}</div>
				<div>{note}</div>
			</section>
		</CardComponent>
	);
};

export default ViewNote;
