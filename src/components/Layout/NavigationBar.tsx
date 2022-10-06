import { FC } from 'react';

//? <----- Router ----->
import { Link, NavLink } from 'react-router-dom';

//? <----- Components ----->
import { navLinks } from './Links';
import { Navbar, Container, Nav } from 'react-bootstrap';

//? <----- TypeScript ----->
type TProps = {
	userData: any;
};

const NavigationBar: FC<TProps> = ({ userData }): JSX.Element => {
	const normalRoute = navLinks.filter(link => link.route === 'normal');
	const protectedRoute = navLinks.filter(link => link.route !== 'admin');

	const routeType = () => {
		if (userData?.uid === process.env.REACT_APP_adminID) {
			return navLinks;
		} else if (userData) {
			return protectedRoute;
		} else {
			return normalRoute;
		}
	};

	return (
		<div className='bg-primary-dark'>
			<Navbar
				// expand='lg'
				sticky='top'
				variant='dark'
			>
				<Container>
					<Navbar.Brand>
						<Link className='navbar-brand' to='/'>
							<span className='text-color'>Media-Tracker</span>
						</Link>
					</Navbar.Brand>
					<Navbar.Collapse>
						<Nav className='me-auto'>
							{routeType()
								.slice(1)
								.map((link, index) => {
									const { url, text } = link;
									return (
										<li className='nav-item' key={index}>
											<NavLink to={url} className='nav-link'>
												<span className='text-capitalize text-color'>
													{text}
												</span>
											</NavLink>
										</li>
									);
								})}

							{/* {navLinks.slice(1, 7).map((link, index) => {
								const { url, text } = link;
								return (
									<li className='nav-item' key={index}>
										<NavLink to={url} className='nav-link'>
											<span className='text-capitalize text-color'>{text}</span>
										</NavLink>
									</li>
								);
							})}
							{userData?.uid === process.env.REACT_APP_adminID
								? navLinks.slice(7, 9).map((link, index) => {
										const { url, text } = link;
										return (
											<li className='nav-item' key={index}>
												<NavLink to={url} className='nav-link'>
													<span className='text-capitalize text-color'>
														{text}
													</span>
												</NavLink>
											</li>
										);
								  })
								: null}
							{navLinks.slice(9).map((link, index) => {
								const { url, text } = link;
								return (
									<li className='nav-item' key={index}>
										<NavLink to={url} className='nav-link'>
											<span className='text-capitalize text-color'>{text}</span>
										</NavLink>
									</li>
								);
							})} */}
							{/* {navLinks.map((link, index) => {
								const { url, text, route } = link;
								if (route === 'normal') {
									return route === 'normal' ? (
										<li className='nav-item' key={index}>
											<NavLink to={url} className='nav-link'>
												<span className='text-capitalize text-color'>
													{text}
												</span>
											</NavLink>
										</li>
									) : null;
								} else if (route === 'protected') {
									return route === 'protected' ? (
										<li className='nav-item' key={index}>
											<NavLink to={url} className='nav-link'>
												<span className='text-capitalize text-color'>
													{text}
												</span>
											</NavLink>
										</li>
									) : null;
								}
							})} */}
							{userData?.photoURL ? (
								<li className='px-2 d-flex align-items-center'>
									<NavLink to={'/profile'}>
										<img
											src={userData?.photoURL}
											width='40px'
											className='rounded-circle'
											alt=''
										/>
									</NavLink>
								</li>
							) : (
								<li className='px-2 d-flex align-items-center'>
									<NavLink to={'/profile'}>
										<img
											src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
											width='40px'
											className='rounded-circle'
											alt=''
										/>
									</NavLink>
								</li>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavigationBar;
