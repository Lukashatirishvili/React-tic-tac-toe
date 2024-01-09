import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";

export default function App() {
  const [listData, setListData] = useState([]);
  const [filterData, setFilterData] = useState("all");

  console.log(listData);
  /*
  localStorage.setItem("listData", JSON.stringify(listData));
  localStorage.setItem("filterData", filterData);

  function getFromLocalStorage() {
    setListData(JSON.parse(localStorage.getItem("listData")));
    setFilterData(localStorage.getItem("filterData"));
  }
  */

  const activeList = listData.filter((list) => list.status === false);
  const completedList = listData.filter((list) => list.status === true);

  const displayArrowBtn = completedList.length === listData.length;

  function handleSubmit(e, inputText, setInputText, id) {
    e.preventDefault();
    setListData((list) => [
      ...list,
      { status: false, list: inputText, id: id, updateMode: false },
    ]);
    setInputText("");
  }

  function handleCheck(id) {
    setListData(
      listData.map((list) =>
        list.id === id ? { ...list, status: !list.status } : list
      )
    );
  }

  /*********** HANDLE UPDATE ************/
  function handleUpdate(id) {
    setListData(
      listData.map((list) =>
        list.id === id ? { ...list, updateMode: true } : list
      )
    );
  }

  function finishUpdate(e, inputText, id) {
    if (e.key === "Enter") {
      setListData(
        listData.map((list) =>
          list.id === id
            ? { ...list, list: inputText, updateMode: false }
            : list
        )
      );
    }
  }

  function handleDelete(id) {
    setListData(listData.filter((list) => list.id !== id));
  }

  function handleClearBtn() {
    setListData(listData.filter((list) => list.status === false));
  }

  function handleArrowBtn(arrowIsActive, setArrowIsActive) {
    if (arrowIsActive) {
      setListData(listData.map((list) => ({ ...list, status: false })));
    }
    if (!arrowIsActive) {
      setListData(listData.map((list) => ({ ...list, status: true })));
    }

    setArrowIsActive((arrow) => !arrow);
  }

  return (
    <div className="todos">
      <h1 className="title">todos</h1>
      <InputSection
        listData={listData}
        setListData={setListData}
        handleSubmit={handleSubmit}
        handleArrowBtn={handleArrowBtn}
        displayArrowBtn={displayArrowBtn}
      />
      <ListSection
        listData={listData}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        filterData={filterData}
        handleUpdate={handleUpdate}
        finishUpdate={finishUpdate}
      />
      {listData.length > 0 && (
        <FilterSection
          filterData={filterData}
          setFilterData={setFilterData}
          activeList={activeList}
          completedList={completedList}
          handleClearBtn={handleClearBtn}
        />
      )}
    </div>
  );
}

function InputSection({
  listData,
  setListData,
  handleSubmit,
  handleArrowBtn,
  displayArrowBtn,
}) {
  const [inputText, setInputText] = useState("");
  const [arrowIsActive, setArrowIsActive] = useState(false);
  let id = crypto.randomUUID();

  return (
    <div className="input-section">
      <div>
        {" "}
        {listData.length > 0 && (
          <button
            onClick={() => handleArrowBtn(arrowIsActive, setArrowIsActive)}
            className="arrow-button"
            style={displayArrowBtn ? { color: "grey" } : { color: "#e6e6e6" }}
          >
            <MdOutlineKeyboardArrowDown size="30px" className="icon" />
          </button>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e, inputText, setInputText, id)}>
        <input
          className="input"
          type="text"
          placeholder="What needs to be done?"
          autoFocus
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

function ListSection({
  listData,
  handleCheck,
  handleDelete,
  filterData,
  handleUpdate,
  finishUpdate,
}) {
  let filterArray;

  if (filterData === "active")
    filterArray = listData.filter((list) => list.status === false);

  if (filterData === "completed")
    filterArray = listData.filter((list) => list.status === true);

  if (filterData === "all") filterArray = listData.slice();
  return (
    <div className="todolist-section">
      {filterArray.map((list) => (
        <List
          list={list}
          key={list.id}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          finishUpdate={finishUpdate}
        />
      ))}
    </div>
  );
}

function List({ list, handleCheck, handleDelete, handleUpdate, finishUpdate }) {
  const [displayDeleteBtn, setDisplayDeleteBtn] = useState(false);
  const [inputText, setInputText] = useState(list.list);

  return (
    <div
      onMouseOver={() => setDisplayDeleteBtn(true)}
      onMouseOut={() => setDisplayDeleteBtn(false)}
      className={list.status ? "list completed" : "list"}
    >
      <button onClick={() => handleCheck(list.id)} className="check-button">
        <CiCircleCheck size="30px" className="icon" />
      </button>
      <input
        className="task"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onDoubleClick={() => handleUpdate(list.id)}
        onKeyDown={(e) => finishUpdate(e, inputText, list.id)}
      />
      {displayDeleteBtn && (
        <button onClick={() => handleDelete(list.id)} className="delete-button">
          X
        </button>
      )}
    </div>
  );
}

function FilterSection({
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
