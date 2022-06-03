import React from 'react';

//? <----- Router ----->
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = () => {
	return (
		<div className='bg-primary-dark'>
			<Navbar sticky='top' variant='dark'>
				<Container>
					<Navbar.Brand>
						<Link className='navbar-brand' to='/'>
							Home
						</Link>
					</Navbar.Brand>
					<Navbar.Collapse>
						<Nav className='me-auto'>
							<li className='nav-item'>
								<NavLink
									to='media'
									className='nav-link'
									activeclassname='active-navbar'
								>
									Media
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
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavigationBar;
