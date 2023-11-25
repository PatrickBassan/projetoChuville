"""Modulo que fornece a previsão de alagamento"""
# pylint: disable=E0401
# pylint: disable=C0103
from datetime import date
import pickle
import random
import mysql.connector
import requests

# Carrega o modelo preditor
with open('predictorModel', 'rb') as f:
    predictor = pickle.load(f)

# Requisição para a API meteorológica
response = requests.get(
    'https://api.hgbrasil.com/weather?woeid=455873&fields=only_results,rain,moon_phase&key=226c4975'
)

# Contador para realizar predição para cada período do dia
times = 1

while times != 5:
    try:
        result = response.json()

        moon_phase = result['moon_phase']
        if moon_phase == 'new':
            moon = 1
        elif moon_phase == 'waxing_crescent':
            moon = 2
        elif moon_phase == 'first_quarter':
            moon = 2
        elif moon_phase == 'waxing_gibbous':
            moon = 2
        elif moon_phase == 'full':
            moon = 3
        elif moon_phase == 'waning_gibbous':
            moon = 4
        elif moon_phase == 'last_quarter':
            moon = 4
        elif moon_phase == 'waning_crescent':
            moon = 4
        else:
            moon = 0

        sea = random.randint(0, 200)

        try:
            prediction = predictor.predict([[result['rain'], sea, moon]])

            conn = mysql.connector.connect(
                host='localhost',
                user='root',
                password='111111',
                database='chuville'
            )
            cursor = conn.cursor()

            try:
                probability = round(prediction[0], 2)
                dtstart = date.today()
                cdregion = random.randint(1, 200)

                insert = (f'INSERT INTO FORECAST (probability, dtstart, fgperiod, cdregion) VALUES '
                          f'({probability}, "{dtstart}", {times}, {cdregion})')
                cursor.execute(insert)
                conn.commit()
            except RuntimeError:
                print(f"Erro ao salvar previsão: {RuntimeError}")

            cursor.close()
            conn.close()

        except RuntimeError:
            print(f"Erro na conexão com o banco: {RuntimeError}")


    except KeyError:
        print(f"Erro na requisição da API HGWeather: {NameError}")

    times += 1
