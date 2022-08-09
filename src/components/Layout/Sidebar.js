import React, { useState } from 'react';

//? <----- Router ----->
import { NavLink } from 'react-router-dom';

//? <----- Components ----->
import { Button, CloseButton } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Sidebar = ({ userData }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<nav className='navbar navbar-dark sticky-top bg-primary-dark'>
			<div className='container bg-primary-dark'>
				<NavLink className='navbar-brand' to='/'>
					<span className='text-color'>Media-Tracker</span>
				</NavLink>
				<div className='d-flex align-items-center'>
					{userData ? (
						<li className='px-2 list-unstyled'>
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
					<Button
						className='navbar-toggler bg-primary-dark'
						variant=''
						type='button'
						onClick={handleShow}
					>
						<span className='navbar-toggler-icon'></span>
					</Button>
				</div>

				<Offcanvas
					show={show}
					onHide={handleClose}
					placement='end'
					className='bg-primary-medium'
					scroll={false}
					backdrop={true}
				>
					<Offcanvas.Header className='bg-primary-dark'>
						<NavLink
							to='/'
							className='nav-link text-color ms-3'
							onClick={handleClose}
						>
							<Offcanvas.Title>Home</Offcanvas.Title>
						</NavLink>
						<CloseButton
							variant='white'
							className='me-2'
							onClick={handleClose}
						/>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<ul className='list-group text-start'>
							<li
								className='list-group-item bg-secondary-medium'
								key={1}
								onClick={handleClose}
							>
								<NavLink
									className='nav-link text-color text-capitalize'
									activeclassname='active-navbar'
									to='media/anime'
								>
									Anime
								</NavLink>
							</li>
							<li
								className='list-group-item bg-secondary-medium'
								key={2}
								onClick={handleClose}
							>
								<NavLink
									className='nav-link text-color text-capitalize'
									activeclassname='active-navbar'
									to='media/games'
								>
									Games
								</NavLink>
							</li>
							<li
								className='list-group-item bg-secondary-medium'
								key={3}
								onClick={handleClose}
							>
								<NavLink
									className='nav-link text-color text-capitalize'
									activeclassname='active-navbar'
									to='media/manga'
								>
									Manga
								</NavLink>
							</li>
							<li
								className='list-group-item bg-secondary-medium'
								key={4}
								onClick={handleClose}
							>
								<NavLink
									className='nav-link text-color text-capitalize'
									activeclassname='active-navbar'
									to='media/characters'
								>
									Characters
								</NavLink>
							</li>
							<li
								className='list-group-item bg-secondary-medium'
								key={5}
								onClick={handleClose}
							>
								<NavLink
									className='nav-link text-color text-capitalize'
									activeclassname='active-navbar'
									to='charts'
								>
									Charts
								</NavLink>
							</li>
							<li
								className='list-group-item bg-secondary-medium'
								key={6}
								onClick={handleClose}
							>
								<NavLink
									className='nav-link text-color text-capitalize'
									activeclassname='active-navbar'
									to='about'
								>
									About
								</NavLink>
							</li>
							<li
								className='list-group-item bg-secondary-medium'
								key={7}
								onClick={handleClose}
							>
								<NavLink
									className='nav-link text-color text-capitalize'
									activeclassname='active-navbar'
									to='profile'
								>
									Profile
								</NavLink>
							</li>
						</ul>
					</Offcanvas.Body>
				</Offcanvas>
			</div>
		</nav>
	);
};

export default Sidebar;
