import { FC } from 'react';
import Button from '../../Layout/Button';

//? <----- TypeScript ----->
type TProps = {
	color: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	text: string;
};

const SubmitButton: FC<TProps> = ({ color, onClick, text }): JSX.Element => {
	return (
		<div className='d-flex align-items-center justify-content-lg-start mt-3'>
			<Button color={color} onClick={onClick} text={text} />
		</div>
	);
};

export default SubmitButton;
