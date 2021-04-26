import { createStyles, Theme } from '@material-ui/core/styles';

const filterDropdownStyles = (theme: Theme) =>
   createStyles({
      gridContainer: {
         width: '100%',
         height: '100%',
      },
      buttonsListContainer: {
         height: '80%',
      },
      accordionTitle: {
         textTransform: 'capitalize',
      },
   });

export default filterDropdownStyles;
