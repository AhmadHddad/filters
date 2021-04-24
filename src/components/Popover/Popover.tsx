import * as React from 'react';
import { Popover as MuiPopover, PopoverProps } from '@material-ui/core';

export interface IPopoverProps extends PopoverProps {}

export default function Popover(props: IPopoverProps) {
   const { anchorEl, open, children, ...rest } = props;
   const show = Boolean(anchorEl);

   return (
      <MuiPopover open={show} anchorEl={anchorEl} transitionDuration={100} {...rest}>
         {children}
      </MuiPopover>
   );
}

Popover.defaultProps = {
   anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
   },
   transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
   },
};
