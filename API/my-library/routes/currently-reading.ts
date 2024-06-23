import currentlyReading from "../models/currentlyReadingModel";
import { Router } from "express";
import Read from "../models/readModel";

const router = Router()

// Read all currently reading books
router.get("/", async (req, res) => {
    try {
      const books = await currentlyReading.find();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Create a new book in Currently Reading
  router.post("/", async (req, res) => {
    try {
      const newBook = await currentlyReading.create(req.body);
      res.status(201).json(newBook);
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Update a currently reading book
  router.put("/:id", async (req, res) => {
    try {
      const updatedBook = await currentlyReading.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedBook);
    } catch (error) {
      console.error("Error updating book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Delete a currently reading book
  router.delete("/:id", async (req, res) => {
    try {
      await currentlyReading.findByIdAndDelete(req.params.id);
      res.status(204).send();
      console.log("Successfully deleted book");
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Move a book from currently reading to read collection
  router.put("/:id/move-to-read", async (req, res) => {
    try {
      const book = await currentlyReading.findById(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
  
      const readBook = new Read({
        title: book.title,
        author: book.author,
        genre: book.genre,
        pages: book.pages,
        rating: req.body.rating || 0,
        dateFinished: new Date(),
      });
  
      await readBook.save();
      await currentlyReading.findByIdAndDelete(req.params.id);
  
      res.json(readBook);
    } catch (error) {
      console.error("Error moving book:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  export default router