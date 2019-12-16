import psutil

def get_temperatures(fahrenheit=False):
    readings = psutil.sensors_temperatures(fahrenheit=fahrenheit)
    temperatures = []

    for key, value in readings.items():
        zone = {'type': key, 'temperature_sensors': []}

        for sensor in value:
            zone['temperature_sensors'].append({'label': sensor.label, 'current': sensor.current, 'high': sensor.high, 'critical': sensor.critical})

        temperatures.append(zone)

    return temperatures