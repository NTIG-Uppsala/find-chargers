import pytest
import requests

class TestClass:
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