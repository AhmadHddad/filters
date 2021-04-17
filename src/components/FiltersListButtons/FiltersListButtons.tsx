import * as React from 'react';
import { Grid, GridProps, Button, makeStyles } from '@material-ui/core';
import FiltersListButtonsStyles from './FiltersListButtonsStyles';
import { IFiltersList } from '../../attachmentData';
import classNames from 'clsx';

export interface IFiltersListButtonsProps extends GridProps {
   filtersList?: IFiltersList;
   fullWidth?: boolean;
   selectedFilters?: { [filterId: string]: boolean };
   onFilterClicked?: React.MouseEventHandler<HTMLButtonElement>;
}

const useStyle = makeStyles(FiltersListButtonsStyles);

const FiltersListButtons: React.FunctionComponent<IFiltersListButtonsProps> = (props) => {
   const { onFilterClicked, filtersList, selectedFilters, className, ...rest } = props;

   const classes = useStyle(props);

   return (
      <Grid
         container
         alignContent="flex-start"
         className={classNames(classes.gridContainer, className)}
         {...rest}
      >
         {filtersList?.map((filter) => (
            <Grid item key={filter.id}>
               <Button
                  variant={selectedFilters && selectedFilters[filter.id] ? 'contained' : 'outlined'}
                  id={filter.id}
                  size="small"
                  color="primary"
                  onClick={onFilterClicked}
               >
                  {filter.title}
               </Button>
            </Grid>
         ))}
      </Grid>
   );
};

export default FiltersListButtons;