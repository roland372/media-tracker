import  { FC } from 'react';

//? <----- TypeScript ----->
type TProps = {
	title: string;
	children?: JSX.Element | JSX.Element[];
};

const CardComponent: FC<TProps> = ({ title, children }): JSX.Element => {
	return (
		<section className='bg-primary-medium rounded-3 my-3 p-3 shadow'>
			<h3 className='bg-primary-light rounded-2 px-3 py-2 mx-2 text-center shadow'>
				{title}
			</h3>
			{children}
		</section>
	);
};

export default CardComponent;
