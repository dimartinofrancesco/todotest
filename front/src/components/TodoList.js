import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";
import TodoListTitle from "./TodoListTitle";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) =>
    state.todos.list
      .filter((todo) => !todo.completed)
      .sort((todoA, todoB) => {
        return todoA.priority === todoB.priority ? 0 : todoA.priority ? -1 : 1;
      })
  );

  const dones = useSelector((state) =>
    state.todos.list
      .filter((todo) => todo.completed)
      .sort((todoA, todoB) => {
        return todoA.priority === todoB.priority ? 0 : todoA.priority ? -1 : 1;
      })
  );

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div>
      <TodoListTitle title="Da fare" showCount={true} countCompleted={false} />
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={`todo-item_${todo.id}`}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            priority={todo.priority}
          />
        ))}
      </ul>

      <TodoListTitle title="Done" showCount={true} countCompleted={true} />
      <ul className="todo-list todo-list--completed">
        {dones.map((todo) => (
          <TodoItem
            key={`todo-item_${todo.id}`}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            priority={todo.priority}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
