import { useEffect, useState } from 'react';

export type ThemeClassName = 'str-chat__theme-light' | 'str-chat__theme-dark';

export type Theme = 'light' | 'dark';

export const SUPPORTED_THEMES: Record<Theme, ThemeClassName> = {
  light: 'str-chat__theme-light',
  dark : 'str-chat__theme-dark'
} as const;

export const DEFAULT_THEME: Theme = 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  useEffect(() => {
    const handleThemeChange = ({ data: themeName }: MessageEvent<Theme>) => {
      // handle events only from trusted origin
      if (Object.keys(SUPPORTED_THEMES).includes(themeName)) {
        setTheme(themeName);
      }
    };

    window.addEventListener('message', handleThemeChange);

    return () => {
      window.removeEventListener('message', handleThemeChange);
    };
  }, []);

  return theme;
};
