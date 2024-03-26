import { useTodosContext } from "../context/TodosContext";
import List from "./List";

function ListSection() {
  const { todoList, filterOption } = useTodosContext();

  const activeTask = todoList.filter((list) => !list.completed);
  const completedTask = todoList.filter((list) => list.completed);

  return (
    <div className="list-container">
      {filterOption === "all" &&
        todoList.map((list) => <List list={list} key={list.id} />)}
      {filterOption === "active" &&
        activeTask.map((list) => <List list={list} key={list.id} />)}
      {filterOption === "completed" &&
        completedTask.map((list) => <List list={list} key={list.id} />)}
    </div>
  );
}

export default ListSection;
