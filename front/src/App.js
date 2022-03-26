import React from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <AddTodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
