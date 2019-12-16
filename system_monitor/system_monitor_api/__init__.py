from flask import Flask
from flask_restful import Api

app = Flask(__name__)
api = Api(app)

from system_monitor_api import views