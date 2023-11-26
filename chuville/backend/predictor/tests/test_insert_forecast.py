"""Módulo para testar função insert_forecast"""
import unittest
from unittest.mock import patch, MagicMock
from datetime import date
from main import insert_forecast


class TestInsertForecast(unittest.TestCase):
    """Classe para testar função insert_forecast"""

    @patch('main.mysql.connector.connect')
    @patch('main.notify_users')
    def test_insert_forecast_success(self, mock_notify_users, mock_connect):
        """Função que testa execução com sucesso da função insert_forecast"""
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_conn.cursor.return_value = mock_cursor

        mock_connect.return_value = mock_conn

        insert_forecast([0.8], 1, 'codigo_da_regiao')

        mock_connect.assert_called_once_with(
            host='localhost',
            user='root',
            password='111111',
            database='chuville'
        )
        mock_cursor.execute.assert_called_once_with(
            'INSERT INTO FORECAST (probability, dtstart, fgperiod, cdregion)'
            ' VALUES (0.8, "{}", 1, codigo_da_regiao)'.format(date.today())
        )
        mock_conn.commit.assert_called_once()
        mock_notify_users.assert_called_once_with('codigo_da_regiao', 0.8, 1)


if __name__ == '__main__':
    unittest.main()
