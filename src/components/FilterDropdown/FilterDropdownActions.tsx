import * as React from 'react';
import { Popover, PopoverProps, Grid, GridProps, Button, makeStyles } from '@material-ui/core';
import classNames from 'clsx';
import FilterDropdownStyles from './FilterDropdownStyles';

interface IFilterDropdownActionsProps extends GridProps {
   hideCancel?: boolean;
   hideApply?: boolean;
   onApplyClick?: React.MouseEventHandler<any>;
   onCancelClick?: React.MouseEventHandler<any>;
}
const useStyle = makeStyles(FilterDropdownStyles);

const FilterDropdownActions: React.FunctionComponent<IFilterDropdownActionsProps> = (props) => {
   const { hideCancel, onApplyClick, onCancelClick, hideApply, className, ...rest } = props;

   const classes = useStyle(props);

   const buttonsList = [
      { callback: onCancelClick, hide: hideCancel, label: 'Cancel' },
      { callback: onApplyClick, hide: hideApply, label: 'Apply' },
   ];

   const renderButtons = () =>
      buttonsList.map((button, index) =>
         button.hide ? null : (
            <Grid item key={index}>
               <Button
                  id={button.label}
                  onClick={button.callback}
                  variant={'outlined'}
                  size="small"
                  color="primary"
               >
                  {button.label}
               </Button>
            </Grid>
         ),
      );

   return (
      <Grid
         container
         justify="space-between"
         item
         md={12}
         alignContent="flex-end"
         {...rest}
         className={classNames(className, classes.actionsContainer)}
      >
         {renderButtons()}
      </Grid>
   );
};

export default FilterDropdownActions;
