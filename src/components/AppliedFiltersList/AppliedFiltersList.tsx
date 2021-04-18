import { ChipProps, makeStyles } from '@material-ui/core';
import * as React from 'react';
import appliedFiltersListStyles from './appliedFiltersListStyles';
import FilterChip from '../FilterChip/FilterChip';
import { IAppliedFilter } from '../../containers/FiltersBarContainer/FiltersBarContainer';
import { CLEAR_FILTERS_BUTTON_LABEL } from '../../shared/constants';
export interface IAppliedFiltersListProps {
   chipProps?: ChipProps;
   rootContainerProps?: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
   >;
   listContainerProps?: React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
   >;
   list?: IAppliedFilter[];
   onDelete?: (label: string, category: string) => void;
}

const useStyle = makeStyles(appliedFiltersListStyles);

export default function AppliedFiltersList(props: IAppliedFiltersListProps) {
   const { listContainerProps, list, onDelete, chipProps, rootContainerProps } = props;

   const classes = useStyle(props);

   return (
      <ul className={classes.root} {...rootContainerProps}>
         {list
            ?.concat({ label: CLEAR_FILTERS_BUTTON_LABEL, category: 'none' })
            ?.map(({ label, category }) => {
               return (
                  <li key={label} {...listContainerProps}>
                     <FilterChip
                        name={label}
                        square
                        label={label}
                        onDelete={() => onDelete?.(label, category)}
                        {...chipProps}
                     />
                  </li>
               );
            })}
      </ul>
   );
}
