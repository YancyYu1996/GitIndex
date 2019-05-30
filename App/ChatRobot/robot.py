from wxpy import *

from App import robot_conf
from App.ChatRobot import wx_friend
bot = Bot(cache_path=True, qr_path=robot_conf.qr_path)

class wxrobot:

    #bot = Bot(cache_path=True)
    @bot.register(msg_types=FRIENDS)
    def auto_reply(msg):
        """自动接受好友请求"""
        wx_friend.auto_accept_friends(msg)

    @bot.register(chats=Friend)
    def auto_reply(msg):
        """自动回复好友"""
        if msg.type == TEXT:
            wx_friend.auto_reply(msg)
        elif msg.type == RECORDING:
            return "主人在敲代码，稍后回复。。。"
        else:
            pass




