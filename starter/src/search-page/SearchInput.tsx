import {useEffect, useState} from "react";

export const SearchInput = ({onSearchValueChange}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchValueChange(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, onSearchValueChange]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="search-books-input-wrapper">
      <input
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Search by title, author, or ISBN"
      />
    </div>
  )
}