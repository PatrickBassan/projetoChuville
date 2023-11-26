import unittest
from main import get_period_term


class TestGetPeriodTerm(unittest.TestCase):

    def test_manha(self):
        resultado = get_period_term(1)
        self.assertEqual(resultado, 'Manhã')

    def test_tarde(self):
        resultado = get_period_term(2)
        self.assertEqual(resultado, 'Tarde')

    def test_noite(self):
        resultado = get_period_term(3)
        self.assertEqual(resultado, 'Noite')

    def test_madrugada(self):
        resultado = get_period_term(4)
        self.assertEqual(resultado, 'Madrugada')

    def test_periodo_desconhecido(self):
        resultado = get_period_term(99)
        self.assertEqual(resultado, 'Madrugada')


if __name__ == '__main__':
    unittest.main()
