import { createStyles, Theme } from '@material-ui/core/styles';

const FiltersListButtons = (theme: Theme) =>
   createStyles({
      gridContainer: {
         overflow: 'auto',
         width: '100%',
         '&>div': {
            padding: 2,
         },
      },
   });

export default FiltersListButtons;
