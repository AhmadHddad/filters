import { ChipProps, makeStyles } from '@material-ui/core';
import * as React from 'react';
import appliedFiltersListStyles from './appliedFiltersListStyles';
import FilterChip from '../FilterChip/FilterChip';
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
   list?: string[];
   onDelete?: (label: string) => void;
}

const useStyle = makeStyles(appliedFiltersListStyles);

export default function AppliedFiltersList(props: IAppliedFiltersListProps) {
   const { listContainerProps, list, onDelete, chipProps, rootContainerProps } = props;

   const classes = useStyle(props);

   return (
      <ul className={classes.root} {...rootContainerProps}>
         {list?.map((label) => {
            return (
               <li key={label} {...listContainerProps}>
                  <FilterChip
                     name={label}
                     square
                     label={label}
                     onDelete={() => onDelete?.(label)}
                     {...chipProps}
                  />
               </li>
            );
         })}
      </ul>
   );
}
