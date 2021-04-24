import { createStyles, Theme } from '@material-ui/core/styles';

const filtersBarStyles = (theme: Theme) =>
   createStyles({
      bar: {
         justifyContent: 'start',
         [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between',
         },
      },
      chip: {
         [theme.breakpoints.down('xs')]: {
            width: 'calc(100% / 3.5)',
         },
      },
   });

export default filtersBarStyles;
