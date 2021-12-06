import pytest
import requests

class TestClass:
    def non_existing_charger_active(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/1/1/test@test.com")
        if request_anwser == "Charger dose not exist":
            pass
        else:
            raise Exception("Failed")
    def non_existing_charger_inactive(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/1/0/test@test.com")
        if request_anwser == "Charger dose not exist":
            pass
        else:
            raise Exception("Failed")
    def charger_inactive(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/0/test@test.com")
        if request_anwser == "Charger changed to inactive":
            pass
        else:
            raise Exception("Failed")
    def charger_active(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/1/test@test.com")
        if request_anwser == "Charger changed to active":
            pass
        else:
            raise Exception("Failed")
    def search_for_active(self):
        request_anwser = requests.get("https://find-chargers.azurewebsites.net/get-chargers-in-range/30.5/20/500")
        if request_anwser.json()[-1]["user_input"] == "Testing":
            pass
        else:
            raise Exception("Charger not found")
    def send_minus1(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/-1/test@test.com")
        if request_anwser == "Use 1 or 0 to activate/inactivate":
            pass
        else:
            raise Exception("Failed")
    def send_2(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/2/test@test.com")
        if request_anwser == "Use 1 or 0 to activate/inactivate":
            pass
        else:
            raise Exception("Failed")
    def incorrect_email(self):
        request_anwser = requests.put("https://find-chargers.azurewebsites.net/change-charger-visibility/20/1/test2 @test.com")
        if request_anwser == "Email or id is incorrect":
            pass
        else:
            raise Exception("Failed")