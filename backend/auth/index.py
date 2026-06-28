import json
import os
import hashlib
import psycopg2


def handler(event, context):
    """
    Обработчик авторизации игроков.
    POST /register — регистрация нового игрока.
    POST /login — вход существующего игрока.
    """
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod', event.get('method', '')) == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'success': True}),
        }

    path = event.get('path', event.get('rawPath', '/'))
    body = json.loads(event['body'])

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            level INTEGER DEFAULT 1,
            score INTEGER DEFAULT 0,
            faction VARCHAR(255) DEFAULT NULL
        )
    """)
    conn.commit()

    if path == '/register':
        username = body['username'].replace("'", "''")
        email = body.get('email', '').replace("'", "''")
        password_hash = hashlib.sha256(body['password'].encode()).hexdigest()

        try:
            cur.execute(f"SELECT id FROM players WHERE username = '{username}'")
            if cur.fetchone():
                cur.close()
                conn.close()
                return {
                    'statusCode': 409,
                    'headers': headers,
                    'body': json.dumps({'success': False, 'error': 'Пользователь уже существует'}),
                }
        except Exception:
            pass

        cur.execute(
            f"INSERT INTO players (username, email, password_hash) "
            f"VALUES ('{username}', '{email}', '{password_hash}') "
            f"RETURNING id, username, level, score, faction"
        )
        conn.commit()
        row = cur.fetchone()
        cur.close()
        conn.close()

        return {
            'statusCode': 201,
            'headers': headers,
            'body': json.dumps({
                'success': True,
                'user': {
                    'id': row[0],
                    'username': row[1],
                    'level': row[2],
                    'score': row[3],
                    'faction': row[4],
                },
            }),
        }

    if path == '/login':
        username = body['username'].replace("'", "''")
        password_hash = hashlib.sha256(body['password'].encode()).hexdigest()

        cur.execute(
            f"SELECT id, username, level, score, faction, password_hash "
            f"FROM players WHERE username = '{username}'"
        )
        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row or row[5] != password_hash:
            return {
                'statusCode': 401,
                'headers': headers,
                'body': json.dumps({'success': False, 'error': 'Неверные учётные данные'}),
            }

        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({
                'success': True,
                'user': {
                    'id': row[0],
                    'username': row[1],
                    'level': row[2],
                    'score': row[3],
                    'faction': row[4],
                },
            }),
        }

    cur.close()
    conn.close()
    return {
        'statusCode': 404,
        'headers': headers,
        'body': json.dumps({'success': False, 'error': 'Маршрут не найден'}),
    }
