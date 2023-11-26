"""Módulo para testar função get_period_term"""
import unittest
from main import get_period_term


class TestGetPeriodTerm(unittest.TestCase):
    """Classe para testar função get_period_term"""

    def test_manha(self):
        """Função para testar retorno quando for período da Manhã"""
        resultado = get_period_term(1)
        self.assertEqual(resultado, 'Manhã')

    def test_tarde(self):
        """Função para testar retorno quando for período da Tarde"""
        resultado = get_period_term(2)
        self.assertEqual(resultado, 'Tarde')

    def test_noite(self):
        """Função para testar retorno quando for período da Noite"""
        resultado = get_period_term(3)
        self.assertEqual(resultado, 'Noite')

    def test_madrugada(self):
        """Função para testar retorno quando for período da Madrugada"""
        resultado = get_period_term(4)
        self.assertEqual(resultado, 'Madrugada')

    def test_periodo_desconhecido(self):
        """Função para testar retorno quando for período inválido"""
        resultado = get_period_term(99)
        self.assertEqual(resultado, 'Madrugada')


if __name__ == '__main__':
    unittest.main()
