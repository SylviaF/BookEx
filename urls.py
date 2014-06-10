#coding:utf-8

from handlers.index import *
from handlers.user import LoginHandler
from handlers.user import LogoutHandler
from handlers.user import RegisterHandler
from handlers.user import UserInfoHandler
from handlers.index import MainHandler
from handlers.book import BookHandler, AddBookHandler, DeleteBookHandler
from handlers.save import SaveBookHandler
from handlers.borrow import BorrowBookHandler
from handlers.comment import CommentHandler, DeleteCommentHandler

urls = [
    (r'/', MainHandler),
	(r'/found', FoundHandler),
	(r'/notfound', NotFoundHandler),
	(r'/addbook', AddBookShowHandler),
	(r'/homepage', HomepageHandler),
	(r'/book', BookShowHandler),
    (r'/api/v1/users/login', LoginHandler),
    (r'/api/v1/users/logout', LogoutHandler),
    (r'/api/v1/users/register', RegisterHandler),
	(r'/api/v1/info', UserInfoHandler),
    (r'/api/v1/books', BookHandler),
    (r'/api/v1/books/add', AddBookHandler),
    (r'/api/v1/books/delete', DeleteBookHandler),
    (r'/api/v1/savebook', SaveBookHandler),
    (r'/api/v1/borrowbook', BorrowBookHandler),
    (r'/api/v1/comment', CommentHandler),
    (r'/api/v1/comment/delete', DeleteCommentHandler),
]