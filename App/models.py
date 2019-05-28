from App.ext import db
import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(16))
    password = db.Column(db.String(60))
    email = db.Column(db.String(60))
    phonenumber = db.Column(db.String(11))

    def model_to_dict(self):
        return {"id": self.id, "name": self.username, "passwd": self.password,"email":self.email,
                "phonenumber":self.phonenumber}

class UserChatInformation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(16))
    chat_information = db.Column(db.Text())
    recv_information = db.Column(db.Text())
    chat_time = db.Column(db.DateTime,default=datetime.datetime.now)

    def model_to_dict(self):
        return {"id": self.id, "name": self.username, "infor": self.chat_information,\
                "recv": self.recv_information,"chat_time": self.chat_time}

class KeyMap(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(16))
    keys = db.Column(db.Text())
    value = db.Column(db.Text())


    def model_to_dict(self):
        return {"id": self.id, "keys": self.keys, "value": self.value}








