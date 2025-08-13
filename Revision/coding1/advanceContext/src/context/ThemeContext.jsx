import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

const ThemeStateContext = createContext("light");
const ThemeActionsContext = createContext(() => {});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // persists across pages until refresh

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const stateValue = useMemo(() => theme, [theme]);
  const actionsValue = useMemo(() => ({ toggleTheme }), [toggleTheme]);

  return (
    <ThemeStateContext.Provider value={stateValue}>
      <ThemeActionsContext.Provider value={actionsValue}>
        {children}
      </ThemeActionsContext.Provider>
    </ThemeStateContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeStateContext);
export const useThemeActions = () => useContext(ThemeActionsContext);
