# -*- coding:UTF-8 -*-
from App.ChatRobot import tuling_robot


# 微信机器人端接入
def wx_robot(apiley):
    import App.ChatRobot.robot as robots
    robots.wxrobot(apiley)
    robots.embed()





# if __name__ == "__main__":
#     # develop分支测试
#     while True:
#         key = input("choose")
#         if key == "1": #模式一
#             wx_robot()
#         elif key == "2":
#             hum_inte = tuling_robot.hum_inter()
#             print(hum_inte.sendmsg("深圳天气"))







