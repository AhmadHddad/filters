import * as React from 'react';
import AppliedFiltersList, {
   IAppliedFiltersListProps,
} from './../AppliedFiltersList/AppliedFiltersList';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { isNullOrEmpty } from '../../utils/utils';

export interface IAppliedFiltersProps extends IAppliedFiltersListProps {}

export default function AppliedFilters(props: IAppliedFiltersProps) {
   const { ...rest } = props;
   return (
      <Grid container spacing={1}>
         <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            <Typography display="inline">Applied Filters:</Typography>
         </Grid>
         <Grid item>
            {isNullOrEmpty(props.list) ? (
               <Typography display="inline">-None-</Typography>
            ) : (
               <AppliedFiltersList {...rest} />
            )}
         </Grid>
      </Grid>
   );
}
