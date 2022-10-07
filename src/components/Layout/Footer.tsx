import { FC } from 'react';

const Footer: FC = (): JSX.Element => {
	return (
		<div className='d-flex flex-column'>
			<footer
				className='footer mt-auto pt-3 bg-secondary-medium'
				style={{
					borderTop: '3px solid var(--bg-secondary-light)',
				}}
			>
				<div className='container'>
					<div className='text-color mx-2'>
						<p>© {new Date().getFullYear()} Media-Tracker</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
