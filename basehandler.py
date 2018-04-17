# -*- coding: utf-8 -*-

# import os
# import threading
# from os import path as op
import tornado.httpserver
import pymysql
# from fdfs_client.client import *
# import config


class BaseHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.mysql_conn = pymysql.connect(host='172.28.189.101', port=3306, user='root',
                                    passwd='P@ssword0', db='facerecognize', charset='utf8')
        # configpath = os.path.join(os.path.dirname(__file__),"../configs/fdfsclient.conf")
        # self.Fdfs_client = Fdfs_client(configpath)

    def upload(self, filebuffer, file_ext_name = None, meta_dict = None):
        rec = self.Fdfs_client.upload_by_buffer(filebuffer, file_ext_name, meta_dict)
        return rec



