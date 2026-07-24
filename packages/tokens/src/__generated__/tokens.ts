/* Generated from DTCG sources. Do not edit manually. */
export const tokenVersion = "0.1.0-alpha.3" as const;
export const tokenFormat = "DTCG 2025.10" as const;
export const tokens = {
  "component": {
    "button": {
      "borderWidth": "2px",
      "fontWeight": 600,
      "gap": "0.5rem",
      "lineHeight": 1.25,
      "minHeight": "2.75rem",
      "paddingBlock": "0.75rem",
      "paddingInline": "1.5rem",
      "radius": "0.25rem"
    },
    "container": {
      "gutter": "clamp(1rem, 3vw, 2rem)",
      "maxWidth": "75rem"
    },
    "input": {
      "borderWidth": "2px",
      "lineHeight": 1.25,
      "minHeight": "2.75rem",
      "paddingBlock": "0.75rem",
      "paddingInline": "0.75rem",
      "radius": "0.25rem"
    },
    "panel": {
      "elevation": "0 1px 2px rgb(0 42 89 / 0.12)",
      "gap": "1rem",
      "padding": "1.5rem",
      "radius": "0.5rem"
    }
  },
  "core": {
    "color": {
      "blue": {
        "100": "#e8f2fa",
        "600": "#1d79bf",
        "700": "#004b82",
        "900": "#002a59"
      },
      "cyan": {
        "700": "#005ea8"
      },
      "green": {
        "700": "#00703c"
      },
      "neutral": {
        "0": "#ffffff",
        "100": "#f5f7fa",
        "300": "#c7cdd4",
        "500": "#6b7280",
        "700": "#4b5563",
        "1000": "#17202a"
      },
      "red": {
        "700": "#d4351c"
      },
      "yellow": {
        "400": "#ffbf47",
        "500": "#f3b61f"
      }
    },
    "dimension": {
      "breakpoint": {
        "compact": "30rem",
        "maximum": "80rem",
        "medium": "48rem",
        "wide": "64rem"
      },
      "layout": {
        "content": "75rem",
        "reading": "46rem",
        "wide": "90rem"
      },
      "motion": {
        "standard": "0.5rem",
        "subtle": "0.25rem"
      },
      "radius": {
        "control": "0.25rem",
        "panel": "0.5rem"
      },
      "space": {
        "0": "0rem",
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "8": "2rem",
        "10": "2.5rem",
        "12": "3rem",
        "16": "4rem",
        "20": "5rem",
        "24": "6rem"
      },
      "stroke": {
        "focus": "0.25rem",
        "focusHalo": "0.125rem",
        "medium": "2px",
        "thin": "1px"
      },
      "target": {
        "minimum": "2.75rem"
      }
    },
    "duration": {
      "fast": "100ms",
      "instant": "0ms",
      "moderate": "200ms",
      "slow": "350ms"
    },
    "easing": {
      "emphasis": "cubic-bezier(0.2, 0, 0, 1.4)",
      "linear": "linear",
      "standard": "cubic-bezier(0.2, 0, 0, 1)"
    },
    "font": {
      "family": {
        "mono": [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ],
        "sans": [
          "Fira Sans",
          "Noto Sans",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      "letterSpacing": {
        "normal": "0rem",
        "tight": "-0.025rem",
        "wide": "0.08rem"
      },
      "lineHeight": {
        "body": 1.6,
        "compact": 1.05,
        "control": 1.25,
        "heading": 1.2
      },
      "size": {
        "75": "0.75rem",
        "87": "0.875rem",
        "100": "1rem",
        "112": "1.125rem",
        "125": "1.25rem",
        "150": "1.5rem",
        "200": "2rem",
        "250": "2.5rem",
        "300": "3rem",
        "400": "4rem"
      },
      "weight": {
        "bold": 700,
        "extraBold": 800,
        "medium": 500,
        "regular": 400,
        "semibold": 600
      }
    },
    "shadow": {
      "high": "0 12px 32px rgb(0 42 89 / 0.22)",
      "low": "0 1px 2px rgb(0 42 89 / 0.12)",
      "medium": "0 4px 12px rgb(0 42 89 / 0.16)"
    },
    "zIndex": {
      "base": 0,
      "modal": 1100,
      "overlay": 1000,
      "raised": 10,
      "skipLink": 1300,
      "sticky": 100,
      "toast": 1200
    }
  },
  "semantic": {
    "breakpoint": {
      "compact": "30rem",
      "maximum": "80rem",
      "medium": "48rem",
      "wide": "64rem"
    },
    "color": {
      "border": {
        "default": "#c7cdd4",
        "strong": "#6b7280"
      },
      "brand": {
        "100": "#e8f2fa",
        "600": "#1d79bf",
        "700": "#004b82",
        "900": "#002a59",
        "default": "#1d79bf",
        "strong": "#002a59",
        "subtle": "#e8f2fa"
      },
      "feedback": {
        "danger": "#d4351c",
        "info": "#005ea8",
        "success": "#00703c",
        "warning": "#f3b61f"
      },
      "focus": {
        "ring": "#ffbf47"
      },
      "link": {
        "default": "#005ea8"
      },
      "surface": {
        "page": "#ffffff",
        "strong": "#002a59",
        "subtle": "#f5f7fa"
      },
      "text": {
        "default": "#17202a",
        "inverse": "#ffffff",
        "muted": "#4b5563"
      }
    },
    "elevation": {
      "high": "0 12px 32px rgb(0 42 89 / 0.22)",
      "low": "0 1px 2px rgb(0 42 89 / 0.12)",
      "medium": "0 4px 12px rgb(0 42 89 / 0.16)"
    },
    "focus": {
      "halo": "0.125rem",
      "offset": "0.1875rem",
      "width": "0.25rem"
    },
    "font": {
      "family": {
        "mono": [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ],
        "sans": [
          "Fira Sans",
          "Noto Sans",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      "letterSpacing": {
        "body": "0rem",
        "heading": "-0.025rem",
        "label": "0.08rem"
      },
      "lineHeight": {
        "body": 1.6,
        "control": 1.25,
        "display": 1.05,
        "heading": 1.2
      },
      "size": {
        "body": "clamp(1rem, 0.975rem + 0.125vw, 1.0625rem)",
        "bodyLarge": "clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem)",
        "bodySmall": "0.875rem",
        "caption": "0.875rem",
        "display": "clamp(2.5rem, 1.9rem + 3vw, 4rem)",
        "headingLarge": "clamp(2rem, 1.6rem + 2vw, 3rem)",
        "headingMedium": "clamp(1.5rem, 1.3rem + 1vw, 2rem)",
        "headingSmall": "clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)"
      },
      "weight": {
        "bold": 700,
        "extraBold": 800,
        "medium": 500,
        "regular": 400,
        "semibold": 600
      }
    },
    "grid": {
      "columns": {
        "compact": 4,
        "medium": 8,
        "wide": 12
      },
      "gap": "1.5rem"
    },
    "layout": {
      "content": "75rem",
      "gutter": {
        "compact": "1rem",
        "default": "clamp(1rem, 3vw, 2rem)"
      },
      "measure": {
        "default": "66ch",
        "narrow": "45ch",
        "wide": "80ch"
      },
      "reading": "46rem",
      "wide": "90rem"
    },
    "motion": {
      "distance": {
        "standard": "0.5rem",
        "subtle": "0.25rem"
      },
      "duration": {
        "fast": "100ms",
        "instant": "0ms",
        "moderate": "200ms",
        "slow": "350ms"
      },
      "easing": {
        "emphasis": "cubic-bezier(0.2, 0, 0, 1.4)",
        "linear": "linear",
        "standard": "cubic-bezier(0.2, 0, 0, 1)"
      }
    },
    "radius": {
      "control": "0.25rem",
      "panel": "0.5rem"
    },
    "space": {
      "0": "0rem",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      "4": "1rem",
      "5": "1.25rem",
      "6": "1.5rem",
      "8": "2rem",
      "10": "2.5rem",
      "12": "3rem",
      "16": "4rem",
      "20": "5rem",
      "24": "6rem"
    },
    "target": {
      "minimum": "2.75rem"
    },
    "zIndex": {
      "base": 0,
      "modal": 1100,
      "overlay": 1000,
      "raised": 10,
      "skipLink": 1300,
      "sticky": 100,
      "toast": 1200
    }
  }
} as const;
export const flatTokens = {
  "component.button.borderWidth": "2px",
  "component.button.fontWeight": 600,
  "component.button.gap": "0.5rem",
  "component.button.lineHeight": 1.25,
  "component.button.minHeight": "2.75rem",
  "component.button.paddingBlock": "0.75rem",
  "component.button.paddingInline": "1.5rem",
  "component.button.radius": "0.25rem",
  "component.container.gutter": "clamp(1rem, 3vw, 2rem)",
  "component.container.maxWidth": "75rem",
  "component.input.borderWidth": "2px",
  "component.input.lineHeight": 1.25,
  "component.input.minHeight": "2.75rem",
  "component.input.paddingBlock": "0.75rem",
  "component.input.paddingInline": "0.75rem",
  "component.input.radius": "0.25rem",
  "component.panel.elevation": "0 1px 2px rgb(0 42 89 / 0.12)",
  "component.panel.gap": "1rem",
  "component.panel.padding": "1.5rem",
  "component.panel.radius": "0.5rem",
  "core.color.blue.100": "#e8f2fa",
  "core.color.blue.600": "#1d79bf",
  "core.color.blue.700": "#004b82",
  "core.color.blue.900": "#002a59",
  "core.color.cyan.700": "#005ea8",
  "core.color.green.700": "#00703c",
  "core.color.neutral.0": "#ffffff",
  "core.color.neutral.100": "#f5f7fa",
  "core.color.neutral.1000": "#17202a",
  "core.color.neutral.300": "#c7cdd4",
  "core.color.neutral.500": "#6b7280",
  "core.color.neutral.700": "#4b5563",
  "core.color.red.700": "#d4351c",
  "core.color.yellow.400": "#ffbf47",
  "core.color.yellow.500": "#f3b61f",
  "core.dimension.breakpoint.compact": "30rem",
  "core.dimension.breakpoint.maximum": "80rem",
  "core.dimension.breakpoint.medium": "48rem",
  "core.dimension.breakpoint.wide": "64rem",
  "core.dimension.layout.content": "75rem",
  "core.dimension.layout.reading": "46rem",
  "core.dimension.layout.wide": "90rem",
  "core.dimension.motion.standard": "0.5rem",
  "core.dimension.motion.subtle": "0.25rem",
  "core.dimension.radius.control": "0.25rem",
  "core.dimension.radius.panel": "0.5rem",
  "core.dimension.space.0": "0rem",
  "core.dimension.space.1": "0.25rem",
  "core.dimension.space.10": "2.5rem",
  "core.dimension.space.12": "3rem",
  "core.dimension.space.16": "4rem",
  "core.dimension.space.2": "0.5rem",
  "core.dimension.space.20": "5rem",
  "core.dimension.space.24": "6rem",
  "core.dimension.space.3": "0.75rem",
  "core.dimension.space.4": "1rem",
  "core.dimension.space.5": "1.25rem",
  "core.dimension.space.6": "1.5rem",
  "core.dimension.space.8": "2rem",
  "core.dimension.stroke.focus": "0.25rem",
  "core.dimension.stroke.focusHalo": "0.125rem",
  "core.dimension.stroke.medium": "2px",
  "core.dimension.stroke.thin": "1px",
  "core.dimension.target.minimum": "2.75rem",
  "core.duration.fast": "100ms",
  "core.duration.instant": "0ms",
  "core.duration.moderate": "200ms",
  "core.duration.slow": "350ms",
  "core.easing.emphasis": "cubic-bezier(0.2, 0, 0, 1.4)",
  "core.easing.linear": "linear",
  "core.easing.standard": "cubic-bezier(0.2, 0, 0, 1)",
  "core.font.family.mono": [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "monospace"
  ],
  "core.font.family.sans": [
    "Fira Sans",
    "Noto Sans",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif"
  ],
  "core.font.letterSpacing.normal": "0rem",
  "core.font.letterSpacing.tight": "-0.025rem",
  "core.font.letterSpacing.wide": "0.08rem",
  "core.font.lineHeight.body": 1.6,
  "core.font.lineHeight.compact": 1.05,
  "core.font.lineHeight.control": 1.25,
  "core.font.lineHeight.heading": 1.2,
  "core.font.size.100": "1rem",
  "core.font.size.112": "1.125rem",
  "core.font.size.125": "1.25rem",
  "core.font.size.150": "1.5rem",
  "core.font.size.200": "2rem",
  "core.font.size.250": "2.5rem",
  "core.font.size.300": "3rem",
  "core.font.size.400": "4rem",
  "core.font.size.75": "0.75rem",
  "core.font.size.87": "0.875rem",
  "core.font.weight.bold": 700,
  "core.font.weight.extraBold": 800,
  "core.font.weight.medium": 500,
  "core.font.weight.regular": 400,
  "core.font.weight.semibold": 600,
  "core.shadow.high": "0 12px 32px rgb(0 42 89 / 0.22)",
  "core.shadow.low": "0 1px 2px rgb(0 42 89 / 0.12)",
  "core.shadow.medium": "0 4px 12px rgb(0 42 89 / 0.16)",
  "core.zIndex.base": 0,
  "core.zIndex.modal": 1100,
  "core.zIndex.overlay": 1000,
  "core.zIndex.raised": 10,
  "core.zIndex.skipLink": 1300,
  "core.zIndex.sticky": 100,
  "core.zIndex.toast": 1200,
  "semantic.breakpoint.compact": "30rem",
  "semantic.breakpoint.maximum": "80rem",
  "semantic.breakpoint.medium": "48rem",
  "semantic.breakpoint.wide": "64rem",
  "semantic.color.border.default": "#c7cdd4",
  "semantic.color.border.strong": "#6b7280",
  "semantic.color.brand.100": "#e8f2fa",
  "semantic.color.brand.600": "#1d79bf",
  "semantic.color.brand.700": "#004b82",
  "semantic.color.brand.900": "#002a59",
  "semantic.color.brand.default": "#1d79bf",
  "semantic.color.brand.strong": "#002a59",
  "semantic.color.brand.subtle": "#e8f2fa",
  "semantic.color.feedback.danger": "#d4351c",
  "semantic.color.feedback.info": "#005ea8",
  "semantic.color.feedback.success": "#00703c",
  "semantic.color.feedback.warning": "#f3b61f",
  "semantic.color.focus.ring": "#ffbf47",
  "semantic.color.link.default": "#005ea8",
  "semantic.color.surface.page": "#ffffff",
  "semantic.color.surface.strong": "#002a59",
  "semantic.color.surface.subtle": "#f5f7fa",
  "semantic.color.text.default": "#17202a",
  "semantic.color.text.inverse": "#ffffff",
  "semantic.color.text.muted": "#4b5563",
  "semantic.elevation.high": "0 12px 32px rgb(0 42 89 / 0.22)",
  "semantic.elevation.low": "0 1px 2px rgb(0 42 89 / 0.12)",
  "semantic.elevation.medium": "0 4px 12px rgb(0 42 89 / 0.16)",
  "semantic.focus.halo": "0.125rem",
  "semantic.focus.offset": "0.1875rem",
  "semantic.focus.width": "0.25rem",
  "semantic.font.family.mono": [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "monospace"
  ],
  "semantic.font.family.sans": [
    "Fira Sans",
    "Noto Sans",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif"
  ],
  "semantic.font.letterSpacing.body": "0rem",
  "semantic.font.letterSpacing.heading": "-0.025rem",
  "semantic.font.letterSpacing.label": "0.08rem",
  "semantic.font.lineHeight.body": 1.6,
  "semantic.font.lineHeight.control": 1.25,
  "semantic.font.lineHeight.display": 1.05,
  "semantic.font.lineHeight.heading": 1.2,
  "semantic.font.size.body": "clamp(1rem, 0.975rem + 0.125vw, 1.0625rem)",
  "semantic.font.size.bodyLarge": "clamp(1.125rem, 1.075rem + 0.25vw, 1.25rem)",
  "semantic.font.size.bodySmall": "0.875rem",
  "semantic.font.size.caption": "0.875rem",
  "semantic.font.size.display": "clamp(2.5rem, 1.9rem + 3vw, 4rem)",
  "semantic.font.size.headingLarge": "clamp(2rem, 1.6rem + 2vw, 3rem)",
  "semantic.font.size.headingMedium": "clamp(1.5rem, 1.3rem + 1vw, 2rem)",
  "semantic.font.size.headingSmall": "clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)",
  "semantic.font.weight.bold": 700,
  "semantic.font.weight.extraBold": 800,
  "semantic.font.weight.medium": 500,
  "semantic.font.weight.regular": 400,
  "semantic.font.weight.semibold": 600,
  "semantic.grid.columns.compact": 4,
  "semantic.grid.columns.medium": 8,
  "semantic.grid.columns.wide": 12,
  "semantic.grid.gap": "1.5rem",
  "semantic.layout.content": "75rem",
  "semantic.layout.gutter.compact": "1rem",
  "semantic.layout.gutter.default": "clamp(1rem, 3vw, 2rem)",
  "semantic.layout.measure.default": "66ch",
  "semantic.layout.measure.narrow": "45ch",
  "semantic.layout.measure.wide": "80ch",
  "semantic.layout.reading": "46rem",
  "semantic.layout.wide": "90rem",
  "semantic.motion.distance.standard": "0.5rem",
  "semantic.motion.distance.subtle": "0.25rem",
  "semantic.motion.duration.fast": "100ms",
  "semantic.motion.duration.instant": "0ms",
  "semantic.motion.duration.moderate": "200ms",
  "semantic.motion.duration.slow": "350ms",
  "semantic.motion.easing.emphasis": "cubic-bezier(0.2, 0, 0, 1.4)",
  "semantic.motion.easing.linear": "linear",
  "semantic.motion.easing.standard": "cubic-bezier(0.2, 0, 0, 1)",
  "semantic.radius.control": "0.25rem",
  "semantic.radius.panel": "0.5rem",
  "semantic.space.0": "0rem",
  "semantic.space.1": "0.25rem",
  "semantic.space.10": "2.5rem",
  "semantic.space.12": "3rem",
  "semantic.space.16": "4rem",
  "semantic.space.2": "0.5rem",
  "semantic.space.20": "5rem",
  "semantic.space.24": "6rem",
  "semantic.space.3": "0.75rem",
  "semantic.space.4": "1rem",
  "semantic.space.5": "1.25rem",
  "semantic.space.6": "1.5rem",
  "semantic.space.8": "2rem",
  "semantic.target.minimum": "2.75rem",
  "semantic.zIndex.base": 0,
  "semantic.zIndex.modal": 1100,
  "semantic.zIndex.overlay": 1000,
  "semantic.zIndex.raised": 10,
  "semantic.zIndex.skipLink": 1300,
  "semantic.zIndex.sticky": 100,
  "semantic.zIndex.toast": 1200
} as const;
export const tokenMetadata = {
  "format": "DTCG 2025.10",
  "sourceHash": "0de41f8e60b72d53b1027c3493f889d806d2fc02fdf923ff5a9979c3a97be808",
  "tokenCount": 202,
  "aliasCount": 103,
  "layers": [
    "core",
    "semantic",
    "component"
  ],
  "sources": [
    "core.tokens.json",
    "semantic.tokens.json",
    "component.tokens.json"
  ]
} as const;

export type DesignTokens = typeof tokens;
export type TokenPath = keyof typeof flatTokens;
