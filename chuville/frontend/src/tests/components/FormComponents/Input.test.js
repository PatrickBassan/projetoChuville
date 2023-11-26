import { render } from '@testing-library/react'
import Input from '../../../components/FormComponents/Input'

test('renders Input', () => {
  const { container } = render(<Input />);
  const input = container.querySelector('input');
  expect(input).toBeInTheDocument();
})
