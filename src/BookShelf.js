import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
  const books = props.books.map((book) => (
    <li key={book.id}>
      <Book
        title={book.title}
        authors={book.authors}
        thumbnail={book.imageLinks.thumbnail}
      />
    </li>
  ));

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
