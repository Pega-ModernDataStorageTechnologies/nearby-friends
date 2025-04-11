# App to show nearby friends

Simple app to show friends that are near you.

## Getting started

### Common steps

1. `cd frontend`
2. `npm install`
3. `cd ..`
4. `cd backend`
5. `python -m venv .venv`
6. `.venv/Scripts/activate`
7. `pip install -r requirements.txt`

## Launch with just list

First terminal window
1. `cd backend`
2. `python -m flask --app flaskr run`

Second terminal window
1. `export URL="http://localhost:5000"`
2. `cd frontend`
3. `npm start`

## Launch with map

First terminal window
1. `cd backend`
2. `flask --app flaskr run`

Second terminal window, map api key and map id can be created following steps here: 
- [API key](https://developers.google.com/maps/get-started#api-key)
- [Map ID](https://developers.google.com/maps/documentation/javascript/map-ids/mapid-over)

1. `cd frontend`
2. `export URL="http://localhost:5000"`
3. `export GOOGLE_MAPS_API_KEY={Your API key}`
4. `export MAP_ID={Your Map ID}`
5. `npm start`