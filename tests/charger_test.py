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
    
# Test wierd data when posting
def test_wired_data_post():
    send_data = {
	"address": "Kamomillgatan 8",
	"coordinate_lat": "hej hej",
	"coordinate_long": 17.6820875,
	"email_address": 4653262,
	"ac_1": 4143,
	"chademo": "jeff",
	"ccs": False,
	"user_input": 25367
    }
    expected_answer = {"errors": [{"value": 4653262,"msg": "Must be a valid email!","param": "email_address","location": "body"},{"value": "hej hej","msg": "Must be a number!","param": "coordinate_lat", "location": "body"}]}
    request_answer = requests.post("http://localhost:8080/"+"post-charger", json=send_data)
    if request_answer.json() == expected_answer:
        pass
    else:
        raise Exception(request_answer)
    
# Send non number to chargers in range
def test_non_number_distance():
    expected_answer = {"errors": [{"value": "hej\"--","msg": "Must be a number!","param": "max_distance","location": "params"}]}
    request_answer = requests.get("http://localhost:8080/"+'get-chargers-in-range/31.5/21/hej"--')
    if request_answer.json() == expected_answer:
        pass
    else:
        raise Exception(request_answer)