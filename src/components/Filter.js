import { useTodosContext } from "../context/TodosContext";

function Filter() {
  const { todoList, filterOption, handleFilterOption, handleClearButton } =
    useTodosContext();
  const activeList = todoList.filter((list) => !list.completed);

  return (
    <div className="filter-section">
      <span className="item-counter">{`${activeList.length} item${
        activeList.length > 1 ? "s" : ""
      } left!`}</span>
      <div className="filter-buttons">
        <button
          onClick={() => handleFilterOption("all")}
          className={`${filterOption === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterOption("active")}
          className={`${filterOption === "active" ? "active" : ""}`}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterOption("completed")}
          className={`${filterOption === "completed" ? "active" : ""}`}
        >
          Completed
        </button>
      </div>
      <span onClick={handleClearButton} className="clear-button">
        Clear completed
      </span>
    </div>
  );
}

export default Filter;
