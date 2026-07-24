from flask import Blueprint, request, jsonify
from config import db

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():

    data = request.json

    full_name = data['full_name']
    email = data['email']
    password = data['password']

    cursor = db.cursor()

    sql = """
    INSERT INTO users(full_name,email,password)
    VALUES(%s,%s,%s)
    """

    cursor.execute(sql, (full_name, email, password))
    db.commit()

    return jsonify({
        "message": "User Registered Successfully"
    })
@auth.route('/login', methods=['POST'])
def login():

    data = request.json

    email = data['email']
    password = data['password']

    cursor = db.cursor(dictionary=True)

    sql = "SELECT * FROM users WHERE email=%s"

    cursor.execute(sql, (email,))

    user = cursor.fetchone()

    if user is None:
        return jsonify({
            "status": "error",
            "message": "Email not found"
        }), 404

    if user["password"] != password:
        return jsonify({
            "status": "error",
            "message": "Incorrect password"
        }), 401

    return jsonify({
        "status": "success",
        "message": "Login Successful",
        "user": {
            "id": user["id"],
            "full_name": user["full_name"],
            "email": user["email"],
            "role": user["role"]
        }
    })