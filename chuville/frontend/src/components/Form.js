import React, { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { getPeriodTerm } from "../helpers/fgperiodhelper.js"
import Select from "react-select"
import axios from "axios"
import FormContainer from "./FormComponents/FormContainer.js"
import Button from "./FormComponents/Button.js"
import Input from "./FormComponents/Input.js"
import InputArea from "./FormComponents/InputArea.js"
import Label from "./FormComponents/Label.js"

const Form = ({ getForecasts, onEdit, setOnEdit }) => {
    const ref = useRef()
    const [cepOptions, setCepOptions] = useState([])
    const [cep, setCep] = useState('')
    const [time, setTime] = useState('')
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

    useEffect(() => {
        getCepOptions()
        if (onEdit) {
            const forecast = ref.current

            setCep({value: onEdit.cdregion, label: onEdit.cepregion})
            forecast.probability.value = Math.floor(onEdit.probability)
            setTime({value: onEdit.fgperiod, label: getPeriodTerm(onEdit.fgperiod)})
            forecast.dtstart.value = onEdit.dtstart.split('T')[0]
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const forecast = ref.current

        if (
            !forecast.cepregion.value || !forecast.probability.value ||
            !forecast.period.value || !forecast.dtstart.value
        ) {
            return toast.warn("Preencha todos os campos!")
        }

        if (isNaN(forecast.probability.value)) {
            return toast.warn("Valor da probabilidade inválido!")
        }

        if (onEdit) {
            await axios.put("http://localhost:8800/forecast", {
                cdregion: forecast.cepregion.value,
                probability: forecast.probability.value,
                period: forecast.period.value,
                dtstart: forecast.dtstart.value,
                cdforecast: onEdit.cdforecast,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data))
        } else {
            await axios.post("http://localhost:8800/forecast", {
                    cdregion: forecast.cepregion.value,
                    probability: forecast.probability.value,
                    period: forecast.period.value,
                    dtstart: forecast.dtstart.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data))
        }

        forecast.cepregion.value = ""
        forecast.probability.value = ""
        forecast.period.value = ""
        forecast.dtstart.value = ""

        setOnEdit(null)
            getForecasts()
    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>CEP</Label>
                <Select name="cepregion" value={cep} options={cepOptions} onChange={handleCepChange} />
            </InputArea>
            <InputArea>
                <Label>Previsão</Label>
                <Input name="probability"  />
            </InputArea>
            <InputArea>
                <Label>Data</Label>
                <Input name="dtstart" type="date" />
            </InputArea>
            <InputArea>
                <Label>Período</Label>
                <Select name="period" value={time} options={timeOptions} onChange={handleTimeChange} />
            </InputArea>

            <Button type="submit" >SALVAR</Button>
        </FormContainer>
    )
}

export default Form