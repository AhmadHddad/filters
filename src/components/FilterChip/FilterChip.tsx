import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import FilterChipStyle from "./FilterChipStyle";
import classNames from "clsx";

const useStyles = makeStyles(FilterChipStyle);

export interface IFilterChipProps extends ChipProps {}

const FilterChip: React.FunctionComponent<IFilterChipProps> = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles(props);

  return <Chip className={classNames(classes.chip, className)} {...rest} />;
};

export default FilterChip;
