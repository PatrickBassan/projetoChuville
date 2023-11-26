"""Módulo de testes da função get_cep"""
import unittest
from unittest.mock import patch, MagicMock
from main import get_cep


class TestGetCep(unittest.TestCase):
    """Classe de testes da função get_cep"""

    @patch('main.mysql.connector.connect')
    def test_get_cep_success(self, mock_connect):
        """Função que testa a execução com sucesso da get_cep"""
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_conn.cursor.return_value = mock_cursor
        mock_cursor.fetchone.return_value = ('89220-070',)

        mock_connect.return_value = mock_conn

        result = get_cep(40)

        mock_connect.assert_called_once_with(
            host='localhost',
            user='root',
            password='111111',
            database='chuville'
        )
        mock_cursor.execute.assert_called_once_with(
            "SELECT cepregion FROM region WHERE cdregion = '40'"
        )
        self.assertEqual(result, ('89220-070',))


if __name__ == '__main__':
    unittest.main()
