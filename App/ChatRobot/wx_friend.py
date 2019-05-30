# 好友功能
from wxpy import *

from App import robot_conf

tuling = Tuling(api_key=robot_conf.api_key)

def auto_accept_friends(msg):
    """自动接受好友"""
    # 接受好友请求
    new_friend = msg.card.accept()
    # 向新的好友发送消息
    new_friend.send('我已自动接受了你的好友请求')

def auto_reply(msg):
    """自动回复"""
    # 关键字回复 or 图灵机器人回复
    if not keyword_reply(msg):
        tuling_reply(msg)

def keyword_reply(msg):
    """关键字回复"""
    with open("App/config.txt","rt") as fr:
        print("openfile")
        while True:
            data = fr.readline()
            print(data)
            if not data:
                break
            msgl = data.split(",")
            keys = msgl[1]
            value = msgl[2]
            print(keys)
            if keys in msg.text:
                return msg.reply(value)


    # if '你叫啥' in msg.text or '你叫啥名字' in msg.text:
    #     return msg.reply('沃德天·维森莫·拉莫帅·帅德布耀·不耀德')
    # pass


def tuling_reply(msg):
    """图灵机器人回复"""
    tuling.do_reply(msg)
