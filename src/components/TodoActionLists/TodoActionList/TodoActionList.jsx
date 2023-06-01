import React from "react";
import { useContext } from "react";
import { TodoActionListsContext } from "../../../context/TodoActionLists.context";
import "./TodoActonList.css";
const TodoActionList = ({ text, isComplete, id }) => {
  const { dispatch } = useContext(TodoActionListsContext);
  const handleIsComplete = () => {
    dispatch({
      type: "IS_COMPLETE_ACTION",
      payload: { id, isComplete },
    });
  };

  const handleRemoveAction = (e) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_TODO_ACTION",
      payload: { id },
    });
  };
  return (
    <article className="todo-action-article">
      <form action="" className="todo-form">
        <input
          type="checkbox"
          name=""
          id=""
          checked={isComplete ? true : false}
          onChange={handleIsComplete}
        />
      </form>
      {isComplete ? (
        <del>
          <p className="todo-text">{text}</p>
        </del>
      ) : (
        <p className="todo-text">{text}</p>
      )}
      <div className="btn-wrap">
        <button onClick={handleRemoveAction} className="delete-btn">
          remove
        </button>
      </div>
    </article>
  );
};

export default TodoActionList;
