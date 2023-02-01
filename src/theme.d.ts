import React from 'react';
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status: {
      danger: React.CSSProperties['color'];
    };
  }
  interface paletteOptions {
    neutral?: PaletteColorOptions;
  }
  interface palette {
    neutral?: PaletteColor;
  }

  interface simplePaletteColorOptions {
    darker?: string;
  }

  interface PaletteColor {
    darker?: string;
  }
  interface TypeBackground {
    outletBackground?: string;
  }
}
