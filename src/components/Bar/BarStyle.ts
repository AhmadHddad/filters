import { createStyles, Theme } from "@material-ui/core/styles";

const BarStyles = (theme: Theme) =>
  createStyles({
    bar: {
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      margin: 0,
    },
  });

export default BarStyles;
