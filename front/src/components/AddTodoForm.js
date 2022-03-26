import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodoAsync,
  deleteTodoAsync,
  selectTodoItem,
  toggleCompleteAsync,
} from "../redux/todoSlice";
import Lightswitch from "./Lightswitch";
import TodoListTitle from "./TodoListTitle";

const AddTodoForm = () => {
  const selectedTodo = useSelector((state) => state.todos.selectedTodo);

  const dispatch = useDispatch();

  const openForm = () => {
    dispatch(
      selectTodoItem({
        id: "",
      })
    );
  };

  const closeForm = () => {
    dispatch(
      selectTodoItem({
        id: null,
        title: "",
        priority: false,
      })
    );
  };

  const resetForm = (event) => {
    event.preventDefault();
    dispatch(
      selectTodoItem({
        id: null,
        title: "",
        priority: false,
      })
    );
    closeForm();
  };

  const setTitle = (title) => {
    dispatch(
      selectTodoItem({
        title,
      })
    );
  };

  const setPriority = (priority) => {
    dispatch(
      selectTodoItem({
        priority,
      })
    );
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    dispatch(
      addTodoAsync({
        title: selectedTodo.title,
        priority: selectedTodo.priority,
      })
    );
    closeForm();
  };

  const handleCompleteTodo = (event) => {
    event.preventDefault();
    dispatch(
      toggleCompleteAsync({
        id: selectedTodo.id,
        completed: !selectedTodo.completed,
      })
    );
    closeForm();
  };

  const handleDeleteTodo = (event) => {
    event.preventDefault();
    dispatch(
      deleteTodoAsync({
        id: selectedTodo.id,
      })
    );
    closeForm();
  };

  return (
    <div className="addTodo">
      <TodoListTitle title="New Task" showCount={false} />

      <button
        className="btn btn--big addTodo__add-button"
        id="addTodo__add-button"
        onClick={openForm}
      >
        New Task
        <svg className="btn__icon" width="20" height="20">
          <path
            d="M10 0a1 1 0 0 1 1 1v8h8a1 1 0 1 1 0 2h-8v8a1 1 0 1 1-2 0v-8H1a1 1 0 1 1 0-2h8V1a1 1 0 0 1 1-1z"
            fill="#cbddf0"
            fillRule="evenodd"
          />
        </svg>
      </button>

      <form
        className={`addTodo__form ${
          selectedTodo.id !== null && "addTodo__form__show"
        }`}
      >
        <fieldset className="addTodo__form__fieldset">
          <legend className="addTodo__form__header">
            <h2 className="addTodo__form__title">
              <div
                className={`addTodo__form__title__priority ${
                  selectedTodo.id &&
                  (selectedTodo.priority
                    ? "addTodo__form__title__priority--high"
                    : "addTodo__form__title__priority--low")
                }`}
                aria-label="High priority"
              ></div>
              {selectedTodo.id ? "Task" : "New task"}
            </h2>
            <button
              onClick={resetForm}
              className="btn btn--image addTodo__form__close"
            >
              <svg width="16" height="16">
                <path
                  d="M15.071.929a1 1 0 0 1 0 1.414L9.414 8l5.657 5.657a1 1 0 0 1-1.414 1.414L8 9.414l-5.657 5.657a1 1 0 1 1-1.414-1.414L6.586 8 .929 2.343A1 1 0 1 1 2.343.929L8 6.586 13.657.929a1 1 0 0 1 1.414 0z"
                  fill="#cbddf0"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </legend>

          <textarea
            aria-label="Insert task name"
            type="text"
            className="addTodo__form__input"
            placeholder="Insert task name..."
            value={selectedTodo.title}
            onChange={(event) => setTitle(event.target.value)}
            required
          ></textarea>

          <div className="addTodo__form__footer">
            {!selectedTodo.id && (
              <Lightswitch
                label="High priority"
                isChecked={selectedTodo.priority}
                onChangeEvent={(event) => setPriority(!selectedTodo.priority)}
              />
            )}
            {!selectedTodo.id && (
              <button
                onClick={handleAddTodo}
                type="submit"
                className="btn addTodo__submit-button"
                disabled={selectedTodo.title === ""}
              >
                Add
              </button>
            )}
            {selectedTodo.id && (
              <button
                onClick={handleDeleteTodo}
                type="submit"
                className="btn btn--image"
              >
                <svg width="20" height="23">
                  <title>Delete</title>
                  <path
                    d="M10 0a5 5 0 0 1 4.9 4.004h0H19a1 1 0 0 1 1 1 1 1 0 0 1-1 1h0-1v13.304A3.7 3.7 0 0 1 14.307 23h0-8.614A3.7 3.7 0 0 1 2 19.308h0V6.004H1a1 1 0 0 1-1-1 1 1 0 0 1 1-1h0 4.1A5 5 0 0 1 10 0zm6 6.004H4v13.304A1.7 1.7 0 0 0 5.693 21h0 8.614A1.7 1.7 0 0 0 16 19.308h0V6.004zM8 9.003a1 1 0 0 1 1 1h0v6.998a1 1 0 1 1-2 0h0v-6.998a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1h0v6.998a1 1 0 1 1-2 0h0v-6.998a1 1 0 0 1 1-1zm-2-6.998a3 3 0 0 0-2.816 2h0 5.632a3 3 0 0 0-2.816-2z"
                    fill="#ce5151"
                  />
                </svg>
              </button>
            )}
            {selectedTodo.id && (
              <button
                onClick={handleCompleteTodo}
                type="submit"
                className="btn btn--complete"
              >
                {selectedTodo.completed ? "Not Complete" : "Complete"}
              </button>
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AddTodoForm;
