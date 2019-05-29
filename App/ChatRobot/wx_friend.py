# -*- coding:UTF-8 -*-
# 好友功能
from wxpy import *
# import tuling_obot
# from App.ChatRobot.robot_conf import *

class wx_chat:
    def __init__(self,apikey):
        self.apikey = apikey
        self.tuling = Tuling(api_key=self.apikey)

    def auto_accept_friends(msg):
        """自动接受好友"""
        # 接受好友请求
        new_friend = msg.card.accept()
        # 向新的好友发送消息
        new_friend.send('我已自动接受了你的好友请求')

    def auto_reply(self,msg):
        """自动回复"""
        # 关键字回复 or 图灵机器人回复
        self.keyword_reply(msg) or self.tuling_reply(msg)

    def keyword_reply(msg):
        """关键字回复"""
        with open("App/config.txt","rt") as fr:
            while True:
                data = fr.readline()
                if not data:
                    print("break")
                    break
                msgl = data.split(",")
                keys = msgl[1]
                value = msgl[2]
                print(keys)
                if keys in msg.text:
                    return msg.reply(value)

            return False

    # if '你叫啥' in msg.text or '你叫啥名字' in msg.text:
    #     return msg.reply('沃德天·维森莫·拉莫帅·帅德布耀·不耀德')
    # pass


    def tuling_reply(self,msg):
        """图灵机器人回复"""
        self.tuling.do_reply(msg)
