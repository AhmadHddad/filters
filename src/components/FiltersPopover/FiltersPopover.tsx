import * as React from 'react';
import { makeStyles, PopoverClassKey } from '@material-ui/core';
import filtersPopoverStyles from './filtersPopoverStyles';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import classNames from 'clsx';
import { IPopoverProps } from '../Popover/Popover';
import Popover from '../Popover/Popover';

export interface IFiltersPopoverProps extends IPopoverProps {
   fullHeight?: boolean;
}

const useStyle = makeStyles(filtersPopoverStyles);

export default function FiltersPopover(props: IFiltersPopoverProps) {
   const { open, children, fullHeight, ...rest } = props;

   const classes = useStyle(props);

   const otherClasses: Partial<ClassNameMap<PopoverClassKey>> = rest.classes || {};

   return (
      <Popover
         {...rest}
         classes={{
            ...otherClasses,
            paper: classNames(classes.paperContainer, otherClasses.paper),
         }}
      >
         {children}
      </Popover>
   );
}
