import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";

export default function App() {
  const [listData, setListData] = useState([]);
  const [filterData, setFilterData] = useState("all");

  const allList = listData.slice();
  const activeList = listData.filter((list) => list.status === false);
  const completedList = listData.filter((list) => list.status === true);

  function handleSubmit(e, inputText, setInputText, id) {
    e.preventDefault();
    setListData((list) => [
      ...list,
      { status: false, list: inputText, id: id },
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

  function handleDelete(id) {
    setListData(listData.filter((list) => list.id !== id));
  }

  function handleClearBtn() {
    setListData(listData.filter((list) => list.status === false));
  }

  return (
    <div className="todos">
      <h1 className="title">todos</h1>
      <InputSection
        listData={listData}
        setListData={setListData}
        handleSubmit={handleSubmit}
      />
      <ListSection
        listData={listData}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        filterData={filterData}
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

function InputSection({ listData, setListData, handleSubmit }) {
  const [inputText, setInputText] = useState("");
  let id = crypto.randomUUID();

  return (
    <div className="input-section">
      <div>
        {" "}
        {listData.length > 0 && (
          <button className="arrow-button">
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

function ListSection({ listData, handleCheck, handleDelete, filterData }) {
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
        />
      ))}
    </div>
  );
}

function List({ list, handleCheck, handleDelete }) {
  const [displayDeleteBtn, setDisplayDeleteBtn] = useState(false);
  const [inputText, setInputText] = useState(list.list);
  const [updateMode, setUpdateMode] = useState(true);

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
        onDoubleClick={() => setUpdateMode(false)}
        readOnly={updateMode}
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
