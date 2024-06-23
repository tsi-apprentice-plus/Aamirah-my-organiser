import request from "supertest";
import mongoose from "mongoose";
import app from "../API/my-library/app";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";
import currentlyReadingModel from "../API/my-library/models/currentlyReadingModel";
const DB_URI = "mongodb://127.0.0.1:27017/my-library";

beforeAll(async () => {
  await mongoose.connect(DB_URI, {});
});

afterAll(async () => {
  await mongoose.connection.close();
});

let mockBook = {
  title: "Test Book",
  author: "Test Author",
  genre: "Fiction",
  pages: 300,
};

let bookId: string;

let mockCurrentlyReadingBook = {
  title: "Test Currently Reading Book",
  author: "Test Author",
  genre: "Fiction",
  pages: 300,
  startDate: new Date(),
};
let currentlyReadingBookId: string;

let mockWantToReadBook = {
  title: "Test Want To Read Book",
  author: "Test Author",
  genre: "Fiction",
  pages: 250,
};
let wantToReadBookId: string;
//read

describe("CRUD operations for /books endpoint", () => {
  it("should create a new book", async () => {
    const response = await request(app)
      .post("/books")
      .send(mockBook)
      .expect(201);

    bookId = response.body._id;

    expect(response.body.title).toBe(mockBook.title);
    expect(response.body.author).toBe(mockBook.author);
    expect(response.body.genre).toBe(mockBook.genre);
    expect(response.body.pages).toBe(mockBook.pages);
  }, 10000);

  it("should fetch all books", async () => {
    const response = await request(app).get("/books").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  }, 10000);

  it("should fetch a specific book by id", async () => {
    const response = await request(app).get(`/books/${bookId}`).expect(200);

    expect(response.body._id).toBe(bookId);
  }, 10000);

  it("should update a book by id", async () => {
    const updatedBook = {
      title: "Updated Title",
      author: "Updated Author",
      genre: "Updated Genre",
      pages: 400,
    };

    const response = await request(app)
      .put(`/books/${bookId}`)
      .send(updatedBook)
      .expect(200);

    expect(response.body._id).toBe(bookId);
    expect(response.body.title).toBe(updatedBook.title);
    expect(response.body.author).toBe(updatedBook.author);
    expect(response.body.genre).toBe(updatedBook.genre);
    expect(response.body.pages).toBe(updatedBook.pages);
  }, 10000);

  it("should delete a book by id", async () => {
    const response = await request(app).delete(`/books/${bookId}`).expect(200);

    expect(response.body.message).toBe("Book deleted successfully");
  }, 10000);
});

// currently-reading

describe("CRUD operations for /currently-reading endpoint", () => {
  it("should create a new book in currently reading", async () => {
    const response = await request(app)
      .post("/currently-reading")
      .send(mockCurrentlyReadingBook)
      .expect(201);

    currentlyReadingBookId = response.body._id;

    expect(response.body.title).toBe(mockCurrentlyReadingBook.title);
    expect(response.body.author).toBe(mockCurrentlyReadingBook.author);
    expect(response.body.genre).toBe(mockCurrentlyReadingBook.genre);
    expect(response.body.pages).toBe(mockCurrentlyReadingBook.pages);
    expect(response.body.startDate).toBe(
      mockCurrentlyReadingBook.startDate.toISOString()
    );
  });

  it("should fetch all books in currently reading", async () => {
    const response = await request(app).get("/currently-reading").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should update a book in currently reading by id", async () => {
    const updatedBook = {
      title: "Updated Title",
      author: "Updated Author",
      genre: "Updated Genre",
      pages: 400,
      startDate: new Date(),
    };

    const response = await request(app)
      .put(`/currently-reading/${currentlyReadingBookId}`)
      .send(updatedBook)
      .expect(200);

    expect(response.body._id).toBe(currentlyReadingBookId);
    expect(response.body.title).toBe(updatedBook.title);
    expect(response.body.author).toBe(updatedBook.author);
    expect(response.body.genre).toBe(updatedBook.genre);
    expect(response.body.pages).toBe(updatedBook.pages);
    expect(response.body.startDate).toBe(updatedBook.startDate.toISOString());
  });

  it("should delete a book from currently reading by id", async () => {
    const response = await request(app)
      .delete(`/currently-reading/${currentlyReadingBookId}`)
      .expect(204);

    const deletedBook = await currentlyReadingModel.findById(
      currentlyReadingBookId
    );
    expect(deletedBook).toBeNull();
  });
});

// want-to-read

describe("CRUD operations for /want-to-read endpoint", () => {
  it("should create a new book in want to read", async () => {
    const response = await request(app)
      .post("/want-to-read")
      .send(mockWantToReadBook)
      .expect(201);

    wantToReadBookId = response.body._id;

    expect(response.body.title).toBe(mockWantToReadBook.title);
    expect(response.body.author).toBe(mockWantToReadBook.author);
    expect(response.body.genre).toBe(mockWantToReadBook.genre);
    expect(response.body.pages).toBe(mockWantToReadBook.pages);
  });

  it("should fetch all books in want to read", async () => {
    const response = await request(app).get("/want-to-read").expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should delete a book from want to read by id", async () => {
    const response = await request(app)
      .delete(`/want-to-read/${wantToReadBookId}`)
      .expect(200);

    expect(response.body.message).toBe("Book deleted successfully");
  });
});
