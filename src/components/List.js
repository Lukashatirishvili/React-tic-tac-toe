import { useTodosContext } from "../context/TodosContext";

function List({ list }) {
  const {
    handleShowDeleteButton,
    handleDeleteTask,
    handleCompleteTask,
    handleUpdateTask,
    handleTaskChange,
    handleFinishUpdate,
  } = useTodosContext();

  return (
    <div
      className={`list ${list.completed ? "completed" : ""}`}
      onMouseOver={(e) => handleShowDeleteButton(e, list.id)}
      onMouseOut={(e) => handleShowDeleteButton(e, list.id)}
    >
      {!list.isEditable && (
        <button
          onClick={() => handleCompleteTask(list.id)}
          className="button check"
        >
          Check
          {/* <ion-icon name="checkmark-circle-outline"></ion-icon> */}
        </button>
      )}
      <form onSubmit={handleFinishUpdate} className="task">
        <input
          className="taskInput"
          type="text"
          onDoubleClick={() => handleUpdateTask(list.id)}
          readOnly={!list.isEditable}
          value={list.task}
          onChange={(e) => handleTaskChange(e, list.id)}
        />
      </form>

      {!list.isEditable && list.showDeleteButton && (
        <button
          onClick={() => handleDeleteTask(list.id)}
          className="button delete"
        >
          Delete
          {/* <ion-icon name="close-outline" eventType="onMouseOver"></ion-icon> */}
        </button>
      )}
    </div>
  );
}

export default List;
