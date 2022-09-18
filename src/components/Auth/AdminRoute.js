//? <----- Auth ----->
import { useUserAuth } from '../../context/UserAuthContext';

//? <----- Components ----->
import NotFound from '../../pages/NotFound';

const AdminRoute = ({ children }) => {
	const { user } = useUserAuth();

	// user && console.log('User in Private Route: ', user.email, user.uid);
	if (user?.uid !== process.env.REACT_APP_adminID) {
		// return <Navigate replace to='/' />;
		return <NotFound />;
	}
	return children;
};

export default AdminRoute;
