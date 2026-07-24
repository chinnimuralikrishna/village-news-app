import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="chinni7337",
    database="village_news"
)

cursor = db.cursor()