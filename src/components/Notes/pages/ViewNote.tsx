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

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

//? <----- TypeScript ----->
type TNote = {
	color: string;
	id: string;
	lastModified: number;
	note: string;
	noteID: string;
	title: string;
};

type TNotes = {
	loading: boolean;
	notes: TNote[];
	error: string | undefined;
};

type TStore = {
	notes: TNotes;
};

const ViewNote = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const notes = useSelector((store: TStore) => store.notes);
	const currentNote = notes?.notes?.filter(
		(note: TNote) => note?.noteID === params?.id
	);
	// const { title, note, lastModified } = currentNote[0];

	useEffect(() => {
		dispatch(fetchNotes());
	}, [dispatch]);

	// console.log(currentNote?.[0]?.note);

	useDocumentTitle(currentNote[0]?.title);

	return (
		<CardComponent title={currentNote[0]?.title}>
			<BackButton />
			<section className='text-start mx-2 '>
				<div className='text-muted'>
					Last Modified:{' '}
					{new Date(currentNote[0]?.lastModified).toLocaleDateString('en-GB', {
						hour: '2-digit',
						minute: '2-digit',
					})}
				</div>
				<hr />
				<div
					dangerouslySetInnerHTML={{
						__html: currentNote[0]?.note,
					}}
				/>
				{/* <div>{currentNote[0]?.note}</div> */}
			</section>
		</CardComponent>
	);
};

export default ViewNote;
