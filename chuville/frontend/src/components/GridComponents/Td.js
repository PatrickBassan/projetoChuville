import styled from "styled-components"

const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")}
    width: ${(props) => (props.width ? props.width : "auto")}

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`

export default Td;