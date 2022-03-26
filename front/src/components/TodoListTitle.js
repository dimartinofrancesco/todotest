import React from "react";
import { useSelector } from "react-redux";

const TodoListTitle = ({ title, showCount, countCompleted }) => {
  const completedTodos = useSelector((state) =>
    state.todos.list.filter((todo) => todo.completed === countCompleted)
  );

  return (
    <h2 className="todo-list-title">
      {title}{" "}
      {showCount && (
        <span className="todo-list-title__badge">{completedTodos.length}</span>
      )}
    </h2>
  );
};

export default TodoListTitle;
