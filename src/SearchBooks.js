import React, { Component } from 'react';
import * as booksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchBooks extends Component {
  state = {
    searchResult: []
  }

  changeShelf = (updatedBook, shelf) => {
    const bookWithCompleteInfo = this.state.searchResult.find(book => book.id === updatedBook.id);
    if (bookWithCompleteInfo) {
      this.props.onShelfChange(bookWithCompleteInfo, shelf);
    }
  }

  search = (query) => {
    booksAPI.search(query, 10).then(response => {
      if (!response.error) {
        this.setState({
          searchResult: response.map(book => {
            const bookFoundInLibrary = this.props.currentBooks.find(
              currentBook => currentBook.id === book.id);

            if (bookFoundInLibrary) {
              book.shelf = bookFoundInLibrary.shelf;
            }
            return book;
          })
        });
      }
    });
  }

  render() {
    const booksToDisplay = this.state.searchResult.map(book => (
      <li key={book.id}>
        <Book
          id={book.id}
          title={book.title}
          authors={book.authors}
          thumbnail={book.imageLinks.thumbnail}
          shelf={book.shelf}
          onShelfChange={this.changeShelf}
        />
      </li>
    ));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
              {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.search(event.target.value)}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksToDisplay}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;