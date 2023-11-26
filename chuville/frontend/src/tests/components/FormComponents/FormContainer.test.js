import { render } from '@testing-library/react'
import FormContainer from '../../../components/FormComponents/FormContainer'

test('renders FormContainer', () => {
  const { container } = render(<FormContainer />);
  const form = container.querySelector('form');
  expect(form).toBeInTheDocument();
})
