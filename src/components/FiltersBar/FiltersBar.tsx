import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Bar from '../Bar/Bar';
import FilterChip from '../FilterChip/FilterChip';
import { IFilterCat } from '../../containers/FiltersBarContainer/FiltersBarContainer';
import FiltersBarStyles from './FiltersBarStyles';

const useStyles = makeStyles(FiltersBarStyles);

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

   const list = isMobile
      ? [...filterCatList.slice(0, 2), { label: 'More filters', appliedFilters: [] }]
      : filterCatList;

   return (
      <Bar className={classes.bar} {...rest}>
         {list.map(({ label, appliedFilters }) => (
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
