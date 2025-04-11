import json
import os
from flask import Flask, send_from_directory, render_template
from flask import request
from flask_cors import CORS
from flaskr.engine import find_nearby
from flaskr.storage import register_user_in_storage

app = Flask(__name__, )
cors = CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/get_nearby", methods=["GET"])
def get_nearby():

    lat = float(request.args.get("lat"))
    lng = float(request.args.get("lng"))

    return json.dumps([ob.__dict__ for ob in find_nearby(lat, lng, 2)])


@app.route("/register", methods=["POST"])
def register_user():
    content = request.json
    register_user_in_storage(content["id"], content["lat"], content["lng"], content["acc"])
    return "success"
