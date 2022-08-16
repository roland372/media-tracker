import { screen, render } from '@testing-library/react';
// import Homepage from './Homepage';
import CardComponent from '../Layout/CardComponent';

it('should render same text passed into title prop', () => {
	render(<CardComponent title='Welcome to Media-Tracker' />);
	const headingElement = screen.getByText('Welcome to Media-Tracker');
	expect(headingElement).toBeInTheDocument();
});
