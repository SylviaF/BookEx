#coding:utf-8

from handlers.index import MainHandler
from handlers.book import BookHandler, AddBookHandler, DeleteBookHandler

urls = [
    (r'/', MainHandler),
    (r'/api/v1/books', BookHandler),
    (r'/api/v1/books/add', AddBookHandler),
    (r'/api/v1/books/delete', DeleteBookHandler),
]