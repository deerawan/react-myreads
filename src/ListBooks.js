import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import ShelfSelect from './ShelfSelect';
import PropTypes from 'prop-types';

class ListBooks extends Component {
  bulkShelfChange = (event) => {
    const targetShelf = event.target.value;
    this.props.onBulkShelfChange(targetShelf);
  }

  checkBook = (bookId, checkedStatus) => {
    const checkedBookWithInfo = this.props.books.find(book => book.id === bookId);
    this.props.onBookChecked(checkedBookWithInfo, checkedStatus);
  }

  render() {
    const bookShelves = this.props.books.reduce((prev, current) => {
      if (!prev[current.shelf]) {
        prev[current.shelf] = [];
      }
      prev[current.shelf].push(current);

      return prev;
    }, {
      currentlyReading: [],
      wantToRead: [],
      read: []
    });

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
          <div className="bulk-shelf-changer">
            <ShelfSelect onChange={this.bulkShelfChange} />
          </div>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={bookShelves.currentlyReading}
              onShelfChange={this.props.onShelfChange}
              onBookChecked={this.checkBook}
            />
            <BookShelf
              title="Want to Read"
              books={bookShelves.wantToRead}
              onShelfChange={this.props.onShelfChange}
              onBookChecked={this.checkBook}
            />
            <BookShelf
              title="Read"
              books={bookShelves.read}
              onShelfChange={this.props.onShelfChange}
              onBookChecked={this.checkBook}
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

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default ListBooks;
