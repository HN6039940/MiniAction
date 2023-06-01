import React from "react";
import { useState, useContext } from "react";
import { TodoActionListsContext } from "../../context/TodoActionLists.context";
import { ACTION_LISTS_TYPE } from "../../utils/ActionListsType";

import "./InputActionForm.css";

const InputActionForm = () => {
  const { dispatch } = useContext(TodoActionListsContext);
  const [actionText, setActionText] = useState("");

  const handleChange = (e) => {
    setActionText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTION_LISTS_TYPE.ADD_ACTION_TEXT, payload: actionText });
    setActionText("");
  };

  return (
    <section className="action-form-section">
      <h3>mini action</h3>
      <form action="" onSubmit={handleSubmit} className="action-form">
        <input
          type="text"
          name=""
          id=""
          value={actionText}
          className="action-form-text"
          placeholder="action"
          maxLength="200"
          onChange={handleChange}
        />
        <button type="submit" className="action-form-btn">
          submit
        </button>
      </form>
    </section>
  );
};

export default InputActionForm;
