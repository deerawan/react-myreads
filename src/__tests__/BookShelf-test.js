import React from 'react';
import { shallow } from 'enzyme';

import BookShelf from '../BookShelf';
import Book from '../Book';

describe('<BookShelf />', function() {
  const mockOnShelfChange = jest.fn();
  const mockBookChecked = jest.fn();
  const title = 'Current Reading';
  const books = [
    {
      id: '1',
      title: 'harry potter',
      authors: ['jk rowling'],
      thumbnail: null,
      shelf: 'read',
      rating: 8
    }
  ];

  const component = shallow(
    <BookShelf
      title={title}
      books={books}
      onShelfChange={mockOnShelfChange}
      onBookChecked={mockBookChecked}
    />
  );

  it('has book shelf title', () => {
    const bookCover = component.find('.bookshelf-title');
    expect(bookCover).toHaveLength(1);
  });

  it('has book component', () => {
    expect(component.find(Book)).toHaveLength(1);
  });
});
