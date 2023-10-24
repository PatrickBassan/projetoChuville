import { useEffect, useState } from 'react';
import Select from "react-select";
import './ConsultPage.css';
import { FiSearch } from 'react-icons/fi';
import { GoAlert } from 'react-icons/go';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ConsultPage() {
  const [cep, setCep] = useState('');
  const [cepOptions, setCepOptions] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [result, setResult] = useState({});
  const timeOptions = [
    {value: 0, label: "Manhã"},
    {value: 1, label: "Tarde"},
    {value: 2, label: "Noite"},
    {value: 3, label: "Madrugada"}
  ];

  const getCepOptions = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
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
  
  const handleSearch = async (cep, time) => {
    try {
      const res = await axios.get("http://localhost:8800");
      let list = res.data.sort((a, b) => (a.cdregion > b.cdregion ? 1 : -1));
      list = list.map(a => ({ prediction: a.cdregion, cep: a.cepregion }));
      setResult(list);
      setShowResults(true);
    } catch (error) {
      setShowEmpty(true);
    }
  }
  
  useEffect(() => {
    getCepOptions();
  }, [setCepOptions]);

  return (
    <div className="container">
      <h1 className='title'>Chuville</h1>
      <h3 className='subtitle'> Selecione o CEP, dia e período que deseja consultar a previsão de alagamento</h3>
      <div className="containerInput">
          <Select className="select" options={cepOptions} onChange={handleCepChange}/>
          <DatePicker className="datePicker" selected={date} onChange={(date) => setDate(date)} />
          <Select className="select" options={timeOptions} onChange={handleTimeChange}/>
          <button className='buttonSearch'><FiSearch size={25} color="#FFF" onClick={() => handleSearch(cep, time)}/></button>
      </div>

      {showResults && (
        <main className='main'>
          <h2>CEP: {result.cep}</h2>
          <span>Previsão: {result.prediction}</span>
          <span>Horário: {result.time}</span>
          <span>Justificativa: {result.reason}</span>
        </main>
      )}

      {showEmpty && (
        <main className='main'>
          <GoAlert size={35}></GoAlert>
          <h2 className='warning'>Não foram encontradas previsões para o período selecionado!</h2>
        </main>
      )}
    </div>
  );
}

export default ConsultPage;