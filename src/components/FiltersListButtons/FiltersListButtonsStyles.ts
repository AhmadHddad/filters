import { createStyles, Theme } from '@material-ui/core/styles';

const filtersListButtons = (theme: Theme) =>
   createStyles({
      gridContainer: {
         overflow: 'auto',
         width: '100%',
         '&>div': {
            padding: 2,
         },
      },
   });

export default filtersListButtons;
