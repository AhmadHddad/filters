import { createStyles, Theme } from "@material-ui/core";

const LogoStyles = (theme: Theme) => {
  return createStyles({
    titleContainer: {
      marginLeft: 16,
      display: "flex",
      alignItems: "center",
    },
    title: {
      fontWeight: "bold",
    },
    logo: {
      filter: "invert()",
    },
  });
};

export default LogoStyles;
