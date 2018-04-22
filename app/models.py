import sqlite3 as sql
from app import login_manager, db
from flask_login import UserMixin, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import sys


class User(UserMixin):

    def __init__(self, id_number, username, email, password_hash):
    	self.id = id_number;
    	self.username = username
    	self.email = email
    	self.password_hash = password_hash



""" Verifies user in database. If exists, will return user object """
def getUserByUsername(query):
	with sql.connect('app.db') as connection:
		connection.row_factory = sql.Row
		cursor = connection.cursor()
		cursor.execute("SELECT * FROM users WHERE username=?", (query,))
		result = cursor.fetchall()
		if len(result) == 0:
			return None
		else:
			row = result[0]
			user = User(row[0], query, row[2], row[3])
			return user


""" Verifies UserID in the database. If the user exists, returns user object """
def getUserByID(query):
	with sql.connect('app.db') as connection:
		connection.row_factory = sql.Row
		cursor = connection.cursor()
		cursor.execute("SELECT * FROM users WHERE user_id=?", (query,))
		result = cursor.fetchall()
		if len(result) == 0:
			return None
		else:
			row = result[0]
			user = User(query, row[1], row[2], row[3])
			return user

def create_user(username, email, password_hash):
	with sql.connect('app.db') as connection:
		cursor = connection.cursor()
		cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (?,?,?)",(username, email, password_hash))
		connection.commit()

@login_manager.user_loader
def load_user(id):
     return getUserByID(id)
