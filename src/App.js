import React from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import * as booksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * Books in library
     */
    books: [],
    /**
     * Checked books for bulk update
     */
    checkedBooks: []
  }

  componentDidMount() {
    booksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  /**
   * Update shelf for a book
   *
   * @param {Object} updatedBook - book to be updated
   * @param {string} shelf - target shelf
   */
  updateShelf = (updatedBook, shelf) => {
    booksAPI.update(updatedBook, shelf).then(res => {
      this.setState(state => {
        let currentBooks = [];
        const bookFoundInLibrary = state.books.find(book => book.id === updatedBook.id);

        if (bookFoundInLibrary) {
          currentBooks = state.books.map(book => {
            if (book.id === updatedBook.id) {
              book.shelf = shelf;
            }
            return book;
          });
        } else {
          // NOTE: it is a new book for our library, add it!
          updatedBook.shelf = shelf;
          currentBooks = state.books.concat([updatedBook]);
        }

        return { books: currentBooks };
      });
    });
  }

  /**
   * Bulk update shelf
   *
   * @param {string} shelf - target shelf
   */
  bulkUpdateShelf = (shelf) => {
    const updatePromises = this.state.checkedBooks.map(book => booksAPI.update(book, shelf));

    return Promise
      .all(updatePromises)
      .then(response => {
        this.setState(state => {
          // Handling new books from search result
          const newBooks = state.checkedBooks.filter(checkedBook => {
            const existInLibrary = state.books.find(book => book.id === checkedBook.id);
            return existInLibrary ? false : true;
          });
          const newBooksWithUpdatedShelf = newBooks.map(newBook => {
            newBook.shelf = shelf;
            return newBook;
          });

          const currentBooksWithUpdatedShelf = state.books.map(book => {
            const bookExistInCheckedBooks = state.checkedBooks.find(
              checkedBook => checkedBook.id === book.id);

            if (bookExistInCheckedBooks) {
              book.shelf = shelf;
            }

            return book;
          });

          return {
            books: currentBooksWithUpdatedShelf.concat(newBooksWithUpdatedShelf),
            checkedBooks: [],
          }
        });
      })
  }

  /**
   * Check/tick the book
   *
   * @param {Object} checkedBook
   * @param {boolean} checkedStatus - true if checked, otherwise false
   */
  checkBook = (checkedBook, checkedStatus) => {
    this.setState(state => {
      const existInCheckedBooks = state.checkedBooks.find(book => book.id === checkedBook.id);

      if (!existInCheckedBooks && checkedStatus === true) {
        return {
          checkedBooks: state.checkedBooks.concat([checkedBook])
        }
      }

      if (checkedStatus === false) {
        return {
          checkedBooks: state.checkedBooks.filter(book => book.id !== checkedBook.id)
        }
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks
            books={this.state.books}
            onShelfChange={this.updateShelf}
            onBulkShelfChange={this.bulkUpdateShelf}
            onBookChecked={this.checkBook}
          />
        } />
        <Route path='/search' render={() =>
          <SearchBooks
            currentBooks={this.state.books}
            onShelfChange={this.updateShelf}
            onBulkShelfChange={this.bulkUpdateShelf}
            onBookChecked={this.checkBook}
          />
        } />
      </div>
    )
  }
}

export default BooksApp;
