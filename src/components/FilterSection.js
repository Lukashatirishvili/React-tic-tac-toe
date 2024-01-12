export default function FilterSection({
  filterData,
  setFilterData,
  handleClearBtn,
  completedList,
  activeList,
}) {
  return (
    <div className="filterSection">
      <span className="itemsLeft">{activeList.length} items left</span>
      <div className="filterButtons">
        <button
          className={filterData === "all" ? "allButton active" : "allButton"}
          onClick={() => setFilterData("all")}
        >
          All
        </button>
        <button
          className={
            filterData === "active" ? "activeButton active" : "activeButton"
          }
          onClick={() => setFilterData("active")}
        >
          Active
        </button>
        <button
          className={
            filterData === "completed"
              ? "completedButton active"
              : "completedButton"
          }
          onClick={() => setFilterData("completed")}
        >
          Completed
        </button>
      </div>
      {completedList.length > 0 && (
        <button onClick={handleClearBtn} className="clearButton">
          Clear completed
        </button>
      )}
    </div>
  );
}
