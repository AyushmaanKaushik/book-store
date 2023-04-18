import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import mysql from "mysql";

const Books = () => {
  const [books, setBooks] = useState([]);

const db = mysql.createConnection({
	host: "localhost",
	  user: "root",
	  password: "",
	  database: "test",
});
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://54.185.200.109/api/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://54.185.200.109/api/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Blossoms Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {/* <img src={book.cover} alt="" /> */}
            <h2>{book.title}</h2>
            <h4>by <i>{book.author}</i> </h4>
            <p>{book.desc}</p>
            <span>${book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
