import {Link} from "react-router";
import {Book} from "../shared/Book";
import {useEffect, useState} from "react";
import {getAll} from "../BooksAPI";

export const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [userBooksMap, setUserBooksMap] = useState([]);
  useEffect(() => {
    getAll().then((results) => {
      console.log(results);
      setBooks(results);
    })
  }, [])
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li>
              <Book book={book}></Book>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}