import * as React from 'react';
import { PopoverProps, Grid, GridProps, makeStyles } from '@material-ui/core';
import classNames from 'clsx';
import FiltersPopover from '../FiltersPopover/FiltersPopover';
import { IFiltersList } from '../../attachmentData';

import FiltersListButtons from '../FiltersListButtons/FiltersListButtons';
import FilterDropdownActions from '../FilterDropdownActions/FilterDropdownActions';
import { IButtonClickEvent, IKeyValueDictionary } from '../../shared/interfaces';
import filterDropdownStyles from './filterDropdownStyles';

export interface IFilterDropdownProps extends PopoverProps {
   gridContainerProps?: GridProps;
   filtersList?: IFiltersList;
   selectedFilters?: IKeyValueDictionary<boolean>;
   onSelectFilter?: IButtonClickEvent;
   onApplyFilter?: IButtonClickEvent;
   onCancelClick?: IButtonClickEvent;
   isChanged?: boolean;
}

const useStyle = makeStyles(filterDropdownStyles);

const FilterDropdown: React.FunctionComponent<IFilterDropdownProps> = (props) => {
   const {
      anchorEl,
      gridContainerProps,
      open,
      onSelectFilter,
      onApplyFilter,
      onCancelClick,
      filtersList,
      selectedFilters,
      isChanged,
      ...rest
   } = props;

   const classes = useStyle(props);

   return (
      <FiltersPopover anchorEl={anchorEl} {...rest}>
         <Grid
            container
            justify="space-between"
            className={classNames(gridContainerProps?.className, classes.gridContainer)}
            {...gridContainerProps}
         >
            <FiltersListButtons
               item
               className={classes.buttonsListContainer}
               filtersList={filtersList}
               onFilterClicked={onSelectFilter}
               selectedFilters={selectedFilters}
            />
            <FilterDropdownActions
               disableApply={!isChanged}
               hideCancel={!isChanged}
               onApplyClick={onApplyFilter}
               onCancelClick={onCancelClick}
            />
         </Grid>
      </FiltersPopover>
   );
};

FilterDropdown.defaultProps = {
   anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
   },
   transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
   },
};

export default FilterDropdown;
