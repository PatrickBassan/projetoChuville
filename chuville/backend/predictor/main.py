"""Modulo que fornece a previsão de alagamento"""
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
Times = 1

while Times != 5:
    try:
        result = response.json()

        moon_phase = result['moon_phase']
        if moon_phase == 'new':
            Moon = 1
        elif moon_phase == 'waxing_crescent':
            Moon = 2
        elif moon_phase == 'first_quarter':
            Moon = 2
        elif moon_phase == 'waxing_gibbous':
            Moon = 2
        elif moon_phase == 'full':
            Moon = 3
        elif moon_phase == 'waning_gibbous':
            Moon = 4
        elif moon_phase == 'last_quarter':
            Moon = 4
        elif moon_phase == 'waning_crescent':
            Moon = 4
        else:
            Moon = 0

        sea = random.randint(0, 200)

        try:
            prediction = (predictor.predict([[result['rain'], sea, Moon]]))

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
                          f'({probability}, "{dtstart}", {Times}, {cdregion})')
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

    Times += 1
