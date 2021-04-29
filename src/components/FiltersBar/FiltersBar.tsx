import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'clsx';

import Bar from '../Bar/Bar';
import FilterChip from '../FilterChip/FilterChip';
import filtersBarStyles from './filtersBarStyles';
import { IKeyValueDictionary } from '../../shared/interfaces';

const useStyles = makeStyles(filtersBarStyles);

export interface FiltersBarProps {
   filterCatList: string[];
   className?: string;
   selectedFilterCat?: string;
   appliedFiltersCatDictionary?: IKeyValueDictionary<string[]>;
   onFilterCatSelected?: React.MouseEventHandler<any>;
}

const FiltersBar: React.FunctionComponent<FiltersBarProps> = (props) => {
   const {
      className,
      filterCatList,
      appliedFiltersCatDictionary,
      selectedFilterCat,
      onFilterCatSelected,
      ...rest
   } = props;
   const classes = useStyles(props);

   return (
      <Bar className={classNames(classes.bar, className)} {...rest}>
         {filterCatList.map((label) => (
            <FilterChip
               className={classes.chip}
               selected={selectedFilterCat === label}
               key={label}
               label={`${label} ${
                  (appliedFiltersCatDictionary?.[label] || []).length > 0
                     ? `(${(appliedFiltersCatDictionary?.[label] || []).length})`
                     : ''
               }`}
               id={label}
               onClick={onFilterCatSelected}
            />
         ))}
      </Bar>
   );
};

export default FiltersBar;
