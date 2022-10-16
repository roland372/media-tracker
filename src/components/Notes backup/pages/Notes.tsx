//? <----- Router ----->
import { Route, Routes } from 'react-router-dom';

//? <----- Components ----->
import AddNote from './AddNote';
import EditNote from './EditNote';
import ViewNote from './ViewNote';
import NotesList from './NotesList';
import { FC } from 'react';

const Notes: FC = (): JSX.Element => {
	return (
		<Routes>
			<Route path='/' element={<NotesList />} />
			<Route path='add-note' element={<AddNote />} />
			<Route path='edit-note/:id' element={<EditNote />} />
			<Route path=':id' element={<ViewNote />} />
		</Routes>
	);
};

export default Notes;
