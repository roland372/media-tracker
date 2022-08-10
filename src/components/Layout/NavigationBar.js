import React from 'react';

//? <----- Router ----->
import { Link, NavLink } from 'react-router-dom';

//? <----- Components ----->
import { navLinks } from './Links';
import { Navbar, Container, Nav } from 'react-bootstrap';

const NavigationBar = ({ userData }) => {
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
							{navLinks.slice(1).map(link => {
								const { id, url, text } = link;
								return (
									<li className='nav-item' key={id}>
										<NavLink to={url} className='nav-link'>
											<span className='text-capitalize text-color'>{text}</span>
										</NavLink>
									</li>
								);
							})}
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
