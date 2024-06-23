import { Router, Request, Response } from "express";

const router = Router();
const API_BASE_URL = "https://api2.isbndb.com";
const API_KEY = "53946_32b666deb36b25ca65996717687cb4a2"

router.post("/search", async (req: Request, res: Response) => {
  const { isbn } = req.body;

  try {
    const response = await fetch(`${API_BASE_URL}/book/${isbn}`, {
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Book not found.");
    }

    const data = await response.json();
    res.status(200).json(data.book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(404).json({ error: "Book not found" });
  }
});

export default router;
