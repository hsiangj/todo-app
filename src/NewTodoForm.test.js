import { render, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it("renders without crashing", function(){
  render(<NewTodoForm />);
});

it("matches snapshot", function(){
  const {asFragment} = render(<NewTodoForm />);
  expect(asFragment()).toMatchSnapshot();
});

it("runs addTodo function on form submit", function(){
  const addMock = jest.fn();
  const {getByText} = render(<NewTodoForm addTodo={addMock} />);
  const addButton = getByText('Add');
  fireEvent.click(addButton);
  expect(addMock).toHaveBeenCalled();
});