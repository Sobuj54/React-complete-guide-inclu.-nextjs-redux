import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
    A300?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
    A300?: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      lighter: "#e6f4ff",
      100: "#bae0ff",
      200: "#91caff",
      light: "#69b1ff",
      400: "#4096ff",
      main: "#1677ff",
      dark: "#0958d9",
      700: "#003eb3",
      darker: "#002c8c",
      900: "#001d66",
      contrastText: "#fff",
    },
    secondary: {
      lighter: "#f5f5f5",
      100: "#f5f5f5",
      200: "#f0f0f0",
      light: "#d9d9d9",
      400: "#bfbfbf",
      main: "#8c8c8c",
      600: "#595959",
      dark: "#262626",
      800: "#141414",
      darker: "#000000",
      // Gray Accents (A100-A300)
      A100: "#ffffff",
      A200: "#434343",
      A300: "#1f1f1f",
    },
    success: {
      lighter: "#f6ffed",
      light: "#95de64",
      main: "#52c41a",
      dark: "#237804",
      darker: "#092b00",
      contrastText: "#fff",
    },
    error: {
      lighter: "#fff1f0",
      light: "#ffa39e",
      main: "#ff4d4f",
      dark: "#a8071a",
      darker: "#5c0011",
      contrastText: "#fff",
    },
    warning: {
      lighter: "#fffbe6",
      light: "#ffd666",
      main: "#faad14",
      dark: "#ad6800",
      darker: "#613400",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: "5px",
  },
});

export default theme;
