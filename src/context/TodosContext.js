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
  switch (action.type) {
    case "handle_InputValue":
      return { ...state, inputValue: action.payload };
    case "handle_AddTask":
      const updatedTodoListAdd = [
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
        todoList: updatedTodoListAdd,
        toggleAllButton: updatedTodoListAdd.every((list) =>
          list.completed ? true : false
        ),
      };
    case "handle_UpdateTask":
      const updateTodoListEdit = state.todoList.map((list) => {
        if (list.id === action.payload) {
          return { ...list, isEditable: true };
        }
        return { ...list, isEditable: false };
      });
      return { ...state, todoList: updateTodoListEdit };
    case "handle_DeleteTask":
      const updatedTodoListDelete = state.todoList.filter(
        (list) => list.id !== action.payload
      );
      console.log(updatedTodoListDelete);
      return {
        ...state,
        todoList: updatedTodoListDelete,
        toggleAllButton: updatedTodoListDelete.every((list) => list.completed)
          ? true
          : false,
      };
    case "handle_CompleteTask":
      const updatedTodoListComplete = state.todoList.map((list) => {
        if (list.id === action.payload) {
          return { ...list, completed: !list.completed };
        }
        return list;
      });

      return {
        ...state,
        todoList: updatedTodoListComplete,
        toggleAllButton: updatedTodoListComplete.every((list) =>
          list.completed ? true : false
        ),
      };
    case "handle_FilterOption":
      return { ...state, filterOption: action.payload };
    case "handle_ShowDeleteButton":
      return {
        ...state,
        todoList: state.todoList.map((list) => {
          if (list.id === action.payload.id) {
            return { ...list, showDeleteButton: action.payload.action };
          }
          return list;
        }),
      };
    case "handle_ToggleAllButton":
      const updatedToggleAllButton = !state.toggleAllButton;
      const updatedList = updatedToggleAllButton
        ? state.todoList.map((list) => ({ ...list, completed: true }))
        : state.todoList.map((list) => ({ ...list, completed: false }));
      return {
        ...state,
        toggleAllButton: updatedToggleAllButton,
        todoList: updatedList,
      };
    case "handle_ClearButton":
      return {
        ...state,
        todoList: state.todoList.filter((list) => !list.completed),
      };
    case "handle_TaskChange":
      return {
        ...state,
        todoList: state.todoList.map((list) => {
          if (list.id === action.payload.id) {
            return { ...list, task: action.payload.e.target.value };
          }
          return { ...list };
        }),
      };
    case "handle_FinishUpdate":
      return {
        ...state,
        todoList: state.todoList.map((list) => ({
          ...list,
          isEditable: false,
        })),
      };
    case "getItemsFrom_localStorage":
      return { ...state, todoList: action.payload };
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
    const data = JSON.parse(localStorage.getItem("todos"));
    if (data) dispatch({ type: "getItemsFrom_localStorage", payload: data });
  }, []);

  useEffect(() => {
    if (todoList.length < 1) return;
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

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
    console.log(true);
    dispatch({ type: "handle_ClearButton" });
  }

  function handleTaskChange(e, id) {
    dispatch({ type: "handle_TaskChange", payload: { e, id } });
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
