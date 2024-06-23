import currentlyReading from "../models/currentlyReadingModel";
import wantToRead from "../models/wantToReadModel";
import { Router } from "express";

const router = Router();

// Create a new book in "want to read"
router.post("/", async (req, res) => {
  try {
    const newBook = await wantToRead.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read all books in "want to read"
router.get("/", async (req, res) => {
  try {
    const books = await wantToRead.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a book from "want to read" by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await wantToRead.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Move book from want to read to currently reading

router.put("/:id/move-to-currently-reading", async (req, res) => {
  try {
    const book = await wantToRead.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    const currentlyReadingBook = new currentlyReading({
      title: book.title,
      author: book.author,
      genre: book.genre,
      pages: book.pages,
      startDate: new Date(),
    });

    await currentlyReadingBook.save();
    await wantToRead.findByIdAndDelete(req.params.id);

    res.json(currentlyReadingBook);
  } catch (error) {
    console.error("Error moving book to currently reading:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
