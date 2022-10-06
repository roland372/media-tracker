import React, { FC } from 'react';

//? <----- Components ----->
import { motion } from 'framer-motion';

//? <----- TypeScript ----->
type TProps = {
	color: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	sm?: boolean;
	text: string | JSX.Element;
};

// const Button: FC = ({ color, onClick, sm, text }: Props): JSX.Element => {
// const Button: FC = ({ color, onClick, sm, text }: Props): JSX.Element => {
const Button: FC<TProps> = ({ color, onClick, sm, text }): JSX.Element => {
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
