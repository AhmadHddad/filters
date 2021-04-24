import { createStyles, Theme } from '@material-ui/core/styles';

const filtersPopoverStyles = (theme: Theme) =>
   createStyles({
      paperContainer: {
         width: '300px',
         height: '300px',
         [theme.breakpoints.down('xs')]: {
            width: '100%',
         },
      },
   });

export default filtersPopoverStyles;
