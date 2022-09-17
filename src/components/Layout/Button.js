import React from 'react';

const Button = ({ color, onClick, sm, text }) => {
	return (
		<button
			className={`btn btn-${color} shadow-none ${sm ? 'btn-sm' : null}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
