const SubmitButton = props => {
	return (
		<div className='d-flex align-items-center justify-content-lg-start mt-3'>
			<button className={`btn btn-${props.color}`} onClick={props.onClick}>
				{props.text}
			</button>
		</div>
	);
};

export default SubmitButton;
