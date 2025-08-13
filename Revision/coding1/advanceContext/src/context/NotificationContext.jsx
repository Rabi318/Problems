import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";

const NotifStateContext = createContext(null);
const NotifActionsContext = createContext(null);

const initial = { items: [] }; // { id, message, createdAt, read: boolean }

function reducer(state, action) {
  switch (action.type) {
    case "PUSH":
      return { items: [action.payload, ...state.items] };
    case "MARK_ALL_READ":
      return { items: state.items.map((n) => ({ ...n, read: true })) };
    default:
      return state;
  }
}

export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const push = useCallback((message) => {
    dispatch({
      type: "PUSH",
      payload: {
        id: crypto.randomUUID(),
        message,
        createdAt: Date.now(),
        read: false,
      },
    });
  }, []);

  const markAllRead = useCallback(
    () => dispatch({ type: "MARK_ALL_READ" }),
    []
  );

  const stateValue = useMemo(() => state, [state]);
  const actionsValue = useMemo(
    () => ({ push, markAllRead }),
    [push, markAllRead]
  );

  return (
    <NotifStateContext.Provider value={stateValue}>
      <NotifActionsContext.Provider value={actionsValue}>
        {children}
      </NotifActionsContext.Provider>
    </NotifStateContext.Provider>
  );
}

export const useNotifications = () => useContext(NotifStateContext);
export const useNotificationActions = () => useContext(NotifActionsContext);
