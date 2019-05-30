# -*- coding:UTF-8 -*-
from App.ChatRobot import tuling_robot


# 微信机器人端接入
def wx_robot():
    import App.ChatRobot.robot as robots
    while True:
        robots.wxrobot()


#
#
# if __name__ == "__main__":
#     # develop分支测试
#     while True:
#         key = input("choose")
#         if key == "1": #模式一
#             wx_robot()
#         elif key == "2":
#             hum_inte = tuling_robot.hum_inter("51a1337c2b9d4031b89460045ddec3b7")
#             print(hum_inte.sendmsg("深圳天气"))









