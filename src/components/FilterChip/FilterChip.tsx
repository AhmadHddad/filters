import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import filterChipStyle from './filterChipStyle';
import classNames from 'clsx';

const useStyles = makeStyles(filterChipStyle);

export interface IFilterChipProps extends ChipProps {
   selected?: boolean;
   square?: boolean;
   name?: string;
}

const FilterChip: React.FunctionComponent<IFilterChipProps> = (props) => {
   const { className, selected, square, ...rest } = props;
   const classes = useStyles(props);

   return (
      <Chip
         className={classNames(classes.chip, className, {
            [classes.selected]: selected,
            [classes.square]: square,
         })}
         {...rest}
      />
   );
};

export default FilterChip;
