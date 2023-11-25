import React from "react"
import axios from "axios"
import { FaTrash, FaEdit } from "react-icons/fa"
import { toast } from "react-toastify"
import { getPeriodTerm } from "../helpers/fgperiodhelper.js"
import Table from "./GridComponents/Table.js"
import Tbody from "./GridComponents/Tbody.js"
import Td from "./GridComponents/Td.js"
import Th from "./GridComponents/Th.js"
import Thead from "./GridComponents/Thead.js"
import Tr from "./GridComponents/Tr.js"

const Grid = ({ forecasts, setForecasts, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item)
    }

    const handleDelete = async (cd) => {
        await axios.delete("http://localhost:8800/forecast", {
            params: { cd }
        })
        .then(({ data }) => {
            const newArray = forecasts.filter((forecast) => forecast.cdforecast !== cd)

            setForecasts(newArray)
            toast.success(data)
        })
        .catch(({ data }) => toast.error(data))

        setOnEdit(null)
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>CEP</Th>
                    <Th>Previsão</Th>
                    <Th onlyWeb>Período</Th>
                    <Th onlyWeb>Data</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {forecasts.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.cepregion}</Td>
                        <Td width="30%">{Math.floor(item.probability)}%</Td>
                        <Td width="20%" onlyWeb>
                            {getPeriodTerm(item.fgperiod)}
                        </Td>
                        <Td width="20%" onlyWeb>
                            {item.dtstart.split('T')[0]}
                        </Td>
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.cdforecast)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}

export default Grid