import React from "react";
import Header from "./components/Header/Header";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import attachmentData from "./attachmentData";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "start",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

function App() {
  const classes = useStyles();
  const filtersKeys = Object.keys(attachmentData);
  return (
    <div>
      <Header />
      <div>
        <ul className={classes.root}>
          {filtersKeys.map((key) => (
            <Chip label={key} className={classes.chip} />
          ))}
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
