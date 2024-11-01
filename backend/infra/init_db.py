import os
from parser import Parser
from pymongo import MongoClient

client = MongoClient(os.environ['ENVIRONMENT'], int(os.environ['PORT']), username=os.environ['DB_USERNAME'], password=os.environ['DB_PW'])
db = client.flask_db
pages = db.pages
pages.drop()

# get data from source txt files:
for filename in os.listdir("md_templates"):
    parser = Parser('md_templates/' + filename)
    parser.run()
    pages.insert_one(parser.dump())

