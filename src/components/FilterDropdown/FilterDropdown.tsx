import * as React from 'react';
import { Popover, PopoverProps, Grid, GridProps, Button } from '@material-ui/core';
import { IFiltersList } from '../../attachmentData';
import FiltersListButtons from '../FiltersListButtons/FiltersListButtons';
interface IFilterDropdownProps extends PopoverProps {
   gridContainerProps?: GridProps;
   filtersList?: IFiltersList;
}

const FilterDropdown: React.FunctionComponent<IFilterDropdownProps> = (props) => {
   const { anchorEl, gridContainerProps, open, filtersList, ...rest } = props;

   const show = Boolean(anchorEl);

   return (
      <Popover open={show} anchorEl={anchorEl} {...rest}>
         <Grid
            container
            justify="space-between"
            {...gridContainerProps}
            style={{ width: 300, height: 300 }}
         >
            <FiltersListButtons filtersList={filtersList} />
         </Grid>
      </Popover>
   );
};

FilterDropdown.defaultProps = {
   anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
   },
   transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
   },
};

export default FilterDropdown;
