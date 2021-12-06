import requests
import json
import pytest

from requests.api import get

url = "https://find-chargers.azurewebsites.net/"
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
def test_Check_charger_by_email():
    requests.post(url+"post-charger", json=data)
    get_data = requests.get(url=url+"get-charger-by-email/test@test.com").json()
    if get_data[0]["user_input"] == data["user_input"]:
        print("Charger found in database")
        pass
    else:
        raise Exception("Charger not found in database")

def test_Check_charger_in_range():
    requests.post(url+"post-charger", json=data)
    get_data = requests.get(url=url+"get-chargers-in-range/" + str(data["coordinate_lat"] + 0.00486) + "/" + str(data["coordinate_long"]) + "/" + "1000") # Find charger in 1000m range while standing ~500m away
    if get_data.json()[0]["user_input"] == data["user_input"]:
        print("Charger found in range")
        pass
    else:
        raise Exception("Charger not found in range")

def test_Check_charger_not_in_range():
    requests.post(url+"post-charger", json=data)
    get_data = requests.get(url=url+"get-chargers-in-range/" + str(data["coordinate_lat"] + 0.00486) + "/" + str(data["coordinate_long"]) + "/" + "50") # Find charger in 50m range while standing ~500m away
    if get_data.json() == []:
        print("Charger was correctly not found in range")
        pass
    else:
        raise Exception("Charger still found in range while being outside of range")

# class Delete_charger_and_check_deletion:

#     requests.post(url+"delete-charger-by-id/" + str() + "/test@test.com")

#     get_data = requests.get(url=url+"get-charger-by-email/test@test.com")

#     if get_data.json() != data:
#         print("Delete successful")
#         pass
#     else:
#         raise Exception("Still found charger after attempt to delete")

