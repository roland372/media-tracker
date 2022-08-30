//? <----- Router ----->
import { Route, Routes } from 'react-router-dom';

//? <----- Components ----->
// import EditEmotes from './EditEmotes';
import EmotesList from './EmotesList';

const Notes = () => {
	return (
		<Routes>
			<Route path='/' element={<EmotesList />} />
			{/* <Route path='edit-notes' element={<EditEmotes />} /> */}
		</Routes>
	);
};

export default Notes;
