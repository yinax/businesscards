# -*- coding: utf-8 -*-
from webmodules import webhandlers

# 启动端口
port = 2000
isDebug = True

# 数据库连接参数
config = {
    'host': 'rm-uf6b17uut6rr6ioutyo.mysql.rds.aliyuncs.com',
    'port': 3306,
    'user': 'root',
    'password': 'Abcd@1234',
    'db': 'facegame',
    'charset': 'utf8',
}

# Routers
rotuers = [(r'/', webhandlers.IndexHandler),
           (r'/addclientinfo', webhandlers.AddClientInfoHandler),
           (r'/savecamimg', webhandlers.SaveCamImgHandler),
           (r'/uploadcam', webhandlers.UploadCamHandler)
           ]
