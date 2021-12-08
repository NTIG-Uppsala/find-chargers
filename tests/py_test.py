import pytest
import requests
import json

def post_request():
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
    request_answer = requests.post("https://find-chargers.azurewebsites.net/post-charger", json=data).json()
    return request_answer["insertId"]

def test_non_existing_charger_active():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/1/1/test@test.com")
    if request_answer.text == "Email or id is incorrect":
        pass
    else:
        raise Exception(request_answer)
def test_non_existing_charger_inactive():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/1/0/test@test.com")
    if request_answer.text == "Email or id is incorrect":
        pass
    else:
        raise Exception(request_answer)
def test_charger_inactive():
    charger_id = post_request()
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/0/test@test.com")
    if request_answer.text == "Charger changed to inactive":
        pass
    else:
        raise Exception(request_answer)
def test_charger_active():
    charger_id = post_request()
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/0/test@test.com")
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/1/test@test.com")
    if request_answer.text == "Charger changed to active":
        pass
    else:
        raise Exception(request_answer)
def test_search_for_active():
    charger_id = post_request()
    requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/0/test@test.com")
    request_answer = requests.get("https://find-chargers.azurewebsites.net/get-chargers-in-range/31.5/21/100").json()
    for i in range(0, len(request_answer)):
        if request_answer[i]["id"] == charger_id:
            raise Exception(request_answer)
    pass
def test_send_minus1():
    charger_id = post_request()
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/-1/test@test.com")
    if request_answer.text == "Visibility already set to true":
        pass
    else:
        raise Exception(request_answer)
def test_send_2():
    charger_id = post_request()
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/2/test@test.com")
    if request_answer.text == "Visibility already set to true":
        pass
    else:
        raise Exception(request_answer)
def test_incorrect_email():
    charger_id = post_request()
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/0/test2@test.com")
    if request_answer.text == "Email or id is incorrect":
        pass
    else:
        raise Exception(request_answer)
def test_new_charger_can_be_found():
    charger_id = post_request()
    request_answer = requests.get("https://find-chargers.azurewebsites.net/get-chargers-in-range/31.5/21/100").json()
    for i in range(0, len(request_answer)):
        if request_answer[i]["id"] == charger_id:
            pass
            return
    raise Exception(request_answer)
def test_inactive_found_by_mail():
    charger_id = post_request()
    requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/0/test@test.com")
    request_answer = requests.get("https://find-chargers.azurewebsites.net/get-charger-by-email/test@test.com").json()
    for i in range(0, len(request_answer)):
        if request_answer[i]["id"] == charger_id:
            pass
            return
    raise Exception(request_answer)
def test_send_hamsterpaj():
    charger_id = post_request()
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/" + str(charger_id) + "/HAMSTERPAJ/test@test.com")
    if request_answer.text == "Visibility already set to true":
        pass
    else:
        raise Exception(request_answer)
def test_send_wierd_charger_id():
    expected_answer = {
                        "errors": [
                            {
                            "value": "t\"--",
                            "msg": "Must be a number!",
                            "param": "id",
                            "location": "params"
                            }
                        ]
                        }
    request_answer = requests.put('https://find-chargers.azurewebsites.net/change-charger-visibility/t"--/1/test@test.com')
    if request_answer.json() == expected_answer:
        pass
    else:
        raise Exception(request_answer)