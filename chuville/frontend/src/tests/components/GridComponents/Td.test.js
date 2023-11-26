import { render } from '@testing-library/react'
import Table from '../../../components/GridComponents/Table'
import Tbody from '../../../components/GridComponents/Tbody'
import Tr from '../../../components/GridComponents/Tr'
import Td from '../../../components/GridComponents/Td'

test('renders Td', () => {
    render(
        <Table>
            <Tbody>
                <Tr>
                    <Td/>
                </Tr>
            </Tbody>
        </Table>
    );
    const body = document.querySelector('Td');
    expect(body).toBeInTheDocument();
})
