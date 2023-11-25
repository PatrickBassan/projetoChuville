import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { GoAlert } from 'react-icons/go'
import { toast, ToastContainer } from 'react-toastify'
import { getPeriodTerm } from "./helpers/fgperiodhelper.js"
import Select from "react-select"
import axios from 'axios'
import './styles/ConsultPage.css'
import Input from "./components/FormComponents/Input.js"


function ConsultPage() {
    const [cep, setCep] = useState('')
    const [cepOptions, setCepOptions] = useState([])
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [showEmpty, setShowEmpty] = useState(false)
    const [result, setResult] = useState({})
    const timeOptions = [
        {value: 1, label: "Manhã"},
        {value: 2, label: "Tarde"},
        {value: 3, label: "Noite"},
        {value: 4, label: "Madrugada"}
    ]

    const getCepOptions = async () => {
        try {
            const res = await axios.get("http://localhost:8800/regions")
            let list = res.data.sort((a, b) => (a.cdregion > b.cdregion ? 1 : -1))
            list = list.map(a => ({ value: a.cdregion, label: a.cepregion }))
            setCepOptions(list)
        } catch (error) {
            toast.error(error)
        }
    }

    const handleCepChange = (selectedOption) => {
        setCep(selectedOption)
    }

    const handleTimeChange = (selectedOption) => {
        setTime(selectedOption)
    }
    
    const handleDateChange = (event) => {
        setDate(event.target.value )
    }

    const handleResult = (show) => {
        setShowEmpty(!show)
        setShowResults(show)
    }

    const handleSearch = async (cdregion, time, dtstart) => {

        if (!cdregion || !time || !dtstart) {
            return toast.warn("Preencha todos os campos!")
        }

        try {
            const res = await axios.get("http://localhost:8800/forecast", {
                params: {
                    cdregion,
                    time,
                    dtstart
                },
            })

            if(res.data.length > 0) {
                setResult(res.data[0])
                handleResult(true)
            } else {
                handleResult(false)
            }
            toast.success("Sucesso")
        } catch (error) {
            handleResult(false)
            toast.error("Ocorreu um erro inesperado ao consultar")
        }
    }

    useEffect(() => {
        getCepOptions()
    }, [setCepOptions])

    return (
        <div className="container">
            <h1 className='title'>Chuville</h1>
            <h3 className='subtitle'> Selecione o CEP, dia e período que deseja consultar a previsão de alagamento</h3>
            <div className="containerInput">
                <Select className="select" id="cepSel" options={cepOptions} onChange={handleCepChange} placeholder={"CEP"} />
                <Input className="select" id="dateSel" name="dtstart" type="date" onChange={handleDateChange} />
                <Select className="select" id="timeSel" options={timeOptions} onChange={handleTimeChange} placeholder={"Período"}/>
                <button className='buttonSearch'>
                    <FiSearch size={25} color="#FFF" onClick={() => handleSearch(cep.value, time.value, date)}/>
                </button>
            </div>

            {showResults && (
                <main className='main'>
                    <h2>CEP: {result.cepregion}</h2>
                    <span style={{color: "red"}}>Chance de alagamento: {Math.floor(result.probability)}%</span>
                    <span>Dia: {result.dtstart.split('T')[0]}</span>
                    <span>Período: {getPeriodTerm(result.fgperiod)}</span>
                </main>
            )}

            {showEmpty && (
                <main className='main'>
                    <GoAlert size={35}></GoAlert>
                    <h2 className='warning'>Não foram encontradas previsões para o período selecionado!</h2>
                </main>
            )}
            <ToastContainer autoClose={1000} position={toast.POSITION.BOTTOM_LEFT} />
        </div>
    )
}

export default ConsultPage