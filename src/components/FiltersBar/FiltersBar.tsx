import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';

import Bar from '../Bar/Bar';
import FilterChip from '../FilterChip/FilterChip';
import { IFilterCat } from '../../containers/FiltersBarContainer/FiltersBarContainer';
import filtersBarStyles from './filtersBarStyles';

const useStyles = makeStyles(filtersBarStyles);

export interface FiltersBarProps {
   filterCatList: IFilterCat[];
   className?: string;
   selectedFilterCat?: string;
   isMobile?: boolean;
   onFilterCatSelected?: React.MouseEventHandler<any>;
}

const FiltersBar: React.FunctionComponent<FiltersBarProps> = (props) => {
   const {
      className,
      isMobile,
      filterCatList,
      selectedFilterCat,
      onFilterCatSelected,
      ...rest
   } = props;
   const classes = useStyles(props);

   return (
      <Bar className={classNames(classes.bar, className)} {...rest}>
         {filterCatList.map(({ label, appliedFilters }) => (
            <FilterChip
               className={classes.chip}
               selected={selectedFilterCat === label}
               key={label}
               label={`${label} ${appliedFilters.length > 0 ? `(${appliedFilters.length})` : ''}`}
               id={label}
               onClick={onFilterCatSelected}
            />
         ))}
      </Bar>
   );
};

export default FiltersBar;
