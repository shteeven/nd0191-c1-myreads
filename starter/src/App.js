import "./App.css";
import {BookShelfPage} from "./BookShelfPage/BookShelfPage";
import {SearchPage} from "./SearchPage/SearchPage";
import {BrowserRouter, Route, Routes} from "react-router";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<BookShelfPage/>}/>
          <Route path="/search" element={<SearchPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
