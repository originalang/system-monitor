from flask_restful import Resource
from system_monitor_api import api, monitor

class Temperature(Resource):
    def get(self):
            return monitor.get_temperatures()

api.add_resource(Temperature, '/temperature')