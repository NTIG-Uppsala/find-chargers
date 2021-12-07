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
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/0/test@test.com")
    if request_answer.text == "Charger changed to inactive":
        pass
    else:
        raise Exception(request_answer)
def test_charger_active():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/1/test@test.com")
    if request_answer == "Charger changed to active":
        pass
    else:
        raise Exception(request_answer)
def test_search_for_active():
    request_answer = requests.get("https://find-chargers.azurewebsites.net/get-chargers-in-range/30.5/20/500")
    if request_answer.json()[-1]["user_input"] == "Testing":
        pass
    else:
        raise Exception(request_answer)
def test_send_minus1():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/-1/test@test.com")
    if request_answer == "Use 1 or 0 to activate/inactivate":
        pass
    else:
        raise Exception(request_answer)
def test_send_2():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/2/test@test.com")
    if request_answer == "Use 1 or 0 to activate/inactivate":
        pass
    else:
        raise Exception(request_answer)
def test_incorrect_email():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/1/test2@test.com")
    if request_answer == "Email or id is incorrect":
        pass
    else:
        raise Exception(request_answer)
def test_new_charger_can_be_found():
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
    request_answer2 = requests.get("https://find-chargers.azurewebsites.net/get-chargers-in-range/31.5/21/100").json()
    if request_answer["insertId"] == request_answer2[-1]["id"]:
        pass
    else:
        raise Exception(request_answer)
def test_inactive_found_by_mail():
    data = {
    "address": "Testgatan 66",
    "coordinate_lat": 32.5,
    "coordinate_long": 22,
    "ac_1": 0,
    "ac_2": 0,
    "chademo": 1,
    "ccs": 1,
    "user_input": "Testing",
    "email_address": "test@test.com"
    }
    request_answer = requests.post("https://find-chargers.azurewebsites.net/post-charger", json=data).json()
    requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/"+str(request_answer["insertId"])+"/0/test@test.com")
    request_answer2 = requests.get("https://find-chargers.azurewebsites.net/get-charger-by-email/test@test.com").json()
    for i in range(0, len(request_answer2)):
        if request_answer2[i]["id"] == request_answer["insertId"]:
            pass
            return
    raise Exception(request_answer)
def test_send_hamsterpaj():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/HAMSTERPAJ/test@test.com")
    if request_answer == "Use 1 or 0 to activate/inactivate":
        pass
    else:
        raise Exception(request_answer)
def test_send_wierd_charger_id():
    request_answer = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/**''**//--/\\\??##!#¤%&/()=?**/1/test@test.com")
    if request_answer == "Use 1 or 0 to activate/inactivate":
        pass
    else:
        raise Exception(request_answer)