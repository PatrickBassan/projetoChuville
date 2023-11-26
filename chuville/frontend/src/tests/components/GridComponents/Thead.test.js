import { render } from '@testing-library/react'
import Table from '../../../components/GridComponents/Table'
import Thead from '../../../components/GridComponents/Thead'

test('renders Td', () => {
    render(
        <Table>
            <Thead/>
        </Table>
    );
    const body = document.querySelector('Thead');
    expect(body).toBeInTheDocument();
})
