//? <----- Router ----->
import { Route, Routes } from 'react-router-dom';

//? <----- Components ----->
import EditEmotes from './EditEmotes';
import EmotesList from './EmotesList';
import AdminRoute from '../../Auth/AdminRoute';

const Notes = () => {
	return (
		<Routes>
			<Route path='/' element={<EmotesList />} />
			<Route
				path='edit'
				element={
					<AdminRoute>
						<EditEmotes />
					</AdminRoute>
				}
			/>
		</Routes>
	);
};

export default Notes;
