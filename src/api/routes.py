"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/create_account", methods=["POST"])
def create_user():

    data = request.get_json()
    email = data["email"]
    new_user = User.query.filter_by(email=data['email']).first()
    if new_user:

        return jsonify({
            "msj": "User it's exist",
        }), 200

    else:
        datos = User()
        datos.email = email
        datos.password = data["password"]
        datos.is_active = True

    db.session.add(datos)
    db.session.commit()

    return jsonify({
        "msj": "Account created",
        "status": "success"
    }), 200


@api.route("/sign_account", methods=["POST"])
def login_user():
    data = request.get_json()
    new_user = User.query.filter_by(email=data["email"]).first()
    if new_user:
        if data["password"] == new_user.password:
            token = create_access_token(identity=new_user.email)

            return jsonify({
            "token": token,
            "msj": "Access success",
        }), 200
        else:
            return jsonify({
            "msg": "clave inválida",
            "status": "unauthorized"
        }), 401
    else:
        return jsonify({
            "msg": "Usuario no Existe",
            "status":"unauthorized"
        }),201