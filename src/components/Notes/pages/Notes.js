//? <----- Router ----->
import { Route, Routes } from 'react-router-dom';

//? <----- Components ----->
import AddNote from './AddNote';
import EditNote from './EditNote';
import ViewNote from './ViewNote';
import NotesList from './NotesList';

const Notes = () => {
	return (
		<Routes>
			<Route path='/' element={<NotesList />} />
			<Route path='add-note' element={<AddNote />} />
			<Route path='edit-note/:id' element={<EditNote />} />
			<Route exact path=':id' element={<ViewNote />} />
		</Routes>
	);
};

export default Notes;
