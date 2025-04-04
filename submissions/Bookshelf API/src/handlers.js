const { nanoid } = require("nanoid");
const books = require("./books");

const saveBooksHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const  id  = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);
  
  if (!name) {
    const ress = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    ress.code(400);
    return ress;
  } else if (readPage > pageCount) {
    const ress = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    ress.code(400);
    return ress;
  } 

  const ress = h.response({
    status: "success",
    message: "Buku berhasil ditambahkan",
    data: {
      bookId: books
    }
  });
  ress.code(201);
  return ress;

};

const displayAllBooksHandler = (request, h) => {

  const ress = h.response({
    status: 'success',
    data: {
      books: books.map(({id, name, publisher}) => ({id, name, publisher}))
    }
  })
  ress.code(200)
  return ress
}

const displayDetailBookHandler = (req, h) => {
  const { id } = req.params;
  const book = books.findIndex((b) => b.id === id);

  if (book !== undefined) {
    const ress = h.response({
      status: "success",
      data: {
        book,
      },
    });
    ress.code(200);
    return ress;
  }

  const ress = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  ress.code(404);
  return ress;
};

const updateByIdBookHandler = (req, h) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const book = books.findIndex((b) => b.id === id);

  if (book !== -1) {
    const ress = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    ress.code(200);
    return ress;
  } else if (!name) {
    const ress = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    ress.code(400);
    return ress;
  } else if (readPage > pageCount) {
    const ress = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    ress.code(400);
    return ress;
  } else {
    const ress = h.response({
      status: "fail",
      message: "gagal memperbarui buku. Id tidak ditemukan",
    });
    ress.code(404);
    return ress;
  }
};

const deleteByIdBookHandler = (req, h) => {
  const { id } = req.params;
  const book = books.findIndex((b) => b.id === id);

  if (book !== -1) {
    const ress = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    ress.code(200);
    return ress;
  }

  const ress = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  ress.code(404);
  return ress;
};

module.exports = {
  saveBooksHandler,
  displayAllBooksHandler,
  displayDetailBookHandler,
  updateByIdBookHandler,
  deleteByIdBookHandler
};
