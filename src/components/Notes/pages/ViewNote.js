//? <----- React ----->
import { useEffect, useState } from 'react';

//? <----- Firebase ----->
import NotesDataService from '../services/notes.services';

//? <----- User Auth ----->
import { useUserAuth } from '../../../context/UserAuthContext';

//? <----- Router ----->
import { useParams } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../../Layout/CardComponent';
import BackButton from '../components/BackButton';

//? <----- Custom Hooks ----->
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const ViewNote = () => {
	const { id } = useParams();
	const { user } = useUserAuth();

	const [singleNoteDatabase, setSingleNoteDatabase] = useState({});

	const filteredNote = singleNoteDatabase?.notes?.filter(
		note => note?.id === id
	);

	useDocumentTitle(filteredNote?.[0]?.title);

	useEffect(() => {
		const getSingleNoteDatabase = async () => {
			const data = await NotesDataService?.getNote(user?.uid);
			setSingleNoteDatabase(data?.data());
		};
		getSingleNoteDatabase();
	}, [user?.uid]);

	return (
		<CardComponent title={filteredNote?.[0]?.title}>
			<BackButton />
			<section className='text-start mx-2 '>
				<div className='text-muted'>
					Last Modified:{' '}
					{new Date(filteredNote?.[0]?.lastModified).toLocaleDateString(
						'en-GB',
						{
							hour: '2-digit',
							minute: '2-digit',
						}
					)}
				</div>
				<hr />
				<div
					dangerouslySetInnerHTML={{
						__html: filteredNote?.[0]?.note,
					}}
				/>
				{/* <div>{filteredNote?.[0]?.note}</div> */}
			</section>
		</CardComponent>
	);
};

export default ViewNote;
