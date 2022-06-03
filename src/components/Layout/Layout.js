import React from 'react';

//? <----- Components ----->
import Navbar from './NavigationBar';

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default Layout;
