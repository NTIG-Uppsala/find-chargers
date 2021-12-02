## API

To do a post request with the api us the url: https://find-chargers.azurewebsites.net/post-charger 
and do a json body that looks like this  

	{
	"address": mystring,
	"coordinate_lat": myfloat,
	"coordinate_long": myfloat,
	"email_address": mystring,
	"ac_1": myboolean,
	"ac_2": myboolean,
	"chademo": myboolean,
	"ccs": myboolean,
	"user_input": mystring
	}

***

To do a get request with chargers near you us the url: https://find-chargers.azurewebsites.net/get-chargers-in-range/:lat/:long/:max_distance 
and change :lat and :long to the place you're at and :max_distance to how far a way you want to get chargers from in meters.

***

To get all chargers use get request on url: https://find-chargers.azurewebsites.net/get-charger

***

To get all chargers on an email use url: https://find-chargers.azurewebsites.net/get-charger-by-email/:email  
and change :email to the email you want to change

***

To delete charger do post request use url: https://find-chargers.azurewebsites.net/delete-charger-by-id/:id/:email  

