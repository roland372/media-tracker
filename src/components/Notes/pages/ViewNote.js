//? <----- Router ----->
import { Link, useParams } from 'react-router-dom';

//? <----- Redux ----->
import { useSelector } from 'react-redux';
import CardComponent from '../../Layout/CardComponent';

const ViewNote = () => {
	const params = useParams();
	const notes = useSelector(store => store.notes);
	const currentNote = notes.filter(note => note.id === params.id);
	const { title, note, lastModified } = currentNote[0];
	console.log(title);

	return (
		<CardComponent title={title}>
			<section className='text-color'>
				<div className='d-flex align-items-center justify-content-lg-start ms-2 pt-1'>
					<Link className='btn btn-primary' to='/notes'>
						Back to Notes
					</Link>
				</div>
				<div className='mx-2'>
					<hr />
				</div>
			</section>
			<section className='text-start mx-2'>
				<div className='text-muted'>Last Modified {lastModified}</div>
				<div>{note}</div>
			</section>
		</CardComponent>
	);
};

export default ViewNote;
