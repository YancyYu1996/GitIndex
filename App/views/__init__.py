# -*- coding:UTF-8 -*-
from App.views.AopBlue import blue
from App.views.ApiPerson import api
from App.views.ApiRobot import Robot

def init_blue(app):
    app.register_blueprint(blueprint=Robot)
    app.register_blueprint(blueprint=api)
    app.register_blueprint(blueprint=blue)

