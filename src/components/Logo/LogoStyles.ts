import { createStyles, Theme } from "@material-ui/core";

export default function LogoStyles(theme: Theme) {
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
}
