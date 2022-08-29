//? <----- Router ----->
import { Link } from 'react-router-dom';

const BackButton = () => {
	return (
		<section className='text-color'>
			<div className='d-flex align-items-center justify-content-lg-start ms-2 pt-1'>
				<Link className='btn btn-primary' to='/notes'>
					Back to Notes
				</Link>
			</div>
			<div className='mx-2'>
				<hr />
			</div>
		</section>
	);
};

export default BackButton;