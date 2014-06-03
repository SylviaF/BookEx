#coding:utf-8

import tornado.web

#param of a book
book_fields = ['isbn', 'title', 'subtitle', 'image', 'author',
			'date_released', 'description']

class BookHandler(tornado.web.RequestHandler):
	def get(self):
		search = dict()
		for key in book_fields:
			search[key] = self.get_argument(key, None)
			if search[key] != None:
				search[key] = search[key].encode("utf-8")
			else: 
				search.pop(key)
		
		coll = self.application.db.books
		
		shouldsearch = False
		for key in search:
			if search[key] != None:
				shouldsearch = True
		
		if shouldsearch:
			books = coll.find(search)
		else:
			books = coll.find()

		result = []
		for book in books:
			del book["_id"]
			result.append(book)

		self.write(str(result))	#不能返回python的list数据格式，需要把list转换成字符串
		#没有把unicode转换成utf-8码

class AddBookHandler(tornado.web.RequestHandler):
	def get(self, isbn=None):
		book = dict()
		if isbn:
			coll = self.application.db.books
			book = coll.find_one({"isbn": isbn})
		self.render("book_edit.html",
			page_title="Burt's Books",
			header_text="Edit book",
			book=book)

	def post(self, isbn=None):
		import time
		coll = self.application.db.books
		book = dict()
		if isbn:
			book = coll.find_one({"isbn": isbn})
		for key in book_fields:
			book[key] = self.get_argument(key, None)

		if isbn:
			coll.save(book)
		else:
			book['date_added'] = int(time.time())
			coll.insert(book)

		del book['_id']
		self.write(book)

class DeleteBookHandler(tornado.web.RequestHandler):
	def delete(self):
		book_id = self.get_argument('isbn')
		coll = self.application.db.books
		books_to_delete = coll.find({'isbn': book_id})

		result = []
		for book in books_to_delete:
			del book["_id"]
			result.append(book)

		coll.remove({'isbn': book_id})
		self.write(str(result))