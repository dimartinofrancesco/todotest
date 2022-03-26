import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch("http://localhost:7000/todos");
    if (response.ok) {
      const todosList = await response.json();
      return { todosList };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: payload.title,
        priority: payload.priority,
      }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: payload.completed,
      }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { id: payload.id };
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    selectedTodo: {
      id: null,
      title: "",
      priority: false,
      completed: false,
    },
    list: [],
  },

  reducers: {
    selectTodoItem: (state, action) => {
      state.selectedTodo = { ...state.selectedTodo, ...action.payload };
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log("retriving todos...");
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log("todos retrived...");
      state.list = action.payload.todosList;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.list.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.list.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.list[index].completed = action.payload.completed;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { selectTodoItem } = todoSlice.actions;
export default todoSlice.reducer;
