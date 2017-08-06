import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  render() {
    const bookShelves = this.props.books.reduce((prev, current) => {
      if (!prev[current.shelf]) {
        prev[current.shelf] = [];
      }
      prev[current.shelf].push(current);

      return prev;
    }, {});

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={bookShelves.currentlyReading}
              onShelfChange={this.props.onShelfChange}
            />
            <BookShelf
              title="Want to Read"
              books={bookShelves.wantToRead}
              onShelfChange={this.props.onShelfChange}
            />
            <BookShelf
              title="Read"
              books={bookShelves.read}
              onShelfChange={this.props.onShelfChange}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks;