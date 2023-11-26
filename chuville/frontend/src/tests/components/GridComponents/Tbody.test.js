import { render } from '@testing-library/react'
import Table from '../../../components/GridComponents/Table'
import Tbody from '../../../components/GridComponents/Tbody'

test('renders Tbody', () => {
  render(<Table><Tbody/></Table>);
  const body = document.querySelector('tbody');
  expect(body).toBeInTheDocument();
})
