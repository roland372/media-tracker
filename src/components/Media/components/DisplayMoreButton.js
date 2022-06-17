import React from 'react';

//? <----- Icons ----->
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const DisplayMoreButton = ({ displayMore, menuItems, setDisplayMore }) => {
	return (
		<>
			{menuItems.length > 20 ? (
				displayMore ? (
					<button
						className='btn bg-light mt-3'
						onClick={() => setDisplayMore(!displayMore)}
					>
						Display Less <AiOutlineUp />
					</button>
				) : (
					<button
						className='btn bg-light mt-3'
						onClick={() => setDisplayMore(!displayMore)}
					>
						Display All <AiOutlineDown />
					</button>
				)
			) : null}
		</>
	);
};

export default DisplayMoreButton;
