import Filter from "./components/Filter";
import Header from "./components/Header";
import Input from "./components/Input";
import ListSection from "./components/ListSection";
import { useTodosContext } from "./context/TodosContext";

export default function App() {
  const { todoList } = useTodosContext();
  return (
    <div className="app-container">
      <Header />
      <div className="todos">
        <Input />
        <ListSection />
        {todoList.length > 0 && <Filter />}
      </div>
    </div>
  );
}
