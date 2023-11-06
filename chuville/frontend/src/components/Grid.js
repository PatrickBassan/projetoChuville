import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { getPeriodTerm } from "../helpers/fgperiodhelper.js"

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ forecasts, setForecasts, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (cd) => {
    await axios.delete("http://localhost:8800/forecast", {
      params: {
        cd
      },
    })
      .then(({ data }) => {
        const newArray = forecasts.filter((user) => user.cd !== cd);

        setForecasts(newArray);
        toast.success(data);
        // to-do: recarregar somente a grid
        window.location.reload()
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

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
  );
};

export default Grid;