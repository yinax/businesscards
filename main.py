# -*- coding: utf-8 -*-

import os.path
import config
from tornado.options import define, options
import tornado.web
import tornado.httpserver

from tornado import httpserver

define("port", default=config.port, help="run on the given port", type=int)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    app = tornado.web.Application(
        handlers=config.rotuers,
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=config.isDebug,
    )

    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.configure('tornado.platform.asyncio.AsyncIOLoop')
    tornado.ioloop.IOLoop.instance().start()
