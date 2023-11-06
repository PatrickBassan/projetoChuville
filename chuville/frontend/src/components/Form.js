import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Select from "react-select";
import { getPeriodTerm } from "../helpers/fgperiodhelper.js"

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getForecasts, onEdit, setOnEdit }) => {
  const ref = useRef();
  const [cepOptions, setCepOptions] = useState([]);
  const [cep, setCep] = useState('');
  const [time, setTime] = useState('');
  const timeOptions = [
    {value: 0, label: "Manhã"},
    {value: 1, label: "Tarde"},
    {value: 2, label: "Noite"},
    {value: 3, label: "Madrugada"}
  ];

  const getCepOptions = async () => {
    try {
      const res = await axios.get("http://localhost:8800/regions");
      let list = res.data.sort((a, b) => (a.cdregion > b.cdregion ? 1 : -1));
      list = list.map(a => ({ value: a.cdregion, label: a.cepregion }));
      setCepOptions(list);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCepChange = (selectedOption) => {
    setCep(selectedOption);
  }

  const handleTimeChange = (selectedOption) => {
    setTime(selectedOption);
  }

  useEffect(() => {
    getCepOptions();
    if (onEdit) {
      const forecast = ref.current;

      setCep({value: onEdit.cdregion, label: onEdit.cepregion});
      forecast.probability.value = Math.floor(onEdit.probability);
      setTime({value: onEdit.fgperiod, label: getPeriodTerm(onEdit.fgperiod)});
      forecast.dtstart.value = onEdit.dtstart.split('T')[0];
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const forecast = ref.current;

    if (
      !forecast.cepregion.value ||
      !forecast.probability.value ||
      !forecast.period.value ||
      !forecast.dtstart.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          cepregion: forecast.cepregion.value,
          probability: forecast.probability.value,
          period: forecast.period.value,
          dtstart: forecast.dtstart.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          cepregion: forecast.cepregion.value,
          probability: forecast.probability.value,
          period: forecast.period.value,
          dtstart: forecast.dtstart.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    forecast.cepregion.value = "";
    forecast.probability.value = "";
    forecast.period.value = "";
    forecast.dtstart.value = "";

    setOnEdit(null);
    getForecasts();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>CEP</Label>
        <Select name="cepregion" value={cep} options={cepOptions} onChange={handleCepChange} />
      </InputArea>
      <InputArea>
        <Label>Previsão</Label>
        <Input name="probability" />
      </InputArea>
      <InputArea>
        <Label>Data</Label>
        <Input name="dtstart" type="date" />
      </InputArea>
      <InputArea>
        <Label>Período</Label>
        <Select name="period" value={time} options={timeOptions} onChange={handleTimeChange} />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;