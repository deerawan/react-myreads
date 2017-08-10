import React from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import * as booksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    booksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

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
          updatedBook.shelf = shelf;
          currentBooks = state.books.concat([updatedBook]);
        }

        return { books: currentBooks };
      });
    });
  }

  bulkUpdateShelf = (updatedBooks, shelf) => {
    const updatePromises = updatedBooks.map(book => booksAPI.update(book, shelf));

    return Promise
      .all(updatePromises)
      .then(response => {
        this.setState(state => ({
          books: state.books.map(book => {
            const bookExistInUpdatedBooks = updatedBooks.find(checkedBook => checkedBook.id === book.id);
            if (bookExistInUpdatedBooks) {
              book.shelf = shelf;
            }

            return book;
          })
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks
            books={this.state.books}
            onShelfChange={this.updateShelf}
            onBulkShelfChange={this.bulkUpdateShelf}
          />
        } />
        <Route path='/search' render={() =>
          <SearchBooks
            currentBooks={this.state.books}
            onShelfChange={this.updateShelf}
          />
        } />
      </div>
    )
  }
}

export default BooksApp;
