import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  color: white;
`;

function App() {
  const [forecasts, setForecasts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getForecasts = async () => {
    try {
      const res = await axios.get("http://localhost:8800/forecast/forecasts");
      setForecasts(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getForecasts();
  }, [setForecasts]);

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
  );
}

export default App;