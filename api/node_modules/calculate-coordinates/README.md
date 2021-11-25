# calculate-coordinates
Use this API fro calculate the distance between two coordinates. This API uses Haversine formula

## Installing

Using npm:

```bash
$ npm install calculate-coordinates
```

## Example

### Returning distance in Kilometers(KM)

```js
const calculate = require('calculate-coordinates');

let centerCoordinates = [-23.0000, -46.0000];
let extremeCoordinates = [-23.5000, -46.5000];

let result = calculate.fromCoordinatesReturningKM(centerCoordinates,extremeCoordinates);
console.log(result);
// 75.50143971474138

```

### Returning distance in Meters(M)

```js
const calculate = require('calculate-coordinates');

let centerCoordinates = [-23.0000, -46.0000];
let extremeCoordinates = [-23.5000, -46.5000];

let result = calculate.fromCoordinatesReturningM(centerCoordinates,extremeCoordinates);
console.log(result);
// 75501.43971474138

```
