import * as React from 'react';
import { Popover, PopoverProps, Grid, GridProps, Button, makeStyles } from '@material-ui/core';
import classNames from 'clsx';

import { IFiltersList } from '../../attachmentData';

import FiltersListButtons from '../FiltersListButtons/FiltersListButtons';
import FilterDropdownStyles from './FilterDropdownStyles';
import FilterDropdownActions from './FilterDropdownActions';

interface IFilterDropdownProps extends PopoverProps {
   gridContainerProps?: GridProps;
   filtersList?: IFiltersList;
   selectedFilters?: { [filterId: string]: boolean };
   onSelectFilter?: React.MouseEventHandler<HTMLButtonElement>;
   onApplyFilter?: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyle = makeStyles(FilterDropdownStyles);
const FilterDropdown: React.FunctionComponent<IFilterDropdownProps> = (props) => {
   const {
      anchorEl,
      gridContainerProps,
      open,
      className,
      onSelectFilter,
      onApplyFilter: onApplyClick,
      filtersList,
      selectedFilters,
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
            <FilterDropdownActions onApplyClick={onApplyClick} />
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
