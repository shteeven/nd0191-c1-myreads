import {BookInfo, ShelfOption} from "../book/book.models";
import {Book} from "../book/Book";
import {BookShelfConfig} from "./book-shelf.models";

class BookShelfProps {
  books: BookInfo[];
  config: BookShelfConfig;
  onUpdateShelf: (book: BookInfo, shelf: ShelfOption) => void
}

export const BookShelf = ({books, config, onUpdateShelf}: BookShelfProps) => {
  const bookOnShelf = books?.filter((book) => book.shelf === config.shelfKey);

  const bookShelfResults = !bookOnShelf?.length ? <p>No books on this shelf, yet.</p> : <ol className="books-grid">
    {bookOnShelf.map((book) => (<li key={book.id}><Book book={book} onUpdateShelf={onUpdateShelf}/></li>))}
  </ol>

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{config.title}</h2>
      <div className="bookshelf-books">
        {bookShelfResults}
      </div>
    </div>
  )
}