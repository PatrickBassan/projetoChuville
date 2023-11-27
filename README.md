# Projeto Chuville

## Descrição
A aplicação Chuville tem o objetivo de facilitar o monitoramento e prevenção contra alagamentos, utilizando sensores de profundidade em rios em conjunto com arduino. Através dos sensores de profundidade, dados do rio são processados e enviados para cloud, onde junto de dados relevantes que influenciam a incidência de alagamentos, serão analisados com o auxílio técnicas de aprendizagem de máquina visando prever a probabilidade de alagamentos. A aplicação dispara os avisos de alagamento através de mensagens para um bot no aplicativo do telegram, assim como através de uma página web, na qual possível realizar consultas a respeito da predição para um determinado CEP e período do dia.

## Stack/Tecnologias
- React: Utilizado para o front-end da página web
- Node: Utilizado para o back-end da página web
- Python: Utilizado para aprendizagem de máguina do algoritmo de predição de alagamentos
- Javascript: Utilizado para programar o Arduino e sensores
- Banco de dados: MySQL
- Servidor: Heroku com JawsDB (backend, banco de dados e bot), Netlify (frontend) e Lambda (Python)

## Documentação
Para visualizar a documentação completa, verifique a [wiki](https://github.com/PatrickBassan/projetoChuville/wiki/Documenta%C3%A7%C3%A3o) do projeto.

## Instalação
Primeiramente clone o repositório e acesse a pasta raíz:
```
git clone https://github.com/PatrickBassan/projetoChuville
cd projetoChuville
```
Acesse a pasta do frontend, instale as dependências e então inicie o projeto:
```
cd chuville/frontend
npm install
npm start
```
Faça o mesmo para o backend:
```
cd ../backend/api
npm install
npm start
```
Utilize o Dump20231126.sql que se encontra na pasta raíz do projeto para restaurar o backup do banco de dados.
## Uso
### Ambiente de Produção
https://main--famous-wisp-98cb91.netlify.app/

#### Página de Consulta de previsões
![chuville-consulta](https://github.com/PatrickBassan/projetoChuville/assets/61787168/951ef132-201f-46e2-9d7e-d382d7ba9901)

#### Página de gestão das previsões
![chuville-grid](https://github.com/PatrickBassan/projetoChuville/assets/61787168/4c040181-3954-4cde-9d9b-981ffe411c9c)

#### Bot do telegram
![chuville-bot](https://github.com/PatrickBassan/projetoChuville/assets/61787168/4925e62c-26bb-48d1-ad9b-3fcbf690c280)

## Contribuição
Contribuições são bem-vindas, leia o [guia de contribuições](https://github.com/PatrickBassan/projetoChuville/wiki/Guia-de-Contribui%C3%A7%C3%A3o) caso deseje ajudar com o projeto.

## Licença
O projeto Chuville é disponibilizado sob a [licença Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Autores e Agradecimentos
`WIP`

## Contato
Para contato, envie um e-mail para: patrickfbassan@gmail.com
