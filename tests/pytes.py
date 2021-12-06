import pytest
import requests

class TestClass:
    def test_three(self):
        data = {
        "address": "Testgatan 64",
        "coordinate_lat": 30.5,
        "coordinate_long": 20,
        "ac_1": 1,
        "ac_2": 1,
        "chademo": 0,
        "ccs": 0,
        "user_input": "Testing",
        "email_address": "test@test.com"
        }
        request_anwser = requests.post("https://find-chargers.azurewebsites.net/post-charger", json=data)
        if "Charger got add on id" in request_anwser:
            pass
        else:
            raise Exception("Failed")
    def test_four(self):
        get_data = requests.get("https://find-chargers.azurewebsites.net/get-charger-by-email/test@test.com").json()
        if get_data[0]["user_input"] == "Testing":
            pass
        else:
            raise Exception("Charger not found in database")
    def test_one(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/1/1/test@test.com")
        if request_anwser == "Charger dose not exist":
            pass
        else:
            raise Exception("Failed")
    def test_two(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/1/test@test.com")
        if request_anwser == "Charger changed to active":
            pass
        else:
            raise Exception("Failed")