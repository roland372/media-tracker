import React from 'react';

//? <----- Components ----->
import Container from './Container';
import Footer from './Footer';
import Navbar from './NavigationBar';
import ScrollToTop from './ScrollToTop';

const Layout = ({ children }) => {
	return (
		<>
			<ScrollToTop />
			<section className='sticky-top'>
				<Navbar />
			</section>
			<Container>{children}</Container>
			<Footer />
		</>
	);
};

export default Layout;
