import { render } from '@testing-library/react'
import Table from '../../../components/GridComponents/Table'
import Tbody from '../../../components/GridComponents/Tbody'
import Tr from '../../../components/GridComponents/Tr'
import Th from '../../../components/GridComponents/Th'

test('renders Th', () => {
    render(
        <Table>
            <Tbody>
                <Tr>
                    <Th/>
                </Tr>
            </Tbody>
        </Table>
    );
    const body = document.querySelector('Th');
    expect(body).toBeInTheDocument();
})
