'use client';

import { themeNames, themes, themeStorageKey, type ThemeName } from '@sistem-digital/tokens';
import { useEffect, useState } from 'react';

type ThemePreference = 'system' | ThemeName;

function systemTheme(): ThemeName {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(preference: ThemePreference) {
  const root = document.documentElement;
  const theme = preference === 'system' ? systemTheme() : preference;

  if (preference === 'system') {
    window.localStorage.removeItem(themeStorageKey);
    root.dataset.sdThemeSource = 'system';
  } else {
    window.localStorage.setItem(themeStorageKey, preference);
    root.dataset.sdThemeSource = 'stored';
  }

  root.dataset.sdTheme = theme;
  root.style.colorScheme = themes[theme].colorScheme;
}

export function ThemeControls() {
  const [preference, setPreference] = useState<ThemePreference>('system');

  useEffect(() => {
    const stored = window.localStorage.getItem(themeStorageKey);
    const initial = themeNames.includes(stored as ThemeName) ? (stored as ThemeName) : 'system';
    setPreference(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (preference !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => applyTheme('system');
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [preference]);

  return (
    <div className="theme-control">
      <label htmlFor="theme-preference">Aspect</label>
      <select
        id="theme-preference"
        value={preference}
        onChange={(event) => {
          const next = event.target.value as ThemePreference;
          setPreference(next);
          applyTheme(next);
        }}
      >
        <option value="system">Automat, după sistem</option>
        {themeNames.map((name) => (
          <option key={name} value={name}>
            {themes[name].label}
          </option>
        ))}
      </select>
    </div>
  );
}
