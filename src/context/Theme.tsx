import { createContext, useContext, useMemo } from 'react';

import { DEFAULT_THEME, SUPPORTED_THEMES, Theme, ThemeClassName, useTheme } from '../hooks';

const ThemeContext = createContext<{
  theme: Theme;
  themeClassName: ThemeClassName;
}>({
  theme         : DEFAULT_THEME,
  themeClassName: SUPPORTED_THEMES[DEFAULT_THEME]
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  const value = useMemo(
    () => ({
      theme,
      themeClassName: SUPPORTED_THEMES[theme]
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
