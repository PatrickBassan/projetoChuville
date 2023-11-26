import { render } from '@testing-library/react'
import Table from '../../../components/GridComponents/Table'

test('renders Table', () => {
  const { container } = render(<Table />);
  const table = container.querySelector('table');
  expect(table).toBeInTheDocument();
})
