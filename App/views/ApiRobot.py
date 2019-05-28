import App.ChatRobot,json
from flask import Blueprint, request, jsonify, session
from App.ext import db
from App.models import UserChatInformation,KeyMap
from time import sleep
from threading import Thread
import inspect
import ctypes

Robot = Blueprint("robot_blue", __name__)
# 储存数据的方法
def save_msg(username,msg,data):
    UserInformation = UserChatInformation()
    UserInformation.username = username
    UserInformation.chat_information = msg
    UserInformation.recv_information = str(data)
    db.session.add(UserInformation)
    db.session.commit()

    userinforms = UserChatInformation.query.filter(UserChatInformation.username == session.get("username"))

    # 将用户的信息值从对象中取出来
    informs = []

    for userinform in userinforms:
        usermsg = {}  # 用来存放用户的信息值
        usermsg["username"] = userinform.username
        usermsg["chat_information"] = userinform.chat_information
        usermsg["recv_information"] = userinform.recv_information
        usermsg["chat_time"] = str(userinform.chat_time)
        usermsg["id"] = userinform.id
        informs.append(usermsg)

    # 将msg变成json文件写入本地data文件夹
    with open(r"App\static\html\mode\data\data.json", "wt") as fw:
        json.dump(informs, fw)
    # 打印机器人回复的消息
    print(data)

# 强制stop线程的方法
def _async_raise(tid, exctype):
    """raises the exception, performs cleanup if needed"""
    if not inspect.isclass(exctype):
        exctype = type(exctype)
    res = ctypes.pythonapi.PyThreadState_SetAsyncExc(tid, ctypes.py_object(exctype))
    if res == 0:
        raise ValueError("invalid thread id")
    elif res != 1:
        # """if it returns a number greater than one, you're in trouble,
        # and you should call it again with exc=NULL to revert the effect"""
        ctypes.pythonapi.PyThreadState_SetAsyncExc(tid, None)
        raise SystemError("PyThreadState_SetAsyncExc failed")

def stop_thread(thread):
    _async_raise(thread.ident, SystemExit)

@Robot.route("/ChatRobot/<mode>/", methods=["POST"])     # 登录
@Robot.route("/ChatRobot/", methods=['GET',"POST"])     # 登录
# 登录
def Chat(mode=None):
    global thing
    if request.method == "GET":
        print("进入get")
        # if session.get("username"):
        #     usernamea = session.get("username")
        return jsonify({"msg": "GET"})

    elif request.method == "POST":
        if mode == "wxChat":
            # 创建一个图片
            with open("App\static\m.png","wt"):
                pass
            thing = Thread(target=App.ChatRobot.wx_robot)
            thing.start()
            sleep(2)  # 创建子进程后等待2秒
            return jsonify({"status": "wxconnect"}), 201

        elif mode=="wxChatend":
            stop_thread(thing)
            print("wxchat关闭")
            return jsonify({"status": "disconnect"}), 201
        elif mode == "location":  # 如果是定位，则将经纬度存入数据库
            username = session.get("username")
            # 若未登录
            if username is None:
                return jsonify({"status": "not log in"}), 401
            lng = request.form.get("lng")  # 经度
            lat = request.form.get("lat")  # 纬度

            UserInformation = UserChatInformation()
            UserInformation.username = username

            UserInformation.chat_information = "定位"
            UserInformation.recv_information = "经度"+lng+","+"纬度"+lat

            db.session.add(UserInformation)

            db.session.commit()
            return jsonify({"status": "location"}), 201
        elif mode=="insert":
            # 将数据插入到数据库
            username = session.get("username")
            # 若未登录
            if username is None:
                return jsonify({"status": "not log in"}), 401
            keys = request.form.get("keys")
            value = request.form.get("value")

            # 现在数据库中查找关键字 如果重复将其覆盖
            keymap_all = KeyMap.query.all()
            for word in keymap_all:
                if keys == word.keys and username == word.username:
                    word.value = value
                    db.session.add(word)
                    db.session.commit()
                    # 将数据存到config文件中  方便取出
                    with open("App/config.txt", "wt") as fw:
                        keymap = KeyMap.query.all()
                        for word in keymap:
                            fw.write(word.username + "," + word.keys + "," + word.value + "\n")
                    return jsonify({"msg": "insert success"})

            # 若没有创建一个新的对象
            keymap = KeyMap()
            keymap.username = username
            keymap.keys = keys
            keymap.value = value

            db.session.add(keymap)
            db.session.commit()
            # 将数据存到config文件中  方便另一个线程取出
            with open("App/config.txt", "wt") as fw:
                keymap = KeyMap.query.all()
                for word in keymap:
                    fw.write(word.username + "," + word.keys + ","+word.value+"\n")
            return jsonify({"msg":"insert success"})

        else:  # 如果是网页端交互
            hum_inte = App.ChatRobot.tuling_robot.hum_inter()  # 创建人机交互对象
            if hum_inte:
                username = session.get("username")
                # 若未登录
                if username is None:
                    return jsonify({"status": "not log in"}), 401
                msg = request.form.get("msg")
                # 先判断是否有定位关键字
                if "定位" in msg: # 如果有定位两个字
                    data = {"text":"location"}
                    return jsonify(data), 201
                # 现在数据库中查找关键字
                keymap = KeyMap.query.all()
                for word in keymap:
                    if (word.keys in msg) and (username == word.username):
                        print(word.keys,word.value)
                        data={"text":word.value,"url":""}
                        save_msg(username, msg, word.value)
                        return jsonify(data), 201
                data = hum_inte.sendmsg(msg) # 接收到的字是一个字典,如果是新闻，显示一个列表
                # 避免出错 加上一个url属性
                if not data.get("url"):
                    data["url"] = ""
                # 将数据和回复存储到数据库中
                print("msg=",data)
                save_msg(username, msg, data["text"])
                del hum_inte
                return jsonify(data), 201
            else:
                print("聊天对象没有被创建")
                msg = {"msg":"ObjFail"}
                return jsonify(msg), 401

# 退出
@Robot.route("/ChatRobot/logout/", methods=['GET',"POST"])
def logout():
    if request.method == "POST":
        print(session.get('username'))
        print(session.get('passwd'))
        if session.get('username'):
            session.pop('username')  # 删除session
        if session.get('passwd'):
            session.pop('passwd')  # 删除session
        msg = {"msg": "delect"}
        return jsonify(msg), 201

# 请求聊天记录
@Robot.route("/ChatRobot/ChatInform/", methods=['GET',"POST"])
def ChatInform():
    if request.method == "GET":
        informs = []

        # userinforms = UserChatInformation.query.all()
        userinforms = UserChatInformation.query.filter(UserChatInformation.username == session.get("username"))

        # 将用户的信息值从对象中取出来
        for userinform in userinforms:
            usermsg = {}  # 用来存放用户的信息值
            usermsg["username"] = userinform.username
            usermsg["chat_information"] = userinform.chat_information
            usermsg["recv_information"] = userinform.recv_information
            usermsg["chat_time"] = str(userinform.chat_time)
            usermsg["id"] = userinform.id
            print(usermsg)
            informs.append(usermsg)

        print(informs)
        # 将msg变成json文件写入本地data文件夹
        with open(r"App\static\html\mode\data\data.json","wt") as fw:
            json.dump(informs, fw)
        return jsonify(informs), 201


