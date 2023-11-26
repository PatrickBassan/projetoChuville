import express from "express"
import regionsRoutes from "./routes/regions.js"
import forecastRoutes from "./routes/forecast.js"
import cors from "cors"
import TelegramBot from  "node-telegram-bot-api"
import { db } from "./db.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/regions", regionsRoutes)
app.use("/forecast", forecastRoutes)

app.listen(process.env.PORT || PORT)

const token = '6340610289:AAFOptmbS9hWt-bWwA6dOFRDss4qNy84G1w'
const bot = new TelegramBot(token, { polling: true })
const consultRegex = /^(\d{5}-\d{3}),(\d{2}\/\d{2}\/\d{4}),([1-4])$/
const cepRegex = /^(\d{5}-\d{3})$/

function showOptions(chatId) {
    const options = {
        reply_markup: {
            keyboard: [['Consultar previsões', 'Receber notificações'], ['Parar de receber notificações', 'Cancelar']],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    }
    bot.sendMessage(chatId, 'Escolha uma opção:', options)
}

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(
        chatId,
        "Bem vindo ao Bot do Chuville! Aqui você pode consultar previsões de alagamentos da cidade de Joinville - SC"
        +"\n\nPara começar, escolha a operação desejada:"
    )
    showOptions(chatId)
})

bot.onText(/Consultar previsões/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, "Digite o CEP, Data e a opção do período em que seja consultar a previsão.\nPor exemplo: 89229-38,23/10/2023,1")
    bot.sendMessage(chatId, "Considere os seguintes valores para o período:\n1 - Manhã\n2 - Tarde\n3 - Noite\n4 - Madrugada\n")
})

bot.onText(consultRegex, (msg, match) => {
    const chatId = msg.chat.id
    let consulta = match[0]
    bot.sendMessage(chatId, 'Consultando...')

    let valores = consulta.split(',')
    let datePart = valores[1].split("/")
    let dbDate = datePart[2] + "-" + datePart[0] + "-" + datePart[1]

    const q = "SELECT * FROM forecast INNER JOIN region ON (region.cdregion =  forecast.cdregion) WHERE region.cepregion = ? AND forecast.fgperiod = ? AND forecast.dtstart = ?"
    db.query(q, [valores[0], valores[2], dbDate], (err, data) => {
        if (err || data.length == 0) {
            bot.sendMessage(chatId, 'Não existem previsões para os dados fornecidos!')
        } else {
            let probability = Math.floor(data[0].probability)
            bot.sendMessage(chatId, 'Para a consulta: ' + consulta + '\n As chances de alagamento são de: ' + probability + '%.')
        }
        setTimeout(() => {
            showOptions(chatId)
        }, 500)
    })
})

bot.onText(/Receber notificações/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, "Digite o CEP o qual deseja receber notificações (apenas um cep):")
})

bot.onText(cepRegex, (msg, match) => {
    const chatId = msg.chat.id
    let cep = match[0]

    const q = "SELECT cdregion FROM region WHERE cepregion = ?"
    db.query(q, [cep], (err, data) => {
        if (err || data.length == 0) {
            bot.sendMessage(chatId, 'CEP informado incorreto ou não está presente na base de dados')
        } else {
            const insert = "INSERT INTO user (cdregion, chatid) VALUES (?,?)"
            db.query(insert, [data[0].cdregion, chatId], (err) => {
                if (err) {
                    bot.sendMessage(chatId, "Já existe um cadastro para seu usuário. Escolha a opção de 'Parar de receber notificações' e depois cadastre um novo CEP.")
                } else {
                    bot.sendMessage(chatId,"Cadastrado efetuado com sucesso.")
                }
              })
        }
        setTimeout(() => {
            showOptions(chatId)
        }, 500)
    })
})

bot.onText(/Parar de receber notificações/, (msg) => {
    const chatId = msg.chat.id

    const q = "DELETE FROM user WHERE `chatid` = ?"
    db.query(q, [chatId], (err) => {
        if (err) {
            bot.sendMessage(chatId, "Ocorreu um erro inesperado! Tente novamente.")
        } else {
            bot.sendMessage(chatId,"Operação efetuada com sucesso.")
        }
    })
})

bot.onText(/Cancelar/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Até mais! Obrigado por usar a aplicação.')
})

bot.onText(/\/echo (.+)/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, `Opção inválida`)
    setTimeout(() => {
        showOptions(chatId)
    }, 500)
})
