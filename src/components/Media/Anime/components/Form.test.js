import { screen, render, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form', () => {
	it("should display 'No Anime' text if anime array is empty", async () => {
		render(<Form />);

		const inputElement = screen.getByPlaceholderText('Enter Anime Title');
		expect(inputElement).toBeInTheDocument();
	});

	it('should be able to type in input field', async () => {
		render(<Form />);

		const inputElement = screen.getByPlaceholderText('Enter Anime Title');
		fireEvent.change(inputElement, { target: { value: 'hello' } });
		expect(inputElement.value).toBe('hello');
	});

	it('should submit value matching value from input', async () => {
		render(<Form />);

		const inputElement = screen.getByPlaceholderText('Enter Anime Title');
		const buttonElement = screen.getByRole('button', { name: 'Add' });
		fireEvent.change(inputElement, { target: { value: 'hello' } });
		fireEvent.click(buttonElement);
		expect(inputElement.value).toBe('hello');
	});
});
