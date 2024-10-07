import os
from parser import Parser
from pymongo import MongoClient

client = MongoClient('localhost', 27017, username=os.environ['DB_USERNAME'], password=os.environ['DB_PW'])
db = client.flask_db
pages = db.pages
pages.drop()

# get data from source txt files:
for filename in os.listdir("txt_templates"):
    parser = Parser('txt_templates/' + filename)
    parser.run()
    pages.insert_one(parser.dump())

