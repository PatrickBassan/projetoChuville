import { render } from '@testing-library/react'
import Title from '../../components/Title'

test('renders Title', () => {
    const { container } = render(<Title />);
    const title = container.querySelector('h2');
    expect(title).toBeInTheDocument();
})
