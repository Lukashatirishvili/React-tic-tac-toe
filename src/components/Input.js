import { useTodosContext } from "../context/TodosContext";

function Input() {
  const {
    todoList,
    inputValue,
    handleInputValue,
    handleAddTask,
    handleToggleAllButton,
    toggleAllButton,
  } = useTodosContext();
  return (
    <div className="input-container">
      {todoList.length > 0 && (
        <button
          onClick={handleToggleAllButton}
          className={`button toggle-all ${toggleAllButton ? "active" : ""}`}
        >
          {/* <ion-icon name="chevron-down-outline"></ion-icon> */}
          Arr
        </button>
      )}
      <form onSubmit={handleAddTask} className="input-form">
        <input
          value={inputValue}
          onChange={handleInputValue}
          placeholder="What needs to be done?"
        />
      </form>
    </div>
  );
}

export default Input;
