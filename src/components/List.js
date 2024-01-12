import { useState } from "react";
import { CiCircleCheck } from "react-icons/ci";

export default function List({
  list,
  handleCheck,
  handleDelete,
  handleUpdate,
  finishUpdate,
}) {
  const [displayDeleteBtn, setDisplayDeleteBtn] = useState(false);
  const [inputText, setInputText] = useState(list.list);

  return (
    <div
      onMouseOver={() => setDisplayDeleteBtn(true)}
      onMouseOut={() => setDisplayDeleteBtn(false)}
      className={
        list.status
          ? `list completed ${list.updateMode ? "updateMode" : ""}`
          : `list ${list.updateMode ? "updateMode" : ""}`
      }
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
        readOnly={list.updateMode ? false : true}
      />
      {displayDeleteBtn && (
        <button onClick={() => handleDelete(list.id)} className="delete-button">
          X
        </button>
      )}
    </div>
  );
}
