import React from 'react';
import PropTypes from 'prop-types';

const ShelfSelect = (props) => {
  return (
    <div className="book-shelf-changer">
      <select onChange={props.onChange} value={props.value}>
        <option value="" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

ShelfSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default ShelfSelect;
