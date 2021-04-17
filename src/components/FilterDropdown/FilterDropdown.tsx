import * as React from 'react';
import { Popover, PopoverProps, Grid, GridProps, makeStyles } from '@material-ui/core';
import classNames from 'clsx';

import { IFiltersList } from '../../attachmentData';

import FiltersListButtons from '../FiltersListButtons/FiltersListButtons';
import FilterDropdownStyles from './FilterDropdownStyles';
import FilterDropdownActions from './FilterDropdownActions';
import { IButtonClickEvent, IKeyValueDictionary } from '../../shared/interfaces';

export interface IFilterDropdownProps extends PopoverProps {
   gridContainerProps?: GridProps;
   filtersList?: IFiltersList;
   selectedFilters?: IKeyValueDictionary<boolean>;
   onSelectFilter?: IButtonClickEvent;
   onApplyFilter?: IButtonClickEvent;
   onCancelClick?: IButtonClickEvent;
   isChanged?: boolean;
}

const useStyle = makeStyles(FilterDropdownStyles);

const FilterDropdown: React.FunctionComponent<IFilterDropdownProps> = (props) => {
   const {
      anchorEl,
      gridContainerProps,
      open,
      className,
      onSelectFilter,
      onApplyFilter,
      onCancelClick,
      filtersList,
      selectedFilters,
      isChanged,
      ...rest
   } = props;

   const classes = useStyle(props);
   const show = Boolean(anchorEl);

   return (
      <Popover open={show} anchorEl={anchorEl} transitionDuration={100} {...rest}>
         <Grid
            container
            justify="space-between"
            className={classNames(className, classes.gridContainer)}
            {...gridContainerProps}
         >
            <FiltersListButtons
               item
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
      </Popover>
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
