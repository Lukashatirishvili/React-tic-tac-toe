import { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function InputSection({
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
