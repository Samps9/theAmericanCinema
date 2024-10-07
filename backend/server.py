from flask import Flask
from pymongo import MongoClient
from bson import json_util
import json

app = Flask(__name__)

@app.route('/data')
def get_data():
	client = MongoClient('localhost', 27017, username='myUserAdmin', password='Jakeman2')
	db = client.flask_db
	pages = list(db.pages.find().sort("nav_position"))
	return json.loads(json_util.dumps(pages))
	

