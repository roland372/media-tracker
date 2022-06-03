import React from 'react';

const Container = ({children}) => {
	return (
		<main className='bg-primary-dark text-color text-center pt-1 pb-1 d-flex flex-column min-vh-100'>
			<div className='container'>{children}</div>
		</main>
	);
};

export default Container;
