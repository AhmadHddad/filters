import { createStyles, Theme } from '@material-ui/core/styles';
import { FiltersBarProps } from './FiltersBar';

const FiltersBarStyles = (theme: Theme) =>
   createStyles({
      chip: (props: FiltersBarProps) => (props.isMobile ? { width: 'calc(100% / 3.5)' } : {}),
      bar: (props: FiltersBarProps) => ({
         justifyContent: props.isMobile ? 'space-between' : 'start',
      }),
   });

export default FiltersBarStyles;
