import Read from "../models/readModel";
import { Router } from "express";

const router = Router();

// Create a new book
router.post("/", async (req, res) => {
  try {
    const newBook = await Read.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read all books
router.get("/", async (req, res) => {
  try {
    const books = await Read.find();
    console.log("Books fetched: ", books);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a specific book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Read.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a book by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Read.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a book by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Read.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
