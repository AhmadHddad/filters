import { createStyles, Theme } from '@material-ui/core/styles';

const FilterDropdownStyles = (theme: Theme) =>
   createStyles({
      gridContainer: { width: 300, height: 300 },
      actionsContainer: {
         '&>div': {
            padding: 2,
         },
      },
   });

export default FilterDropdownStyles;
