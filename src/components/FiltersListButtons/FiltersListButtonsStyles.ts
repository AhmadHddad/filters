import { createStyles, Theme } from '@material-ui/core/styles';

const FiltersListButtons = (theme: Theme) =>
   createStyles({
      gridContainer: {
         maxHeight: 240,
         overflow: 'auto',
         width: '100%',
         '&>div': {
            padding: 2,
         },
      },
   });

export default FiltersListButtons;
