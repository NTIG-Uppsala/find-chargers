import requests

url = 'http://localhost:8080/address/22' #22 is id for request
address = {'address': 'Kummingatan'}

response = requests.post(url, json=address)

response = requests.get(url)
response_json = response.json()

print("Response was " + str(response_json))
if response_json == {"22": {"address": "Kummingatan", "id": 22}}:
    print("Test was successful")

else:
    raise Exception("Test failed")