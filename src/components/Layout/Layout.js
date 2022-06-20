import React, { useState, useEffect } from 'react';

//? <----- Components ----->
import Container from './Container';
import Footer from './Footer';
import Navbar from './NavigationBar';
import ScrollToTop from './ScrollToTop';
import Sidebar from './Sidebar';
import useDimensions from 'react-cool-dimensions';

//? <----- Auth ----->
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Theme from './Theme';

const Layout = ({ children }) => {
	const { observe, width } = useDimensions({});

	const auth = getAuth();
	const [userData, setUserData] = useState();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				const currentUser = user;
				setUserData(currentUser);
			}
		});
	}, [auth]);

	return (
		<>
			<ScrollToTop />
			<Theme />
			<section className='sticky-top' ref={observe}>
				{width < 600 ? (
					<Sidebar userData={userData} />
				) : (
					<Navbar userData={userData} />
				)}
			</section>
			<Container>{children}</Container>
			<Footer />
		</>
	);
};

export default Layout;
