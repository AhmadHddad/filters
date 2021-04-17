import { createStyles, Theme } from '@material-ui/core/styles';
import { IFilterDropdownProps } from './FilterDropdown';

const filterDropdownStyles = (theme: Theme) =>
   createStyles({
      paperContainer: (props: IFilterDropdownProps) => ({
         width: props.isMobile ? '100%' : '300px',
         height: '300px',
      }),
      gridContainer: {
         width: '100%',
         height: '100%',
      },
      buttonsListContainer: {
         height: '80%',
      },
   });

export default filterDropdownStyles;
