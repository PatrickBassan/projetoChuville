import GlobalStyle from "./styles/global"
import Container from "./components/Container.js"
import Title from "./components/Title.js"
import Form from "./components/Form.js"
import Grid from "./components/Grid"
import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import "react-toastify/dist/ReactToastify.css"

function App() {
    const [forecasts, setForecasts] = useState([])
    const [onEdit, setOnEdit] = useState(null)

    const getForecasts = async () => {
        let date = new Date()
        let dtstart = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate()
        try {
            const res = await axios.get("http://localhost:8800/forecast/forecasts", {params: {dtstart}})
            setForecasts(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)))
        } catch (error) {
            toast.error(error)
        }
    }

    useEffect(() => {
        getForecasts()
    }, [setForecasts])

    return (
        <>
            <Container>
                <Title>Insira e/ou edite previsões</Title>
                <Form onEdit={onEdit} setOnEdit={setOnEdit} getForecasts={getForecasts} />
                <Title>Remova previsões falso-positivas</Title>
                <Grid setOnEdit={setOnEdit} forecasts={forecasts} setForecasts={setForecasts} />
            </Container>
            <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
            <GlobalStyle />
        </>
    )
}

export default App