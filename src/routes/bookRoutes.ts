import { Router, type Request, type Response } from "express";

const router = Router();

interface Book {
  id: number;
  title: string;
  author: string;
}

const books: Book[] = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Road", author: "Cormac McCarthy" },
];

router.get("/books", (req: Request, res: Response) => {
  res.json(books);
});

router.get("/books/:id", (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id!);
  const book = books.find((b) => b.id === bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found!" });
  }
});

router.post("/books", (req: Request, res: Response) => {
  const newBook: Book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

router.put("/books/:id", (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id!);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== 1) {
    books[bookIndex] = {
      id: bookId,
      title: req.body.title,
      author: req.body.author,
    };
    res.json(books[bookIndex]);
  } else {
    res.status(404).json({ message: "Book not found!" });
  }
});

router.delete("/books/:id", (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id!);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "book not fund" });
  }
});

export default router;
