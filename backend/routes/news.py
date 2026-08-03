import os
from werkzeug.utils import secure_filename
from flask import Blueprint, jsonify, request, current_app
from config import db

news = Blueprint('news', __name__)


# ==========================
# GET ALL NEWS
# ==========================

@news.route('/news', methods=['GET'])
def get_news():

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
    SELECT
        news.*,
        COUNT(likes.id) AS likes
    FROM news
    LEFT JOIN likes
    ON news.id = likes.news_id
    GROUP BY news.id
    ORDER BY news.created_at DESC
    """)

    data = cursor.fetchall()

    return jsonify(data)


# ==========================
# MY NEWS
# ==========================

@news.route('/my-news/<int:user_id>', methods=['GET'])
def get_my_news(user_id):

    cursor = db.cursor(dictionary=True)

    cursor.execute("""
    SELECT *
    FROM news
    WHERE author_id=%s
    ORDER BY created_at DESC
    """, (user_id,))

    data = cursor.fetchall()

    return jsonify(data)


# ==========================
# ADD NEWS
# ==========================

@news.route('/add-news', methods=['POST'])
def add_news():

    data = request.get_json()

    title = data['title']
    description = data['description']
    category = data['category']
    location = data['location']
    author_id = data['author_id']
    image = data['image']

    cursor = db.cursor()

    sql = """
    INSERT INTO news
    (title,description,category,location,author_id,image)
    VALUES(%s,%s,%s,%s,%s,%s)
    """

    cursor.execute(sql, (
        title,
        description,
        category,
        location,
        author_id,
        image
    ))

    db.commit()

    return jsonify({
        "message": "News published successfully."
    })


# ==========================
# UPDATE NEWS
# ==========================

@news.route('/update-news/<int:id>', methods=['PUT'])
def update_news(id):

    data = request.get_json()

    title = data['title']
    description = data['description']
    category = data['category']
    location = data['location']
    image = data['image']

    cursor = db.cursor()

    sql = """
    UPDATE news
    SET
        title=%s,
        description=%s,
        category=%s,
        location=%s,
        image=%s
    WHERE id=%s
    """

    cursor.execute(sql, (
        title,
        description,
        category,
        location,
        image,
        id
    ))

    db.commit()

    return jsonify({
        "message": "News updated successfully."
    })


# ==========================
# DELETE NEWS
# ==========================

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


# ==========================
# IMAGE UPLOAD
# ==========================

@news.route('/upload-image', methods=['POST'])
def upload_image():

    if 'image' not in request.files:
        return jsonify({
            "message": "No image selected"
        }), 400

    file = request.files['image']

    filename = secure_filename(file.filename)

    filepath = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        filename
    )

    file.save(filepath)

    return jsonify({
        "filename": filename
    })


# ==========================
# LIKE NEWS
# ==========================

@news.route('/like-news', methods=['POST'])
def like_news():

    data = request.get_json()

    news_id = data['news_id']
    user_id = data['user_id']

    cursor = db.cursor()

    cursor.execute(
        "SELECT * FROM likes WHERE news_id=%s AND user_id=%s",
        (news_id, user_id)
    )

    already = cursor.fetchone()

    if already:
        return jsonify({
            "message": "Already liked"
        })

    cursor.execute(
        "INSERT INTO likes(news_id,user_id) VALUES(%s,%s)",
        (news_id, user_id)
    )

    db.commit()

    return jsonify({
        "message": "News liked successfully"
    })