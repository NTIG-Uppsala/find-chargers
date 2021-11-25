import requests
import json

url = 'http://localhost:8080/address/59.8402037/17.6504097/100000000'

response = requests.get(url)
response_json = response.json()
data = json.load(open("address.json", encoding="utf8"))

print("Response was " + str(response_json))
if response_json == data["addresses"]:
    print("Test was successful")

else:
    raise Exception("Test failed")
