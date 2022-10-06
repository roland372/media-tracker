import { useState, useEffect, FC } from 'react';

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

//? <----- TypeScript ----->
type TProps = {
	children: JSX.Element | JSX.Element[];
};

const Layout: FC<TProps> = ({ children }): JSX.Element => {
	const { observe, width } = useDimensions({});

	const auth = getAuth();
	const [userData, setUserData] = useState();

	useEffect(() => {
		onAuthStateChanged(auth, (user: any) => {
			if (user) {
				const currentUser = user;
				setUserData(currentUser);
			}
		});
	}, [auth]);

	return (
		<>
			<ScrollToTop />
			<Theme
				primaryDark={'#12232e'}
				primaryMedium={'#203647'}
				primaryLight={'#023e8a'}
				secondaryMedium={'#284155'}
				secondaryLight={'#4da8da'}
				textColor={'#ffffff'}
				linkColor={'#0dcaf0'}
			/>
			<section className='sticky-top' ref={observe}>
				{width < 1200 ? (
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
