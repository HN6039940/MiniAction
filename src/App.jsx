import { ToastContainer } from "react-toastify";
import InputActionForm from "./components/InputActionForm/InputActionForm";
import TodoActionLists from "./components/TodoActionLists/TodoActionLists";
const App = () => {
  return (
    <main className="mini-action-section">
      <InputActionForm />
      <TodoActionLists />
      <ToastContainer limit={2} />
    </main>
  );
};

export default App;
