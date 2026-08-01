from flask import Blueprint, jsonify, request
from config import db

news = Blueprint('news', __name__)


@news.route('/news', methods=['GET'])
def get_news():

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM news
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
    (title, description, category, location)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(sql, (title, description, category, location))
    db.commit()

    return jsonify({
        "message": "News published successfully."
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


@news.route('/update-news/<int:id>', methods=['PUT'])
def update_news(id):

    data = request.get_json()

    title = data['title']
    description = data['description']
    category = data['category']
    location = data['location']

    cursor = db.cursor()

    sql = """
    UPDATE news
    SET title=%s,
        description=%s,
        category=%s,
        location=%s
    WHERE id=%s
    """

    cursor.execute(sql, (title, description, category, location, id))
    db.commit()

    return jsonify({
        "message": "News updated successfully."
    })

@news.route('/delete-news/<int:id>', methods=['DELETE'])
def delete_news(id):

    cursor = db.cursor()

    cursor.execute(
        "DELETE FROM news WHERE id=%s",
        (id,)
    )

    db.commit()

    return jsonify({
        "message": "News deleted successfully."
    })