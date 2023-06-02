import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it("renders without crashing", function(){
  render(<TodoList />);
});

it("matches snapshot", function(){
  const {asFragment} = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

function addTodo(todoList, task="test app"){
  // select input field
  const taskInput = todoList.getByLabelText('New task:');
  // add value to input field
  fireEvent.change(taskInput, {target: {value: task}});
  // select 'add' button
  const btn = todoList.getByText('Add');
  // click button to submit form field
  fireEvent.click(btn);
};

it("can add a new task", function(){
  const todoList = render(<TodoList />);
  // no task yet so no edit or remove button yet
  expect(todoList.queryByText('Edit')).not.toBeInTheDocument();
  expect(todoList.queryByText('X')).not.toBeInTheDocument();

  // create a todo
  addTodo(todoList);

  // expect todo to be on the page and form to clear
  expect(todoList.getByText('test app')).toBeInTheDocument();
  expect(todoList.getByText('Edit')).toBeInTheDocument();
  expect(todoList.getByText('X')).toBeInTheDocument();
  expect(todoList.getByLabelText('New task:')).toHaveValue('');
});

it("can edit a task", function(){
  const todoList = render(<TodoList />);
  addTodo(todoList);
  // click edit button
  fireEvent.click(todoList.getByText('Edit'));
  const editInput = todoList.getByDisplayValue('test app');
  fireEvent.change(editInput, {target: {value: 'eat sushi'}});
  // click save button
  fireEvent.click(todoList.getByText('Save'));
  // expect edited task to be present
  expect(todoList.getByText('eat sushi')).toBeInTheDocument();
  expect(todoList.queryByText('test app')).not.toBeInTheDocument();
});

it("can remove a task", function(){
  const todoList = render(<TodoList />);
  addTodo(todoList);
  fireEvent.click(todoList.getByText('X'));
  // expect task to be gone
  expect(todoList.queryByText('test app')).not.toBeInTheDocument();
});
