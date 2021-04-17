import { createStyles, Theme } from '@material-ui/core/styles';

const filterDropdownActionsStyles = (theme: Theme) =>
   createStyles({
      actionsContainer: {
         '&>div': {
            padding: 2,
         },
      },
   });

export default filterDropdownActionsStyles;
