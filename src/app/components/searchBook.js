"use client";
import React, { useState } from "react";
import axios from "axios";

const SearchBooks = ({ addToCollection }) => {
  const [isbn, setIsbn] = useState("");
  const [bookInfo, setBookInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setIsbn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/search", { isbn });

      setBookInfo(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching book:", error);
      setError("Book not found. Please check the ISBN and try again.");
      setBookInfo(null);
    }
  };

  const handleAddToCollection = (collection) => {
    addToCollection(bookInfo, collection);
    setBookInfo(null);
    setIsbn("");
  };

  return (
    <div className="search-books">
      <form onSubmit={handleSubmit}>
        <label>
          Enter ISBN:
          <input
            type="text"
            value={isbn}
            onChange={handleChange}
            placeholder="Enter ISBN"
            required
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {bookInfo && (
        <div className="book-info">
          <h3>{bookInfo.title}</h3>
          <p>Author: {bookInfo.author}</p>
          <p>Description: {bookInfo.summary}</p>
          <div className="add-to-collections">
            <button onClick={() => handleAddToCollection("read")}>
              Add to Read
            </button>
            <button onClick={() => handleAddToCollection("currently-reading")}>
              Add to Currently Reading
            </button>
            <button onClick={() => handleAddToCollection("want-to-read")}>
              Add to Want to Read
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
