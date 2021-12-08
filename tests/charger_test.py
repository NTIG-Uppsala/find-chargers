import pytest
import requests
import json

url = "https://find-chargers.azurewebsites.net/"
data = {
    "address": "Testgatan 65",
    "coordinate_lat": 31.5,
    "coordinate_long": 21,
    "ac_1": 0,
    "ac_2": 0,
    "chademo": 1,
    "ccs": 1,
    "user_input": "Testing",
    "email_address": "test@test.com"
    }
def post_request():
    request_answer = requests.post(url+"post-charger", json=data).json()
    return request_answer["insertId"]
    
# Send non number to chargers in range
def test_non_number_distance():
    expected_answer = {"errors": [{"value": "hej\"--","msg": "Must be a number!","param": "max_distance","location": "params"}]}
    request_answer = requests.get("http://localhost:8080/"+'get-chargers-in-range/31.5/21/hej"--')
    if request_answer.json() == expected_answer:
        pass
    else:
        raise Exception(request_answer)