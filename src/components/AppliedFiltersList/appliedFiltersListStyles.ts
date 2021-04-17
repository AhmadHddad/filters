import { createStyles, Theme } from '@material-ui/core/styles';

const appliedFiltersListStyles = (theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         flexWrap: 'wrap',
         listStyle: 'none',
         padding: theme.spacing(0.5),
         margin: 0,
      },
   });

export default appliedFiltersListStyles;
