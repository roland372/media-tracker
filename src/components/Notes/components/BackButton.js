//? <----- Router ----->
import { Link } from 'react-router-dom';

//? <----- Components ----->
import Button from '../../Layout/Button';

const BackButton = () => {
	return (
		<section className='text-color'>
			<div className='d-flex align-items-center justify-content-lg-start ms-2 pt-1'>
				<Link to='/notes'>
					<Button color='primary' text='Back to Notes' />
				</Link>
			</div>
			<div className='mx-2'>
				<hr />
			</div>
		</section>
	);
};

export default BackButton;
