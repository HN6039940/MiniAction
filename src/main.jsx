import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import TodoActionListsProvider from "./context/TodoActionLists.context";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoActionListsProvider>
      <App />
    </TodoActionListsProvider>
  </React.StrictMode>
);
