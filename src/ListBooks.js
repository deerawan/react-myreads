import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import ShelfSelect from './ShelfSelect';
import PropTypes from 'prop-types';

class ListBooks extends Component {
  state = {
    checkedBooks: []
  }

  onBookChecked = (bookId, checked) => {
    this.setState(state => {
      const existInCheckedBooks = state.checkedBooks.find(book => book.id === bookId);
      if (!existInCheckedBooks && checked === true) {
        const checkedBookWithInfo = this.props.books.find(book => book.id === bookId);
        return {
          checkedBooks: state.checkedBooks.concat([checkedBookWithInfo])
        }
      }

      if (checked === false) {
        return {
          checkedBooks: state.checkedBooks.filter(book => book.id !== bookId)
        }
      }
    });
  }

  onBulkShelfChange = (event) => {
    const targetShelf = event.target.value;
    this.setState({ checkedBooks: [] });
    this.props.onBulkShelfChange(this.state.checkedBooks, targetShelf);
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
          <div style={{float: "right", position: "relative", bottom: "15px", right: "10px"}}>
            <ShelfSelect onChange={this.onBulkShelfChange} value="" />
          </div>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={bookShelves.currentlyReading}
              onShelfChange={this.props.onShelfChange}
              onBookChecked={this.onBookChecked}
            />
            <BookShelf
              title="Want to Read"
              books={bookShelves.wantToRead}
              onShelfChange={this.props.onShelfChange}
              onBookChecked={this.onBookChecked}
            />
            <BookShelf
              title="Read"
              books={bookShelves.read}
              onShelfChange={this.props.onShelfChange}
              onBookChecked={this.onBookChecked}
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