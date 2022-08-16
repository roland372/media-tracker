import { screen, render } from '@testing-library/react';
import AllAnime from './AllAnime';

it("should display 'No Anime' text if anime array is empty", async () => {
	render(<AllAnime allAnime={[]} />);

	const headingElement = await screen.findByText('No Anime');
	expect(headingElement).toBeInTheDocument();
});
