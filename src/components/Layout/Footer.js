import React from 'react';

const Footer = () => {
	return (
		<div className='d-flex flex-column border-top'>
			<footer className='footer mt-auto py-3 bg-primary-dark'>
				<div className='container'>
					<div className='text-color mx-2'>
						<p>© {new Date().getFullYear()} Media-Tracker</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
