import { FC } from 'react';

//? <----- TypeScript ----->
type TProps = {
	children: JSX.Element | JSX.Element[];
};

const Container: FC<TProps> = ({ children }): JSX.Element => {
	return (
		<main className='bg-primary-dark text-color text-center pt-1 pb-1 d-flex flex-column min-vh-100'>
			<div className='container'>{children}</div>
		</main>
	);
};

export default Container;
