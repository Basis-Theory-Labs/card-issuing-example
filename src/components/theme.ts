import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4C69EB",
    },
    secondary: {
      main: "#fff",
      contrastText: "#4C69EB",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "48px",
        },
      },
    },
  },
  typography: {
    fontFamily: '"Inter", Roboto, arial',
  },
});

export { theme };
