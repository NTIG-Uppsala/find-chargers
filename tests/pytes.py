import pytest
import requests


def test_non_existing_charger_active():
    request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/1/1/test@test.com")
    if request_anwser == "Charger dose not exist":
        pass
    else:
        raise Exception("Failed")
def test_non_existing_charger_inactive():
    request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/1/0/test@test.com")
    if request_anwser == "Charger dose not exist":
        pass
    else:
        raise Exception("Failed")
def test_charger_inactive():
    request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/0/test@test.com")
    if request_anwser == "Charger changed to inactive":
        pass
    else:
        raise Exception("Failed")
def test_charger_active():
    request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/1/test@test.com")
    if request_anwser == "Charger changed to active":
        pass
    else:
        raise Exception("Failed")
def test_search_for_active():
    request_anwser = requests.get("https://find-chargers.azurewebsites.net/get-chargers-in-range/30.5/20/500")
    if request_anwser.json()[-1]["user_input"] == "Testing":
        pass
    else:
        raise Exception("Charger not found")
def test_send_minus1():
    request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/-1/test@test.com")
    if request_anwser == "Use 1 or 0 to activate/inactivate":
        pass
    else:
        raise Exception("Failed")
def test_send_2():
    request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/2/test@test.com")
    if request_anwser == "Use 1 or 0 to activate/inactivate":
        pass
    else:
        raise Exception("Failed")
def test_incorrect_email():
    request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/1/test2@test.com")
    if request_anwser == "Email or id is incorrect":
        pass
    else:
        raise Exception("Failed")
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
    request_anwser = requests.post("https://find-chargers.azurewebsites.net/post-charger", json=data).json()
    request_anwser2 = requests.get("https://find-chargers.azurewebsites.net/get-chargers-in-range/31.5/21/100").json()
    if request_anwser["insertId"] == request_anwser2[-1]["id"]:
        pass
    else:
        raise Exception("Failed")
def test_new_charger_can_be_found():
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
    request_anwser = requests.post("https://find-chargers.azurewebsites.net/post-charger", json=data).json()
    requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/"+str(request_anwser["insertId"])+"/0/test@test.com")
    request_anwser2 = requests.get("https://find-chargers.azurewebsites.net/get-charger-by-email/test@test.com").json()
    for i in range(0, len(request_anwser2)):
        if request_anwser2[i]["id"] == request_anwser["insertId"]:
            pass
            return
    
    raise Exception("Failed")