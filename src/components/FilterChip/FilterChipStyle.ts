import { createStyles, Theme } from '@material-ui/core/styles';
import { IFilterChipProps } from './FilterChip';

const hoverSelectedStyle = {
   backgroundColor: 'cornflowerblue',
   color: 'white',
};

const FilterChipStyle = (theme: Theme) =>
   createStyles({
      root: {
         display: 'flex',
         justifyContent: 'start',
         flexWrap: 'wrap',
         listStyle: 'none',
         padding: theme.spacing(0.5),
         boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
         margin: 0,
      },
      chip: (props: IFilterChipProps) => ({
         margin: theme.spacing(0.5),
         textTransform: 'capitalize',
         '&:hover': props.onClick
            ? {
                 ...hoverSelectedStyle,
                 cursor: 'pointer',
              }
            : {},
      }),
      selected: hoverSelectedStyle,
   });

export default FilterChipStyle;
