import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { ACTION_LISTS_TYPE } from "../utils/ActionListsType";
import { TOAST_POPUP_TYPE } from "../utils/ToastConfig";
import { ToastConfig } from "../utils/ToastConfig";
export const TodoActionListsContext = createContext();

// ローカルストレージにデータを保存するヘルパー関数
const TodoActionListsProvider = ({ children }) => {
  const setLocalStorage = (state) => {
    localStorage.setItem("todoActionLists", JSON.stringify(state));
  };

  // ローカルストレージからデータを取得するヘルパー関数
  const checkLocalStorage = () => {
    const todoActionLists = localStorage.getItem("todoActionLists");
    if (!todoActionLists) {
      return [];
    }
    return JSON.parse(todoActionLists);
  };

  // typeごとに対応するポップアップを表示する
  const showToastPopUp = (type) => {
    if (type === TOAST_POPUP_TYPE.SUCCESS) {
      toast.success("Add action success", ToastConfig);
    } else if (type === TOAST_POPUP_TYPE.INFO) {
      toast.info("Remove action success", ToastConfig);
    } else if (type === TOAST_POPUP_TYPE.ERROR) {
      toast.error("No action found", ToastConfig);
    }
    toast.clearWaitingQueue();
  };

  // inputフォームに入力されたテキストを追加する
  const addTodoActionText = (state, actionText) => {
    if (!actionText) {
      showToastPopUp(TOAST_POPUP_TYPE.ERROR);
      return state;
    }

    const newAction = {
      id: nanoid(),
      text: actionText,
      isComplete: false,
    };

    showToastPopUp(TOAST_POPUP_TYPE.SUCCESS);

    setLocalStorage([...state, newAction]);
    return [...state, newAction];
  };

  // アクションの完了状態を設定する
  const setActionIsComplete = (state, payloadAction) => {
    const checkTodoAction = state.find(
      (action) => action.id === payloadAction.id
    );

    if (!checkTodoAction) {
      showToastPopUp(TOAST_POPUP_TYPE.ERROR);
      return state;
    }

    const toggleCompleteAction = state.map((action) =>
      action.id === payloadAction.id
        ? { ...action, isComplete: !payloadAction.isComplete }
        : action
    );

    setLocalStorage(toggleCompleteAction);

    return toggleCompleteAction;
  };

  // アクションを削除するための関数
  const removeTodoAction = (state, payloadAction) => {
    const newAction = state.filter((action) => action.id !== payloadAction.id);

    showToastPopUp(TOAST_POPUP_TYPE.INFO);

    setLocalStorage(newAction);
    return newAction;
  };

  // Reducer
  const createTodoReducer = (state, action) => {
    switch (action.type) {
      case ACTION_LISTS_TYPE.ADD_ACTION_TEXT:
        return addTodoActionText(state, action.payload);
      case ACTION_LISTS_TYPE.IS_COMPLETE_ACTION:
        return setActionIsComplete(state, action.payload);
      case ACTION_LISTS_TYPE.REMOVE_TODO_ACTION:
        return removeTodoAction(state, action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(createTodoReducer, checkLocalStorage());
  const value = { state, dispatch };
  return (
    <TodoActionListsContext.Provider value={value}>
      {children}
    </TodoActionListsContext.Provider>
  );
};

export default TodoActionListsProvider;
