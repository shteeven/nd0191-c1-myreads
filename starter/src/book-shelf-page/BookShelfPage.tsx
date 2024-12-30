import {Link} from "react-router";
import {BookShelf} from "./BookShelf";
import {useEffect, useState} from "react";
import {BookInfo, ShelfOption} from "../book/book.models";
import {getAll, update} from "../books.api";
import {BookShelfConfig} from "./book-shelf.models";

const bookShelfConfigs: BookShelfConfig[] = [
  {
    shelfKey: 'currentlyReading',
    title: 'Currently Reading',
  },
  {
    shelfKey: 'wantToRead',
    title: 'Want to Read'
  },
  {
    shelfKey: 'read',
    title: 'Read'
  }
]

export const BookShelfPage = () => {
  const [books, setBooks] = useState<BookInfo[]>([]);

  useEffect(() => {
    getAll().then((data) => setBooks(data));
  }, []);

  const handleUpdateShelf = (book: BookInfo, shelf: ShelfOption) => {
    setBooks((prevBooks) => prevBooks.map((b) => (b.id === book.id ? { ...b, shelf } : b)));
    update(book.id, shelf).then(() => {})
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelfConfigs.map((config) =>
            (<BookShelf key={config.shelfKey} books={books} config={config} onUpdateShelf={handleUpdateShelf}/>))}
        </div>
      </div>
      <div className="open-search">
        <Link to="search">Add a book</Link>
      </div>
    </div>
  )
}