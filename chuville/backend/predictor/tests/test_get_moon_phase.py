"""Módulo de testes da função get_moon_phase"""
import unittest
from main import get_moon_phase


class TestGetMoonPhase(unittest.TestCase):
    """Classe de testes da função get_moon_phase"""

    def test_new_moon_phase(self):
        """Função para testar retorno quando for lua nova"""
        self.assertEqual(get_moon_phase('new'), 1)

    def test_waxing_crescent_moon_phase(self):
        """Função para testar retorno quando for lua crescente"""
        self.assertEqual(get_moon_phase('waxing_crescent'), 2)

    def test_first_quarter_moon_phase(self):
        """Função para testar retorno quando for lua crescente"""
        self.assertEqual(get_moon_phase('first_quarter'), 2)

    def test_waxing_gibbous_moon_phase(self):
        """Função para testar retorno quando for lua crescente"""
        self.assertEqual(get_moon_phase('waxing_gibbous'), 2)

    def test_full_moon_phase(self):
        """Função para testar retorno quando for lua cheia"""
        self.assertEqual(get_moon_phase('full'), 3)

    def test_waning_gibbous_moon_phase(self):
        """Função para testar retorno quando for lua minguante"""
        self.assertEqual(get_moon_phase('waning_gibbous'), 4)

    def test_last_quarter_moon_phase(self):
        """Função para testar retorno quando for lua minguante"""
        self.assertEqual(get_moon_phase('last_quarter'), 4)

    def test_waning_crescent_moon_phase(self):
        """Função para testar retorno quando for lua minguante"""
        self.assertEqual(get_moon_phase('waning_crescent'), 4)

    def test_invalid_moon_phase(self):
        """Função para testar retorno quando for valor invalido"""
        self.assertEqual(get_moon_phase('invalid_phase'), 0)


if __name__ == '__main__':
    unittest.main()
