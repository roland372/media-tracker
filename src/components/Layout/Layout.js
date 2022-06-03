import React from 'react';

//? <----- Components ----->
import Container from './Container';
import Navbar from './NavigationBar';

const Layout = ({ children }) => {
	return (
		<>
			<section className='sticky-top'>
				<Navbar />
			</section>
			<Container>{children}</Container>
		</>
	);
};

export default Layout;
