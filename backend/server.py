from flask import Flask
from pymongo import MongoClient
from bson import json_util
import json
import os

app = Flask(__name__)

@app.route('/data')
def get_data():
	client = MongoClient(os.environ['ENVIRONMENT'], int(os.environ['PORT']), username=os.environ['DB_USERNAME'], password=os.environ['DB_PW'])
	db = client.flask_db
	pages = list(db.pages.find().sort("nav_position"))
	return json.loads(json_util.dumps(pages))
	

