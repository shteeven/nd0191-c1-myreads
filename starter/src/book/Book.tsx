import {BookInfo, ShelfOption} from "./book.models";

class BookProps {
  book: BookInfo;
  onUpdateShelf: (book: BookInfo, shelf: ShelfOption) => void
}

export const Book = ({book, onUpdateShelf}: BookProps) => {
  const author = book.authors?.length ? book.authors.join(', ') : 'No author';

  const updateShelf = (event) => {
    onUpdateShelf(book, event.target.value);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url("${book.imageLinks.thumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select onChange={updateShelf} value={book.shelf ?? ''}>
            <option value="" disabled>
              {book.shelf ? 'Move to...' : 'Add to...'}
            </option>
            <option value="currentlyReading">
              Currently Reading
            </option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {book.shelf && (<option value="none">None</option>)}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{author}</div>
    </div>
  )
}