const {
  saveBooksHandler,
  displayAllBooksHandler,
  displayDetailBookHandler,
  updateByIdBookHandler,
  deleteByIdBookHandler,
} = require("./handlers");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: saveBooksHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: displayAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: displayDetailBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateByIdBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteByIdBookHandler,
  },
];

module.exports = routes;
