import * as React from 'react';
import { Popover, makeStyles, PopoverProps, PopoverClassKey } from '@material-ui/core';
import filtersPopoverStyles from './filtersPopoverStyles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

export interface IFiltersPopoverProps extends PopoverProps {}

const useStyle = makeStyles(filtersPopoverStyles);

export default function FiltersPopover(props: IFiltersPopoverProps) {
   const { anchorEl, open, children, ...rest } = props;
   const classes = useStyle(props);
   const show = Boolean(anchorEl);

   const otherClasses: Partial<ClassNameMap<PopoverClassKey>> = rest.classes || {};

   return (
      <Popover
         open={show}
         anchorEl={anchorEl}
         transitionDuration={100}
         {...rest}
         classes={{ paper: classes.paperContainer, ...otherClasses }}
      >
         {children}
      </Popover>
   );
}

FiltersPopover.defaultProps = {
   anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
   },
   transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
   },
};
