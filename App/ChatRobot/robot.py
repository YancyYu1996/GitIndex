# -*- coding:UTF-8 -*-
from wxpy import *
from App.ChatRobot import wx_friend
from App.ChatRobot import robot_conf
class wxrobot:
    def __init__(self,apikey):
        self.apikey = apikey

    bot = Bot(cache_path=True,qr_path=robot_conf.qr_path)
    #bot = Bot(cache_path=True)
    @bot.register(msg_types=FRIENDS)
    def auto_reply(self,msg):
        """自动接受好友请求"""
        wx_friend.wx_chat(apikey=self.apikey).auto_accept_friends(msg)

    @bot.register(chats=Friend)
    def auto_reply(self,msg):
        """自动回复好友"""
        if msg.type == TEXT:
            wx_friend.wx_chat(apikey=self.apikey).auto_reply(msg)
        elif msg.type == RECORDING:
            return "主人在敲代码，稍后回复。。。"
        else:
            pass




