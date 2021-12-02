import requests
import json

url = "http://localhost:8080/"
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

# Post charger
requests.post(url+"post-charger", json=data)

# Check charger by email
get_data = requests.get(url=url+"get-charger-by-email/test@test.com")

if get_data.json() == data:
    print("Charger found in database")
else:
    raise Exception("Charger not found in database")

# Check charger in range
get_data = requests.get(url=url+"get-chargers-in-range/" + str(data["coordinate_lat"] + 0.00486) + "/" + data["coordinate_long"] + "/" + 1000) # Find charger in 1000m range while standing ~500m away
if get_data.json() == data:
    print("Charger found in range")
else:
    raise Exception("Charger not found in range")

get_data = requests.get(url=url+"get-chargers-in-range/" + str(data["coordinate_lat"] + 0.00486) + "/" + data["coordinate_long"] + "/" + 50) # Find charger in 50m range while standing ~500m away
if get_data.json() != data:
    print("Charger was correctly not found in range")
else:
    raise Exception("Charger still found in range while being outside of range")

# Delete charger and check deletion
id_to_delete = get_data[id]

requests.post(url+"delete-charger-by-id/"+id_to_delete)

get_data = requests.get(url=url+"get-charger-by-email/test@test.com")

if get_data.json() != data:
    print("Delete successful")
else:
    raise Exception("Still found charger after attempt to delete")

