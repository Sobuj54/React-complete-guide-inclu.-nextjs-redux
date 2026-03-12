import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f54a00", // Your 10% Accent (Orange)
    },
    background: {
      default: "#f1f5f9", // Your 60% Dominant (Slate Gray)
      paper: "#ffffff", // Your 30% Secondary (White)
    },
  },
});

export default theme;
