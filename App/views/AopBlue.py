# -*- coding:UTF-8 -*-
from flask import Blueprint, abort, request

blue = Blueprint("first_blue", __name__, url_prefix='/blue/')


@blue.route('/index/')
def index():
    print("请求来了")
    return 'Flask Index'


@blue.route('/bug/')
def bug():
    abort(401)

    return 'make 401'


@blue.before_request
def process_request():
    print("在请求之前")

    print(request.path)

    print(request.remote_addr)

    if request.path == "/api/index/":
        if request.remote_addr == "10.0.119.193":
            return '本网站不欢迎你'


@blue.errorhandler(401)
def process_exception(e):
    print(e)

    return '你的程序有bug'
