import requests
import json
from App.ChatRobot.robot_conf import *

class hum_inter:
    def __init__(self):
        """
              直接点击测试图灵机器人
              图灵机器人免费申请地址 http://www.tuling123.com
        """
        self.api_url = 'http://www.tuling123.com/openapi/api'

    def sendmsg(self,msg):

        self.msg = {'key': api_key, 'info': "" or msg,"userid":"wechat-robot"}
        return self.recvmsg()

    def recvmsg(self):
        req = requests.post(self.api_url, data=self.msg).text
        replys = json.loads(req)
        print(json.loads(req))
        return replys




