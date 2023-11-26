import { render } from '@testing-library/react'
import Button from '../../../components/FormComponents/Button'

test('renders button', () => {
  const { container } = render(<Button />);
  const botao = container.querySelector('button');
  expect(botao).toBeInTheDocument();
})
