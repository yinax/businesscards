# -*- coding: utf-8 -*-
import uuid
import pymysql
import config


# 提交客户表单信息
def saveclientinfo(self):
    conn = pymysql.connect(**config.config)

    # 将score存储到DB
    cur = conn.cursor()
    getid = str(uuid.uuid1())
    sql = "insert into client_info(client_info_id, client_name,client_phone,client_email,client_comment) VALUES ('" + getid + "','" + self['name'] + "', '" + self['phone'] + "',' " + self['email'] + "', '" + self['comment'] + "')"
    cur.execute(sql)
    conn.commit()
    conn.close()


# 提交客户名片信息
def saveclientcard(self,cardurl):
    conn = pymysql.connect(**config.config)

    # 将score存储到DB
    cur = conn.cursor()
    getid = str(uuid.uuid1())
    sql = "insert into client_cards(client_card_id, client_card_url) VALUES ('" + getid + "','" + cardurl + "')"
    print(sql)
    cur.execute(sql)
    conn.commit()
    conn.close()


