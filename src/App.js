import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";

export default function App() {
  const [listData, setListData] = useState([]);

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
      />
      {listData.length > 0 && (
        <FilterSection
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

function ListSection({ listData, handleCheck, handleDelete }) {
  return (
    <div className="todolist-section">
      {listData.map((list) => (
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
  return (
    <div className={list.status ? "list completed" : "list"}>
      <button onClick={() => handleCheck(list.id)} className="check-button">
        <CiCircleCheck size="30px" className="icon" />
      </button>
      <input className="task" type="text" value={list.list} readOnly />
      <button onClick={() => handleDelete(list.id)} className="delete-button">
        X
      </button>
    </div>
  );
}

function FilterSection({ completedList, handleClearBtn }) {
  return (
    <div className="filterSection">
      <span className="itemsLeft">0 items left</span>
      <div className="filterButtons">
        <button className="allButton">All</button>
        <button className="activeButton">Active</button>
        <button className="completedButton">Completed</button>
      </div>
      {completedList.length > 0 && (
        <button onClick={handleClearBtn} className="clearButton">
          Clear completed
        </button>
      )}
    </div>
  );
}
