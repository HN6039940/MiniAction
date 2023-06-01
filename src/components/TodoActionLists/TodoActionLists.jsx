import React from "react";
import { useContext } from "react";
import TodoActionList from "./TodoActionList/TodoActionList";
import { TodoActionListsContext } from "../../context/TodoActionLists.context";

const TodoActionLists = () => {
  const { state } = useContext(TodoActionListsContext);

  return (
    <section className="todo-action-lists">
      {state.map((action) => {
        return <TodoActionList key={action.id} {...action} />;
      })}
    </section>
  );
};

export default TodoActionLists;
