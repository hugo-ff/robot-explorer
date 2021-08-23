import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';

test('renders without error', () => {
	const testID = 'mainLayout';
	render(<MainLayout />);
	const view = screen.getByTestId(testID);
	expect(view).toBeInTheDocument();
});
