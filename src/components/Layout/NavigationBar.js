import React from 'react';

//? <----- Router ----->
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = ({ userData }) => {
	return (
		<div className='bg-primary-dark border-bottom'>
			<Navbar sticky='top' variant='dark'>
				<Container>
					<Navbar.Brand>
						<Link className='navbar-brand' to='/'>
							Media-Tracker
						</Link>
					</Navbar.Brand>
					<Navbar.Collapse>
						<Nav className='me-auto' variant='pills'>
							<li className='nav-item'>
								<NavLink
									to='media/anime'
									className='nav-link'
									activeclassname='active-navbar'
								>
									Anime
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='media/games'
									className='nav-link'
									activeclassname='active-navbar'
								>
									Games
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='media/manga'
									className='nav-link'
									activeclassname='active-navbar'
								>
									Manga
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='charts'
									className='nav-link'
									activeclassname='active-navbar'
								>
									Charts
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='about'
									className='nav-link'
									activeclassname='active-navbar'
								>
									About
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink
									to='profile'
									className='nav-link'
									activeclassname='active-navbar'
								>
									Profile
								</NavLink>
							</li>
							{userData ? (
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
							) : null}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavigationBar;
