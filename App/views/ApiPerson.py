# -*- coding:UTF-8 -*-
from flask import Blueprint, request, jsonify, make_response, session, render_template
from App.ext import db
from App.models import User
import re

email_match = r"\w+@\w+.com"
phone_match = r"\d{11}"
api = Blueprint("api_blue", __name__, url_prefix='/api/')



@api.route("/login/", methods=['GET', "POST", "PUT", 'DELETE'])  # 登录
# 登录
def login():
    if request.method == "GET":
        data = {"msg": "Login"}
        return jsonify(data)

    elif request.method == "POST":
        username = request.form.get("username")
        passwd = request.form.get("passwd")
        issaved = request.form.get("IsSaved")
        if not session.get("username"):
            session['username'] = username
        if issaved:
            if not session.get("passwd"):
                session['passwd'] = passwd

        # 判断数据库中有没有用户名
        users = User.query.all()
        for user in users:
            if (username == user.username) and (passwd == user.password):
                data = {"msg": "LoginOK"}  # 登录成功后
                # 判断IsSaved是否被选中
                if request.form.get("IsSaved"):
                    # 将密码存在cookie中
                    print("login ok")
                    session['passwed'] = passwd
                return jsonify(data), 200
        else:
            data = {"msg": "LoginFail"}
            return jsonify(data), 401


@api.route("/register/", methods=['GET', "POST"])  # 注册
@api.route("/register/<mode>/", methods=['GET', "POST"])  # 用于检测邮箱和手机
def register(mode=None):
    if request.method == "GET":
        data = {"msg": "Register"}
        return jsonify(data)

    elif request.method == "POST":
        if mode == "match":
            username = request.form.get("username")
            passwd = request.form.get("passwd")
            passwd2 = request.form.get("passwd2")
            email = request.form.get("email")
            phone_number = request.form.get("phone_number")
            print(username,passwd,passwd2,email,phone_number)
            # 用来判断用户名是否重复，两次密码是否一致
            # 判断数据库中有没有用户名
            users = User.query.all()
            for user in users:
                if username == user.username:
                    return jsonify({"msg": "2","status":""}), 201  #用户已经存在
            if passwd != passwd2:
                return jsonify({"msg": "3","status":""}), 201 #两次密码不同
            # 用正则表达式判断邮件和手机号码格式对不对
            res = re.fullmatch(email_match,email)
            if not res:
                return jsonify({"msg": "4", "status": ""}), 201 #邮箱格式错误
            res2 = re.fullmatch(phone_match,phone_number)
            if not res2:
                return jsonify({"msg": "5", "status": ""}), 201 #电话号码格式错误
            return jsonify({"msg": "信息正确", "status": True}), 201

        else:
            username = request.form.get("username")
            passwd = request.form.get("passwd")
            email = request.form.get("email")
            phone_number = request.form.get("phone_number")

            print("uname=", username)
            print("passwd=", passwd)

        # 判断完后插入
        user = User()
        user.username = username
        user.password = passwd
        user.email = email
        user.phonenumber = phone_number
        db.session.add(user)

        db.session.commit()

        return jsonify({"msg": "注册成功,请先登录", "username": username}), 201


@api.route("/ChangePasswd/", methods=['GET', "POST"])  # 修改密码
@api.route("/ChangePasswd/<mode>/", methods=['GET', "POST"])  # 修改密码
def ChangePasswd(mode=None):
    if request.method == "POST":
        if mode == "match":
            username = request.form.get("username")
            passwd = request.form.get("passwd")
            passwd2 = request.form.get("passwd2")

            print(username, passwd, passwd2)
            # 用来判断用户名是否重复，两次密码是否一致

            # 判断数据库中有没有用户名
            users = User.query.all()
            for user in users:
                if username == user.username:
                    if passwd != passwd2:
                        return jsonify({"msg": "3", "status": ""}), 201  #两次密码不同
                    return jsonify({"msg": "信息正确", "status": True}), 201
            return jsonify({"msg": "6", "status": ""}), 201  # 无此用户

        else:
            username = request.form.get("username")
            passwd = request.form.get("passwd")

            print("uname=", username)
            print("passwd=", passwd)

            # 判断完后修改
            users = User.query.all()
            for user in users:
                if username == user.username:
                    user.password = passwd

            db.session.commit()

        return jsonify({"msg": "修改密码成功,请先登录", "username": username}), 201