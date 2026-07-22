export const tokenVersion = '0.1.0-alpha.0';

export const tokens = {
  color: {
    brand: {
      900: '#002a59',
      700: '#004b82',
      600: '#1d79bf',
      100: '#e8f2fa',
    },
    text: {
      default: '#17202a',
      muted: '#4b5563',
      inverse: '#ffffff',
      link: '#005ea8',
    },
    surface: {
      page: '#ffffff',
      subtle: '#f5f7fa',
      strong: '#002a59',
    },
    border: {
      default: '#c7cdd4',
      strong: '#6b7280',
    },
    feedback: {
      info: '#005ea8',
      success: '#00703c',
      warning: '#f3b61f',
      danger: '#d4351c',
      focus: '#ffbf47',
    },
  },
  font: {
    family: {
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },
  },
  space: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem',
    12: '3rem',
    16: '4rem',
  },
  radius: {
    control: '0.25rem',
    panel: '0.5rem',
  },
  layout: {
    content: '75rem',
    reading: '46rem',
  },
} as const;

export type DesignTokens = typeof tokens;
