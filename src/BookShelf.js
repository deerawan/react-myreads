import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
  const books = props.books || [];
  const booksToDisplay = books.map((book) => (
    <li key={book.id}>
      <Book
        id={book.id}
        title={book.title}
        authors={book.authors}
        thumbnail={book.imageLinks.thumbnail}
        shelf={book.shelf}
        onShelfChange={props.onShelfChange}
      />
    </li>
  ));

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksToDisplay}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
