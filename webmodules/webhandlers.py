# -*- coding: utf-8 -*-

from __future__ import print_function

import tornado.web

import webmodules.dao as dao
import base64
import json
from os import path as op
from PIL import Image
from fdfs_client.client import *
import uuid


class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('businesscards.html')


class AddClientInfoHandler(tornado.web.RequestHandler):
    def post(self):
        try:
            name = self.get_arguments("name")
            phone = self.get_arguments("phone")
            email = self.get_arguments("email")
            comment = self.get_arguments("comment")
            info = [{'name': name[0], 'phone': phone[0], 'email': email[0], 'comment': comment[0]}]
            encode_json = json.dumps(info[0])  # 字符串
            decode_json = json.loads(encode_json)  # 字典
            dao.saveclientinfo(decode_json)
            self.write({'status': "ok"})
        except:
            self.write({'status': "500"})


class SaveCamImgHandler(tornado.web.RequestHandler):
    def post(self):
        try:
            post_data = {}
            for key in self.request.arguments:
                post_data[key] = self.get_arguments(key)
            b64imgdata = post_data["b64imgdatacam"][0]
            imgdata = base64.b64decode(b64imgdata)
            # file = open('D:/Users/maol.GOLDEN-TECH/PyCharmPro/businesscards/static/pic/card.jpg', 'wb')
            file = open('/root/face_game/businesscards/static/pic/card.jpg', 'wb')
            file.write(imgdata)
            file.close()
            self.write({'status': "ok"});
        except:
            self.write({'status': "500"})


class UploadCamHandler(tornado.web.RequestHandler):
    def initialize(self):
        configpath = os.path.join(os.path.dirname(__file__), "../fdfsclient.conf")
        self.Fdfs_client = Fdfs_client(configpath)

    def post(self):
        try:
            # cardurl = "D:/Users/maol.GOLDEN-TECH/PyCharmPro/businesscards/static/pic/card.jpg"
            cardurl = "/root/face_game/businesscards/static/pic/card.jpg"

            # 图片上传服务器
            cardpic = self.Fdfs_client.upload_by_filename(cardurl, None)
            cardurl = "http://101.132.43.3:8000/" + bytes.decode(cardpic["Remote file_id"])
            dao.saveclientcard(self, cardurl)
            self.write({'status': "ok"});
        except:
            self.write({'status': "500"})
