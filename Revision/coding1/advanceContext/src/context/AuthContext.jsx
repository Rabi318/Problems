import React from "react";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";

const AuthStateContext = createContext(null);
const AuthActionsContext = createContext(null);

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  role: "user",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
        role: action.role,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback(({ token, user, role }) => {
    dispatch({ type: "LOGIN_SUCCESS", token, user, role });
  }, []);
  const logout = useCallback(() => dispatch({ type: "LOGOUT" }), []);
  const stateValue = useMemo(() => state, [state]);
  const actionValue = useMemo(() => ({ login, logout }), [login, logout]);

  return (
    <AuthStateContext.Provider value={stateValue}>
      <AuthActionsContext.Provider value={actionValue}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthActions = () => useContext(AuthActionsContext);
