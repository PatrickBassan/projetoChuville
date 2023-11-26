import { render } from '@testing-library/react'
import Label from '../../../components/FormComponents/Label'

test('renders Label', () => {
  const { container } = render(<Label />);
  const label = container.querySelector('label');
  expect(label).toBeInTheDocument();
})
