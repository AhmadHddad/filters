import * as React from 'react';
import AppliedFiltersList, {
   IAppliedFiltersListProps,
} from './../AppliedFiltersList/AppliedFiltersList';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Typography } from '@material-ui/core';
import { isNullOrEmpty } from '../../utils/utils';
import appliedFiltersStyles from './appliedFiltersStyles';

export interface IAppliedFiltersProps extends IAppliedFiltersListProps {}

const useStyle = makeStyles(appliedFiltersStyles);

export default function AppliedFilters(props: IAppliedFiltersProps) {
   const classes = useStyle(props);

   const { ...rest } = props;

   return (
      <Grid container spacing={1} className={classes.gridContainer}>
         <Grid item className={classes.verticalCenter}>
            <Typography display="inline">Applied Filters:</Typography>
         </Grid>
         <Grid item className={classes.verticalCenter}>
            {isNullOrEmpty(props.list) ? (
               <Typography display="inline">-None-</Typography>
            ) : (
               <AppliedFiltersList {...rest} />
            )}
         </Grid>
      </Grid>
   );
}
