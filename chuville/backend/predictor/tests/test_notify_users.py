import unittest
from unittest.mock import patch, MagicMock
from main import notify_users


class TestNotifyUsers(unittest.TestCase):

    @patch('main.mysql.connector.connect')
    @patch('main.send_msg')
    def test_notify_users_success(self, mock_send_msg, mock_connect):
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_conn.cursor.return_value = mock_cursor
        mock_cursor.fetchall.return_value = [('chatid1',), ('chatid2',)]

        mock_connect.return_value = mock_conn

        notify_users('codigo_da_regiao', 0.8, 'manha')

        mock_connect.assert_called_once_with(
            host='localhost',
            user='root',
            password='111111',
            database='chuville'
        )
        mock_cursor.execute.assert_called_once_with("SELECT chatid FROM user WHERE cdregion = 'codigo_da_regiao'")
        mock_send_msg.assert_any_call('chatid1', 0.8, 'manha', 'codigo_da_regiao')
        mock_send_msg.assert_any_call('chatid2', 0.8, 'manha', 'codigo_da_regiao')


if __name__ == '__main__':
    unittest.main()
