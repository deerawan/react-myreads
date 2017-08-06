import React from 'react';

const Book = (props) => {
  function changeShelf(event) {
    props.onShelfChange({ id: props.id }, event.target.value);
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.thumbnail})`
          }}>
        </div>
        <div className="book-shelf-changer">
          <select onChange={changeShelf} value={props.shelf}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.title}</div>
      {props.authors.map(author => (
        <div key={author} className="book-authors">{author}</div>
      ))}
    </div>
  );
};

export default Book;