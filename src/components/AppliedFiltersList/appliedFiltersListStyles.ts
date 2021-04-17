import { createStyles, Theme } from '@material-ui/core/styles';

const appliedFiltersListStyles = (theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         justifyContent: 'center',
         flexWrap: 'wrap',
         listStyle: 'none',
         padding: theme.spacing(0.5),
         margin: 0,
      },
      chip: {
         margin: theme.spacing(0.5),
      },
   });

export default appliedFiltersListStyles;
