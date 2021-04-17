import { createStyles, Theme } from '@material-ui/core/styles';

const FilterDropdownActionsStyles = (theme: Theme) =>
   createStyles({
      actionsContainer: {
         '&>div': {
            padding: 2,
         },
      },
   });

export default FilterDropdownActionsStyles;
