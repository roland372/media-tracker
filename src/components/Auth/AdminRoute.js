import { Navigate } from 'react-router-dom';

//? <----- Auth ----->
import { useUserAuth } from '../../context/UserAuthContext';

const AdminRoute = ({ children }) => {
	const { user } = useUserAuth();

	// user && console.log('User in Private Route: ', user.email, user.uid);
	if (user?.uid !== process.env.REACT_APP_adminID) {
		return <Navigate replace to='/emotes' />;
	}
	return children;
};

export default AdminRoute;
