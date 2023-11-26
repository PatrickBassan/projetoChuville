import { render } from '@testing-library/react'
import Container from '../../components/Container'

test('renders Container', () => {
    const { container } = render(<Container />);
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
})
