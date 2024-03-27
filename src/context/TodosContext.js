import { useContext, useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const TodosContext = createContext();

function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

const initialState = {
  inputValue: "",
  todoList: [],
  toggleAllButton: false,
  filterOption: "all",
};

function reducer(state, action) {
  let newTodoList;
  switch (action.type) {
    case "handle_InputValue":
      return { ...state, inputValue: action.payload };
    case "handle_AddTask":
      newTodoList = [
        ...state.todoList,
        {
          id: generateUniqueId(),
          completed: false,
          task: state.inputValue,
          showDeleteButton: false,
          isEditable: false,
        },
      ];
      return {
        ...state,
        inputValue: "",
        todoList: newTodoList,
        toggleAllButton: newTodoList.every((list) => list.completed),
      };
    case "handle_UpdateTask":
      newTodoList = state.todoList.map((list) => ({
        ...list,
        isEditable: list.id === action.payload,
      }));

      return { ...state, todoList: newTodoList };
    case "handle_DeleteTask":
      newTodoList = state.todoList.filter((list) => list.id !== action.payload);

      return {
        ...state,
        todoList: newTodoList,
        toggleAllButton: newTodoList.every((list) => list.completed),
      };
    case "handle_CompleteTask":
      newTodoList = state.todoList.map((list) => ({
        ...list,
        completed:
          list.id === action.payload ? !list.completed : list.completed,
      }));

      return {
        ...state,
        todoList: newTodoList,
        toggleAllButton: newTodoList.every((list) => list.completed),
      };
    case "handle_FilterOption":
      return { ...state, filterOption: action.payload };
    case "handle_ShowDeleteButton":
      newTodoList = state.todoList.map((list) => ({
        ...list,
        showDeleteButton:
          list.id === action.payload.id
            ? action.payload.action
            : state.showDeleteButton,
      }));

      return {
        ...state,
        todoList: newTodoList,
      };
    case "handle_ToggleAllButton":
      const updatedToggleAllButton = !state.toggleAllButton;
      newTodoList = state.todoList.map((list) => ({
        ...list,
        completed: updatedToggleAllButton,
      }));

      return {
        ...state,
        toggleAllButton: updatedToggleAllButton,
        todoList: newTodoList,
      };
    case "handle_ClearButton":
      newTodoList = state.todoList.filter((list) => !list.completed);

      return {
        ...state,
        todoList: newTodoList,
      };
    case "handle_TaskChange":
      newTodoList = state.todoList.map((list) => ({
        ...list,
        task: list.id === action.payload.id ? action.payload.value : list.task,
      }));

      return {
        ...state,
        todoList: newTodoList,
      };
    case "handle_FinishUpdate":
      newTodoList = state.todoList.map((list) => ({
        ...list,
        isEditable: false,
      }));

      return {
        ...state,
        todoList: newTodoList,
      };
    default:
      return { ...state };
  }
}

function TodosProvider({ children }) {
  const [{ inputValue, todoList, filterOption, toggleAllButton }, dispatch] =
    useReducer(reducer, initialState);

  function handleInputValue(e) {
    dispatch({ type: "handle_InputValue", payload: e.target.value });
  }

  useEffect(() => {
    if (todoList.every((list) => !list.isEditable)) return;
    function handleEvent(e) {
      if (e.target.classList.contains("taskInput")) return;
      dispatch({ type: "handle_FinishUpdate" });
    }

    document.addEventListener("click", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, [todoList]);

  function handleAddTask(e) {
    e.preventDefault();
    if (!inputValue) return;
    dispatch({
      type: "handle_AddTask",
    });
  }

  function handleDeleteTask(id) {
    dispatch({ type: "handle_DeleteTask", payload: id });
  }

  function handleUpdateTask(id) {
    dispatch({ type: "handle_UpdateTask", payload: id });
  }

  function handleCompleteTask(id) {
    dispatch({ type: "handle_CompleteTask", payload: id });
  }

  function handleFilterOption(option) {
    dispatch({ type: "handle_FilterOption", payload: option });
  }

  function handleFinishUpdate(e) {
    e.preventDefault();
    dispatch({ type: "handle_FinishUpdate" });
  }

  function handleShowDeleteButton(e, id) {
    let action;
    if (e.type === "mouseover") action = true;
    if (e.type === "mouseout") action = false;
    dispatch({
      type: "handle_ShowDeleteButton",
      payload: { id, action },
    });
  }

  function handleToggleAllButton() {
    dispatch({ type: "handle_ToggleAllButton" });
  }

  function handleClearButton() {
    dispatch({ type: "handle_ClearButton" });
  }

  function handleTaskChange(e, id) {
    let value = e.target.value;
    dispatch({ type: "handle_TaskChange", payload: { value, id } });
  }

  return (
    <TodosContext.Provider
      value={{
        inputValue,
        todoList,
        filterOption,
        toggleAllButton,
        handleInputValue,
        handleAddTask,
        handleDeleteTask,
        handleCompleteTask,
        handleShowDeleteButton,
        handleFilterOption,
        handleToggleAllButton,
        handleClearButton,
        handleUpdateTask,
        handleTaskChange,
        generateUniqueId,
        handleFinishUpdate,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

function useTodosContext() {
  const context = useContext(TodosContext);

  if (!context) throw new Error("error in context");

  return context;
}

export { TodosProvider, useTodosContext };
