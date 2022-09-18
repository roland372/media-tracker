import React from 'react';

//? <----- Components ----->
import { motion } from 'framer-motion';

const Button = ({ color, onClick, sm, text }) => {
	return (
		<motion.button
			className={`btn btn-${color} btn shadow-none ${sm ? 'btn-sm' : null}`}
			onClick={onClick}
			whileHover={{ scale: 1.1 }}
		>
			{text}
		</motion.button>
	);
};

export default Button;
