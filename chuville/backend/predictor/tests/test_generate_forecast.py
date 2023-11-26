"""Módulo de testes da função generate_forecast"""
import os
import unittest
import pickle
from main import generate_forecast


class TestGenerateForecast(unittest.TestCase):
    """Class de testes"""

    def setUp(self):
        """Função de configuração do modelo preditor"""
        model_path = os.path.join(os.path.dirname(__file__), '..', 'predictorModel')
        with open(model_path, 'rb') as f:
            self.predictor = pickle.load(f)

    def test_generate_forecast(self):
        """Função que testa a execução com sucesso da  generate_forecast"""
        rain = 1.5
        sea = 2.0
        moon = 0.8

        result = generate_forecast(rain, sea, moon)

        self.assertGreaterEqual(result, 0.0)
        self.assertLessEqual(result, 100.0)


if __name__ == '__main__':
    unittest.main()
