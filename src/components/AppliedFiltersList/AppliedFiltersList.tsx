import { Chip, ChipProps, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { IButtonClickEvent } from '../../shared/interfaces';
import appliedFiltersListStyles from './appliedFiltersListStyles';

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
   onDelete?: IButtonClickEvent;
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
                  <Chip
                     id={label}
                     label={label}
                     onDelete={onDelete}
                     className={classes.chip}
                     {...chipProps}
                  />
               </li>
            );
         })}
      </ul>
   );
}
