import * as React from 'react';
import { Grid, GridProps, Button, makeStyles } from '@material-ui/core';
import classNames from 'clsx';
import { IButtonClickEvent } from '../../shared/interfaces';
import FilterDropdownActionsStyles from './FilterDropdownActionsStyles';

interface IFilterDropdownActionsProps extends GridProps {
   hideCancel?: boolean;
   hideApply?: boolean;
   disableCancel?: boolean;
   disableApply?: boolean;
   onApplyClick?: IButtonClickEvent;
   onCancelClick?: IButtonClickEvent;
}
const useStyle = makeStyles(FilterDropdownActionsStyles);

const FilterDropdownActions: React.FunctionComponent<IFilterDropdownActionsProps> = (props) => {
   const {
      hideCancel,
      onApplyClick,
      onCancelClick,
      hideApply,
      className,
      disableCancel,
      disableApply,
      ...rest
   } = props;

   const classes = useStyle(props);

   const buttonsList = [
      { callback: onCancelClick, hide: hideCancel, label: 'Cancel', disabled: disableCancel },
      { callback: onApplyClick, hide: hideApply, label: 'Apply', disabled: disableApply },
   ];

   const renderButtons = () =>
      buttonsList.map((button, index) => (
         <Grid item key={index}>
            {button.hide ? null : (
               <Button
                  disabled={button.disabled}
                  id={button.label}
                  onClick={button.callback}
                  variant={'outlined'}
                  size="small"
                  color="primary"
               >
                  {button.label}
               </Button>
            )}
         </Grid>
      ));

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
