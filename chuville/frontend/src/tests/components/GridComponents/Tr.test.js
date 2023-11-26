import { render } from '@testing-library/react'
import Table from '../../../components/GridComponents/Table'
import Tbody from '../../../components/GridComponents/Tbody'
import Tr from '../../../components/GridComponents/Tr'

test('renders Tr', () => {
    render(
        <Table>
            <Tbody>
                <Tr/>
            </Tbody>
        </Table>
    );
    const body = document.querySelector('Tr');
    expect(body).toBeInTheDocument();
})
