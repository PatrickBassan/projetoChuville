import { render } from '@testing-library/react'
import InputArea from '../../../components/FormComponents/InputArea'

test('renders InputArea', () => {
  const { container } = render(<InputArea />);
  const div = container.querySelector('div');
  expect(div).toBeInTheDocument();
})
