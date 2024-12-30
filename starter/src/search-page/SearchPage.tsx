import {Link} from "react-router";
import {Book} from "../book/Book";
import {useEffect, useState} from "react";
import {getAll, search, update} from "../books.api";
import {BookInfo, ShelfOption} from "../book/book.models";
import {SearchInput} from "./SearchInput";

class UserBookMap {
  [prop: string]: BookInfo;
}

export const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [userBooksMap, setUserBooksMap] = useState<UserBookMap>({});
  const [searchValue, setSearchValue] = useState<string>();

  useEffect(() => {
    getAll().then((results) => {
      const booksMap = {};
      results.forEach((book) => {
        booksMap[book.id] = book;
      });
      setUserBooksMap(booksMap);
    });
  }, []);

  useEffect(() => {
    let cancelRequest = false;
    if (!searchValue) {
      setBooks([]);
      return;
    }
    search(searchValue, 20).then((results) => {
      if (!Array.isArray(results) || cancelRequest) return;
      setBooks(results);
    })
    return () => {
      cancelRequest = true;
    }
  }, [searchValue]);

  const handleUpdateShelf = ({id}: BookInfo, shelf: ShelfOption) => {
    const updatedBooks = (prevBooks: BookInfo[]) => {
      return prevBooks.map((book) => {
        if (book.id === id) {
          return {...book, shelf: shelf === 'none' ? null : shelf}
        }
        return book;
      })
    };
    setBooks(updatedBooks);
    update(id, shelf).then(() => {
    })
  };

  const searchResults = !books?.length ?
    <p>No results, yet. Please type something in the search field to see books.</p> :
    (<ol className="books-grid">
      {books?.map((book) => (
        <li key={book.id}>
          <Book onUpdateShelf={handleUpdateShelf} book={userBooksMap[book.id] ?? book}></Book>
        </li>
      ))}
    </ol>)


  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <SearchInput onSearchValueChange={setSearchValue}/>
      </div>
      <div className="search-books-results">
        {searchResults}
      </div>
    </div>
  )
}