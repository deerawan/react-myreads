import React from 'react';
import { shallow } from 'enzyme';

import Book from '../Book';

describe('<Book />', function() {
  const authors = ['JK rowling', 'Thomas JFK'];
  const mockOnShelfChange = jest.fn();
  const mockBookChecked = jest.fn();
  const title = 'Harry Potter';

  const component = shallow(
    <Book
      id="HARPOT-01"
      title={title}
      authors={authors}
      thumbnail="www.google.com/thumbnail.jpg"
      shelf="read"
      rating={5}
      onShelfChange={mockOnShelfChange}
      onBookChecked={mockBookChecked}
    />
  );

  it('has book cover', () => {
    const bookCover = component.find('.book-cover');
    expect(bookCover).toHaveLength(1);
  });

  it('has book title', () => {
    const bookTitle = component.find('.book-title');

    expect(bookTitle).toHaveLength(1);
    expect(bookTitle.text()).toContain(title);
  });

  it('has book authors', () => {
    const bookAuthors = component.find('.book-authors');
    expect(bookAuthors).toHaveLength(2);
  });

  it('has checkbox for bulk update', () => {
    expect(component.find('input[name="chk-book"]')).toHaveLength(1);
  });
});
