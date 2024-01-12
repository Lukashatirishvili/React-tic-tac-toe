import List from "./List";

export default function ListSection({
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
