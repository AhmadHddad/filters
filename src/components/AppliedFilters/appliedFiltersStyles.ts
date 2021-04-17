import { createStyles, Theme } from '@material-ui/core/styles';

const appliedFiltersStyles = (theme: Theme) =>
   createStyles({
      verticalCenter: {
         display: 'flex',
         alignItems: 'center',
      },
      gridContainer: {
         minHeight: 60,
      },
   });

export default appliedFiltersStyles;
