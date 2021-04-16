import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridProps } from "@material-ui/core/Grid";
import classNames from "clsx";
import BarStyles from "./BarStyle";

const useStyles = makeStyles(BarStyles);

export interface IBarProps extends GridProps {}

const Bar: React.FunctionComponent<IBarProps> = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles(props);

  return (
    <Grid container className={classNames(classes.bar, className)} {...rest}>
      {props.children}
    </Grid>
  );
};

export default Bar;
