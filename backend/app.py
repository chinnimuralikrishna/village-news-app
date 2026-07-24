from flask import Flask
from flask_cors import CORS
from config import db
from routes.auth import auth
from routes.news import news

app = Flask(__name__)
CORS(app)
app.register_blueprint(auth)
app.register_blueprint(news)

@app.route("/")
def home():
    return {"message": "Village News API is connected to MySQL"}

@app.route("/test-db")
def test_db():
    try:
        cursor = db.cursor()
        cursor.execute("SELECT DATABASE();")
        database = cursor.fetchone()
        return {
            "status": "success",
            "database": database[0]
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

if __name__ == "__main__":
    app.run(debug=True)