import React from "react";
import { useDispatch } from "react-redux";
import {
  toggleCompleteAsync,
  deleteTodoAsync,
  selectTodoItem,
} from "../redux/todoSlice";
import Checkbox from "./Checkbox";

const TodoItem = ({ id, title, completed, priority }) => {
  const dispatch = useDispatch();

  const isMobileView = () => {
    const addTaskMobileButton = document.getElementById("addTodo__add-button");
    return window.getComputedStyle(addTaskMobileButton).display !== "none";
  };

  const handleCompleteClick = () => {
    dispatch(
      toggleCompleteAsync({
        id,
        completed: !completed,
      })
    );
  };

  const handleDeleteClick = () => {
    dispatch(
      deleteTodoAsync({
        id,
      })
    );
  };

  const handleSelectTodoItem = () => {
    if (isMobileView()) {
      dispatch(
        selectTodoItem({
          id,
          title,
          priority,
          completed,
        })
      );
    }
  };

  return (
    <li
      id={`todo-list__item-${id}`}
      className={`todo-list__item ${completed && "todo-list__item--completed"}`}
    >
      <Checkbox
        isChecked={completed}
        onChangeEvent={handleCompleteClick}
        label="completed"
      />
      <div
        className={`todo-list__item__priority ${
          priority && "todo-list__item__priority--high"
        }`}
        aria-label="High priority"
      ></div>
      <label
        onClick={handleSelectTodoItem}
        className={`todo-list__item__label ${
          completed && "todo-list__item__label--completed"
        }`}
      >
        {title}
      </label>
      <button
        onClick={handleDeleteClick}
        type="submit"
        className="btn btn--image todo-list__item__delete-btn"
      >
        <svg className="btn--image__svg" width="18" height="20">
          <title>Delete</title>
          <path
            d="M9 .833c1.982 0 3.689 1.395 4.083 3.337h0H16.5c.46 0 .833.373.833.833s-.373.833-.833.833h0-.833v11.087c-.003 1.698-1.379 3.074-3.078 3.077h0-7.178c-1.698-.003-3.074-1.379-3.077-3.077h0V5.836H1.5c-.46 0-.833-.373-.833-.833s.373-.833.833-.833h0 3.417C5.311 2.228 7.019.833 9 .833zm5 5.003H4v11.087c.003.778.633 1.407 1.411 1.411h0 7.178c.778-.003 1.408-.633 1.411-1.411h0V5.836zM7.334 8.336c.46 0 .833.373.833.833h0v5.832c0 .46-.373.833-.833.833s-.833-.373-.833-.833h0V9.169c0-.46.373-.833.833-.833zm3.333 0c.46 0 .833.373.833.833h0v5.832c0 .46-.373.833-.833.833s-.833-.373-.833-.833h0V9.169c0-.46.373-.833.833-.833zM9 2.503A2.5 2.5 0 0 0 6.654 4.17h0 4.693A2.5 2.5 0 0 0 9 2.503z"
            fill="#ce5151"
          />
        </svg>
      </button>
    </li>
  );
};

export default TodoItem;
