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
    
#Delete charger and check deletion
def test_delete_charger():
    charger_id = post_request()
    requests.delete(url=url+"delete-charger-by-id/" + str(charger_id) + "/test@test.com")
    request_answer = requests.get(url=url+"get-charger-by-email/test@test.com").json()
    for i in range(0, len(request_answer)):
        if request_answer[i]["id"] == charger_id:     
            raise Exception(request_answer)
    pass

