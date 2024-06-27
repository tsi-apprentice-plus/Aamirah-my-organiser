"use client";
import { useEffect, useState } from "react";
import AddBookModal from "./AddBook";

export default function MyLibrary() {
  const [readBooks, setReadBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collection, setCollection] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const readResponse = await fetch("http://api.aamirah.netbuildertraining.com/books");
        const readData = await readResponse.json();
        console.log("Read Books:", readData);
        setReadBooks(readData);

        const currentlyReadingResponse = await fetch(
          "http://api.aamirah.netbuildertraining.com/currently-reading"
        );
        const currentlyReadingData = await currentlyReadingResponse.json();
        console.log("Currently Reading:", currentlyReadingData);
        setCurrentlyReading(currentlyReadingData);

        const wantToReadResponse = await fetch(
          "http://api.aamirah.netbuildertraining.com/want-to-read"
        );
        const wantToReadData = await wantToReadResponse.json();
        console.log("Want to Read Books:", wantToReadData);
        setWantToReadBooks(wantToReadData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteBook = async (id, collection) => {
    try {
      await fetch(`http://api.aamirah.netbuildertraining.com/${collection}/${id}`, {
        method: "DELETE",
      });
      if (collection === "books") {
        setReadBooks(readBooks.filter((book) => book._id !== id));
      } else if (collection === "currently-reading") {
        setCurrentlyReading(currentlyReading.filter((book) => book._id !== id));
      } else if (collection === "want-to-read") {
        setWantToReadBooks(wantToReadBooks.filter((book) => book._id !== id));
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const moveToRead = async (id) => {
    const rating = window.prompt("Please enter a rating for this book (1-5):");

    if (
      rating === null ||
      rating === "" ||
      isNaN(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      alert("Invalid rating. Please enter a number between 1 and 5.");
      return;
    }

    try {
      const response = await fetch(
        `http://api.aamirah.netbuildertraining.com/currently-reading/${id}/move-to-read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating: parseInt(rating, 10) }),
        }
      );

      const newReadBook = await response.json();

      setCurrentlyReading(currentlyReading.filter((book) => book._id !== id));
      setReadBooks([...readBooks, newReadBook]);
    } catch (error) {
      console.error("Error moving book to read:", error);
    }
  };

  const openModal = (collection) => {
    console.log("Opening modal for collection:", collection);
    setCollection(collection);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addBook = async (formData) => {
    console.log("Adding book to collection:", collection, formData);
    try {
      const response = await fetch(`http://api.aamirah.netbuildertraining.com/${collection}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newBook = await response.json();

      if (collection === "books") {
        setReadBooks([...readBooks, newBook]);
      } else if (collection === "currently-reading") {
        setCurrentlyReading([...currentlyReading, newBook]);
      } else if (collection === "want-to-read") {
        setWantToReadBooks([...wantToReadBooks, newBook]);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">My Library</h2>
      <div className="grid">
        <div>
          <h3 className="section-heading">Read</h3>
          <div className="table1">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {readBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.rating}</td>
                    <td>
                      <button
                        className="button button-red"
                        onClick={() => deleteBook(book._id, "books")}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="Add1">
            <button className="button" onClick={() => openModal("books")}>
              Add
            </button>
          </div>
        </div>

        <div>
          <h3 className="section-heading">Currently Reading</h3>
          <div className="table2">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {currentlyReading.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.progress}</td>
                    <td>
                      <button
                        className="button button-green"
                        onClick={() => moveToRead(book._id)}
                      >
                        Move to Read
                      </button>
                      <button
                        className="button button-red"
                        onClick={() =>
                          deleteBook(book._id, "currently-reading")
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="Add2">
            <button
              className="button"
              onClick={() => openModal("currently-reading")}
            >
              Add
            </button>
          </div>
        </div>

        <div>
          <h3 className="section-heading">Want to Read</h3>
          <div className="table3">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {wantToReadBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <button
                        className="button button-red"
                        onClick={() => deleteBook(book._id, "want-to-read")}
                      >
                        Delete
                      </button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="Add3">
            <button
              className="button"
              onClick={() => openModal("want-to-read")}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <AddBookModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={addBook}
        collection={collection}
      />
    </div>
  );
}
