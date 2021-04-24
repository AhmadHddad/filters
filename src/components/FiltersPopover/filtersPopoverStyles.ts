import { createStyles, Theme } from '@material-ui/core/styles';
import { IFiltersPopoverProps } from './FiltersPopover';

const filtersPopoverStyles = (theme: Theme) =>
   createStyles({
      paperContainer: ({ fullHeight }: IFiltersPopoverProps) => ({
         width: '300px',
         height: fullHeight ? '80%' : ' 300px',
         [theme.breakpoints.down('xs')]: {
            width: '100%',
         },
      }),
   });

export default filtersPopoverStyles;
