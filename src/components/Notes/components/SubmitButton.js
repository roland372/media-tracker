import Button from '../../Layout/Button';

const SubmitButton = props => {
	return (
		<div className='d-flex align-items-center justify-content-lg-start mt-3'>
			<Button color={props.color} onClick={props.onClick} text={props.text} />
		</div>
	);
};

export default SubmitButton;
