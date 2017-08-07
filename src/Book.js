import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

const Book = (props) => {
  const {id, title, thumbnail, shelf, authors, rating} = props;

  function changeShelf(event) {
    props.onShelfChange({ id }, event.target.value);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${thumbnail})`
          }}>
        </div>
        <div className="book-shelf-changer">
          <select onChange={changeShelf} value={shelf}>
            <option value="" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors && authors.map(author => (
        <div key={author} className="book-authors">{author}</div>
      ))}
      <div>
        <Rating
          initialRate={rating}
          empty="fa fa-star-o"
          full="fa fa-star"
          readonly
        />
      </div>
    </div>
  );
};

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired
};

export default Book;