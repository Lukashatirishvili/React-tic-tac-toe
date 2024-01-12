import InputSection from "./InputSection";
import ListSection from "./ListSection";
import FilterSection from "./FilterSection";
import { useState } from "react";

function getFromStorage(request) {
  if (request === "listData") {
    return JSON.parse(localStorage.getItem("listData")) || [];
  }
  if (request === "filterData") {
    return localStorage.getItem("filterData") || "all";
  }
}

export default function App() {
  const [listData, setListData] = useState(getFromStorage("listData"));
  const [filterData, setFilterData] = useState(getFromStorage("filterData"));

  localStorage.setItem("listData", JSON.stringify(listData));
  localStorage.setItem("filterData", filterData);

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
