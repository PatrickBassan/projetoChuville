import express from "express";
import regionsRoutes from "./routes/regions.js";
import forecastRoutes from "./routes/forecast.js";
import cors from "cors";
import TelegramBot from  "node-telegram-bot-api";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/regions", regionsRoutes);

app.use("/forecast", forecastRoutes);

app.listen(8800);

const token = '6340610289:AAFOptmbS9hWt-bWwA6dOFRDss4qNy84G1w';
const bot = new TelegramBot(token, { polling: true });
const regex = /^(\d{5}-\d{3}),(\d{2}\/\d{2}\/\d{4}),([1-4])$/;

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Bem vindo ao Bot do Chuville! Aqui você pode consultar previsões de alagamentos da cidade de Joinville - SC");
    bot.sendMessage(chatId, "Para começar, escolha a operação desejada:");
    showOptions(chatId);
});

// Função para mostrar opções
function showOptions(chatId) {
  const options = {
    reply_markup: {
      keyboard: [
        ['Consultar previsões', 'Ativar recebimento de alertas'],
        ['Desativar recebimento de alertas', 'Cancelar'],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };
  bot.sendMessage(chatId, 'Escolha uma opção:', options);
}

bot.onText(/Consultar previsões/, (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  bot.sendMessage(chatId, "Digite o CEP, Data e a opção do período em que seja consultar a previsão.\nPor exemplo: 89229-38,23/10/2023,1");
});

bot.onText(regex, (msg, match) => {
    const chatId = msg.chat.id;
    const consulta = match[0];
    bot.sendMessage(chatId, 'Consultando...');
    const res = /^89220-070,23\/10\/2023,4$/;
    setTimeout(() => {
        if (res.test(consulta)) {
            bot.sendMessage(chatId, 'Para a consulta: ' + consulta + '\n A previsão é de: baixas chances de alagamento.');
            setTimeout(() => {
                showOptions(chatId);
            }, 500);
        } else {
            bot.sendMessage(chatId, 'Não existem previsões!');
            setTimeout(() => {
                showOptions(chatId);
            }, 500);
        }
    }, 1000);
  });

bot.onText(/Ativar recebimento de alertas/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Opção não implementada!');
    setTimeout(() => {
        showOptions(chatId);
    }, 500);
});

bot.onText(/Desativar recebimento de alertas/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Opção não implementada!');
    setTimeout(() => {
        showOptions(chatId);
    }, 500);
});

bot.onText(/Cancelar/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Até mais! Obrigado por usar a aplicação.');
});

bot.onText(/\/echo (.+)/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Opção inválida`);
  showOptions(chatId);
});
