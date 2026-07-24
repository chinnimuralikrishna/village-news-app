from flask import Blueprint, jsonify, request
from config import db

news = Blueprint('news', __name__)

@news.route('/news', methods=['GET'])
def get_news():

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM news
        WHERE status='approved'
        ORDER BY created_at DESC
    """)

    data = cursor.fetchall()

    return jsonify(data)


@news.route('/add-news', methods=['POST'])
def add_news():

    data = request.get_json()

    title = data['title']
    description = data['description']
    category = data['category']
    location = data['location']

    cursor = db.cursor()

    sql = """
    INSERT INTO news
    (title, description, category, location, status)
    VALUES (%s, %s, %s, %s, 'pending')
    """

    cursor.execute(sql, (title, description, category, location))
    db.commit()

    return jsonify({
        "message": "News submitted successfully. Waiting for admin approval."
    })
@news.route('/my-news/<int:user_id>', methods=['GET'])
def get_my_news(user_id):

    cursor = db.cursor(dictionary=True)

    sql = """
    SELECT *
    FROM news
    WHERE author_id = %s
    ORDER BY created_at DESC
    """

    cursor.execute(sql, (user_id,))

    data = cursor.fetchall()

    return jsonify(data)