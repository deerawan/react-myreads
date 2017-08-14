import React from 'react';
import { shallow } from 'enzyme';

import ListBook from '../ListBooks';
import BookShelf from '../BookShelf';

describe('<ListBook />', function() {
  const mockOnShelfChange = jest.fn();
  const mockOnBulkShelfChange = jest.fn();
  const mockOnBookChecked = jest.fn();
  const books = [
    {
      id: '1',
      title: 'harry potter',
      authors: ['jk rowling'],
      thumbnail: null,
      shelf: 'read',
      rating: 8
    },
    {
      id: '2',
      title: 'batman forever',
      authors: ['bruce wayne'],
      thumbnail: null,
      shelf: 'currentlyReading',
      rating: 9
    }
  ];

  const component = shallow(
    <ListBook
      books={books}
      onShelfChange={mockOnShelfChange}
      onBulkShelfChange={mockOnBulkShelfChange}
      onBookChecked={mockOnBookChecked}
    />
  );

  it('has page title', () => {
    expect(component.contains('MyReads')).toEqual(true);
  });

  it('displays three book shelves', () => {
    const shelves = component.find(BookShelf);
    expect(shelves).toHaveLength(3);
  });
});
