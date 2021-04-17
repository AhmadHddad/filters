import { createStyles, Theme } from '@material-ui/core/styles';

const filtersBarContainerStyles = (theme: Theme) =>
   createStyles({
      filterBarGridContainer: {
         height: 48,
      },
      appliedFiltersGridContainer: {
         height: 'calc(100% - 48px)',
      },
      gridContainer: {
         height: '100%',
      },
   });

export default filtersBarContainerStyles;
