# -*- coding:UTF-8 -*-
from flask import Flask

from App.ext import init_ext
from App.settings import envs
from App.views import init_blue

def create_app(env):

    app = Flask(__name__)

    # 初始化app
    app.config.from_object(envs.get(env))

    # 初始化蓝图，路由
    init_blue(app)

    # 初始化第三方库
    init_ext(app)

    return app

