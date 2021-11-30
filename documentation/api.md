## API

To do a post request with the api us the url: https://find-chargers.azurewebsites.net/address/:id  
and do a json body that looks like this  
`{
	"address": "Address",
	"coordinates":[lat, long]
}`  
(note: you can not post on a id that has already been used)  

***

To do a get request with the api us the url: https://find-chargers.azurewebsites.net/address/:lat/:long/:max_distance  
and change lat and long to the place you're at and max_distance to how far a way you want to get chargers from in meters.
