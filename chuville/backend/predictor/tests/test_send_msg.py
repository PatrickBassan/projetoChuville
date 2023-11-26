import unittest
from unittest.mock import patch
import requests_mock
from main import send_msg


class TestSendMsg(unittest.TestCase):

    @patch('main.requests.get')
    @patch('main.get_period_term')
    @patch('main.get_cep')
    def test_send_msg(self, mock_get_cep, mock_get_period_term, mock_requests_get):
        mock_get_cep.return_value = ('12345',)
        mock_get_period_term.return_value = 'Manhã'

        with requests_mock.Mocker() as m:
            m.get('https://api.telegram.org/bot6340610289:AAFOptmbS9hWt-bWwA6dOFRDss4qNy84G1w/sendMessage',
                  json={'result': 'success'})

            send_msg('123', 0.8, 'manha', 'codigo_da_regiao')

        mock_get_cep.assert_called_once_with('codigo_da_regiao')
        mock_get_period_term.assert_called_once_with('manha')


if __name__ == '__main__':
    unittest.main()
