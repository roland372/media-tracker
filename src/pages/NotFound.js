import React from 'react';

//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import CardComponent from '../components/Layout/CardComponent';

const NotFound = () => {
	return (
		<CardComponent title='404 Not Found'>
			<div className='vh-100 d-flex align-items-center justify-content-center'>
				<div>
					<h1>Oops!</h1>
					<br />
					<h3>The page you are looking for was not found.</h3>
					<hr />
					<Link to='/' className='btn btn-primary'>
						Return Home
					</Link>
				</div>
			</div>
		</CardComponent>
	);
};

export default NotFound;
