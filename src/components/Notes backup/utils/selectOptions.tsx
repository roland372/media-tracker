//? <----- TypeScript ----->
type TColorOptions = {
	value: string;
	label: JSX.Element;
};

// export const colorOptions: { value: string; label: JSX.Element }[] = [
export const colorOptions: TColorOptions[] = [
	{ value: 'primary', label: <div className='text-primary'>primary</div> },
	{
		value: 'secondary',
		label: <div className='text-secondary'>secondary</div>,
	},
	{ value: 'success', label: <div className='text-success'>success</div> },
	{ value: 'danger', label: <div className='text-danger'>danger</div> },
	{ value: 'warning', label: <div className='text-warning'>warning</div> },
	{ value: 'info', label: <div className='text-info'>info</div> },
	{ value: 'light', label: <div className='text-light bg-dark'>light</div> },
	{ value: 'dark', label: <div className='text-dark'>dark</div> },
	{ value: 'muted', label: <div className='text-muted'>muted</div> },
];
