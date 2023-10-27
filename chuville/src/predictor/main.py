import pickle
import mysql.connector
from datetime import date
import random
import requests

with open('predictorModel', 'rb') as f:
    predictor = pickle.load(f)

API_KEY = "29ad2ba86a3d9e0d6b64db2eb3fea413"
link = f"https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API_KEY}"

try:
    req = requests.get(link)
    resp = req.json()
    sea = resp['main']['sea_level']
    rain = resp['rain']['1h']
    moon = random.randint(1, 4)

    try:
        prediction = (predictor.predict([[rain, sea, moon]]))

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
            fgperiod = random.randint(1, 4)
            cdregion = random.randint(1, 200)

            insert = f'INSERT INTO FORECAST (probability, dtstart, fgperiod, cdregion) VALUES ({probability}, "{dtstart}", {fgperiod}, {cdregion})'
            cursor.execute(insert)
            conn.commit()
        except RuntimeError:
            print(f"Erro ao salvar previsão: {RuntimeError}")

        cursor.close()
        conn.close()

    except RuntimeError:
        print(f"Erro na conexão com o banco: {RuntimeError}")


except KeyError:
    print(f"Erro na requisição da API OpeanWeather: {NameError}")