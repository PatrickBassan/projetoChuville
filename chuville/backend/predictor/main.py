"""Modulo que fornece a previsão de alagamento"""
# pylint: disable=E0401
# pylint: disable=C0103
from datetime import date
import pickle
import random
import mysql.connector
import requests


def send_msg(chat_id, probability, period, cdregion):
    """Função que envia previsão de alagamento via bot do telegram"""
    token = "6340610289:AAFOptmbS9hWt-bWwA6dOFRDss4qNy84G1w"
    period = get_period_term(period)
    cep = get_cep(cdregion)
    message = (f"As chances de alagamentos para o CEP {cep[0]}"
               f" são de {probability}% no período: {period}")
    url = f"https://api.telegram.org/bot{token}/sendMessage?chat_id={chat_id}&text={message}"
    requests.get(url).json()


def get_moon_phase(moon_phase):
    """Função que retorna fase da lua em forma de número pra ser usada no preditor"""
    if moon_phase == 'new':
        phase = 1
    elif moon_phase == 'waxing_crescent':
        phase = 2
    elif moon_phase == 'first_quarter':
        phase = 2
    elif moon_phase == 'waxing_gibbous':
        phase = 2
    elif moon_phase == 'full':
        phase = 3
    elif moon_phase == 'waning_gibbous':
        phase = 4
    elif moon_phase == 'last_quarter':
        phase = 4
    elif moon_phase == 'waning_crescent':
        phase = 4
    else:
        phase = 0

    return phase


def get_period_term(period):
    """Função que retorna período do dia com base no código"""
    if period == 1:
        term = 'Manhã'
    elif period == 2:
        term = 'Tarde'
    elif period == 3:
        term = 'Noite'
    else:
        term = 'Madrugada'

    return term


def insert_forecast(prediction, period, cdregion):
    """Função que salva a previsão de alagamento"""
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='111111',
            database='chuville'
        )
        cursor = conn.cursor()
        probability = round(prediction[0], 2)
        dtstart = date.today()

        try:
            insert = (f'INSERT INTO FORECAST (probability, dtstart, fgperiod, cdregion) VALUES '
                      f'({probability}, "{dtstart}", {period}, {cdregion})')
            cursor.execute(insert)
            conn.commit()
        except RuntimeError:
            print(f"Erro ao salvar previsão: {RuntimeError}")

        cursor.close()
        conn.close()
        notify_users(cdregion, probability, period)
    except RuntimeError:
        print(f"Erro na conexão com o banco: {RuntimeError}")


def notify_users(cdregion, probability, period):
    """Função responsável por verificar usuários que recebem notificação"""
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='111111',
            database='chuville'
        )
        cursor = conn.cursor()

        try:
            query = f"SELECT chatid FROM user WHERE cdregion = '{cdregion}'"
            cursor.execute(query)
            results = cursor.fetchall()
            for result in results:
                send_msg(result[0], probability, period, cdregion)
        except RuntimeError:
            print(f"Erro ao salvar previsão: {RuntimeError}")

        cursor.close()
        conn.close()
    except RuntimeError:
        print(f"Erro na conexão com o banco: {RuntimeError}")


def get_cep(cdregion):
    """Função que retorna o CEP com base no código da região"""
    try:
        conn = mysql.connector.connect(
            host='localhost',
            user='root',
            password='111111',
            database='chuville'
        )
        cursor = conn.cursor()
        cep = cdregion
        try:
            query = f"SELECT cepregion FROM region WHERE cdregion = '{cdregion}'"
            cursor.execute(query)
            cep = cursor.fetchone()

        except RuntimeError:
            print(f"Erro ao salvar previsão: {RuntimeError}")

        cursor.close()
        conn.close()
        return cep
    except RuntimeError:
        print(f"Erro na conexão com o banco: {RuntimeError}")

    return None


def api_request():
    """Função que faz requisição de dados meteorológicos para a API HG Weather"""
    response = requests.get(
        'https://api.hgbrasil.com/weather?'
        + 'woeid=455873&fields=only_results,rain,moon_phase&key=226c4975'
    )
    try:
        return response.json()
    except KeyError:
        print(f"Erro na requisição da API HGWeather: {NameError}")
        return None


def generate_forecast(rain, sea, moon):
    """Função que usa o modelo AM para prever alagamento"""
    with open('predictorModel', 'rb') as f:
        predictor = pickle.load(f)

    return predictor.predict([[rain, sea, moon]])


def main():
    """Função de Execução principal do preditor"""
    result = api_request()
    period_count = 1
    while period_count != 5:
        moon = get_moon_phase(result['moon_phase'])
        sea = random.randint(0, 200)
        region = random.randint(1, 244)
        forecast = generate_forecast(result['rain'], sea, moon)
        insert_forecast(forecast, period_count, region)
        period_count += 1


if __name__ == '__main__':
    main()
