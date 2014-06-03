#coding:utf-8

from urls import urls

import tornado.web
import os
import pymongo

SETTINGS = dict(
	template_path=os.path.join(os.path.dirname(__file__), "templates"),
	static_path=os.path.join(os.path.dirname(__file__), "static"),
	debug=True,
)

#database connection
conn = pymongo.Connection("localhost", 27017)

application = tornado.web.Application(
                handlers = urls,
                **SETTINGS
)

application.db = conn["bookex"]