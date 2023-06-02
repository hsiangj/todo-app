import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';

it("renders without crashing", function(){
  render(<Todo />);
});

it("matches snapshot", function(){
  const {asFragment} = render(<Todo />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when editing", function(){
  const {asFragment, getByText} = render(<Todo />);
  const editButton = getByText('Edit');
  fireEvent.click(editButton);
  expect(asFragment()).toMatchSnapshot();
});

it("runs edit function on form submit", function(){
  const editMock = jest.fn();
  const {getByText} = render(<Todo edit={editMock} />);
  const editButton = getByText('Edit');
  fireEvent.click(editButton);
  const saveButton = getByText('Save');
  fireEvent.click(saveButton);
  expect(editMock).toHaveBeenCalled();
});

it("runs remove function on form button click", function(){
  const removeMock = jest.fn();
  const {getByText} = render(<Todo remove={removeMock} />);
  const removeButton = getByText('X');
  fireEvent.click(removeButton);
  expect(removeMock).toHaveBeenCalled();
});