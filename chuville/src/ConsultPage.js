import { useState } from 'react';
import Select from "react-select";
import './ConsultPage.css';
import Results from "./predictions.js"
import { FiSearch } from 'react-icons/fi'

function ConsultPage() {

  const [cep, setCep] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState({
    cep: '89220-070',
    prediction: 'Altas chances de alagamento',
    time: 'Noite',
    reason: 'Intensas chuvas'
  });
  const cepOptions = [
      {value: 0, label: "89220-070"},
      {value: 1, label: "09530-210"},
      {value: 2, label: "83308-070"},
      {value: 3, label: "88045-108"}
  ];
  const timeOptions = [
    {value: 0, label: "Manhã"},
    {value: 1, label: "Tarde"},
    {value: 2, label: "Noite"}
  ];

  const handleCepChange = (selectedOption) => {
    setCep(selectedOption);
  }

  const handleTimeChange = (selectedOption) => {
    setTime(selectedOption);
  }

  const handleSearch = (cep, time) => {
    console.log(cep.label, time.label);
  }

  return (
    <div className="container">
      <h1 className='title'>Chuville</h1>
      <div className="containerInput">
        <table>
          <th>
            <Select className="select" options={cepOptions} onChange={handleCepChange}/>
          </th>
          <th>
            <Select className="select" options={timeOptions} onChange={handleTimeChange}/>
          </th>
          <th>
            <button className='buttonSearch'><FiSearch size={25} color="#FFF" onClick={handleSearch(cep, time)}/></button>
          </th>
        </table>
      </div>

      {Object.keys(cep).length > 0 && Object.keys(time).length > 0 && (
        <main className='main'>
          <h2>CEP: {result.cep}</h2>
          <span>Previsão: {result.prediction}</span>
          <span>Horário: {result.time}</span>
          <span>Justificativa: {result.reason}</span>
        </main>
      )}
    </div>
  );
}

export default ConsultPage;
