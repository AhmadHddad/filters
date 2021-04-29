import * as React from 'react';
import attachmentData, { IFiltersList } from '../../attachmentData';

import { IButtonClickEvent, IKeyValueDictionary } from '../../shared/interfaces';
import filterDropdownStyles from './filterDropdownStyles';
import FiltersListButtons from '../FiltersListButtons/FiltersListButtons';
import Accordion, { IAccordionList } from '../Accordion/Accordion';
import { Typography } from '@material-ui/core';
import { Grid, GridProps, makeStyles } from '@material-ui/core';
import classNames from 'clsx';
import FiltersPopover, { IFiltersPopoverProps } from '../FiltersPopover/FiltersPopover';
import FilterDropdownActions from '../FilterDropdownActions/FilterDropdownActions';

export interface IFilterDropdownProps extends IFiltersPopoverProps {
   gridContainerProps?: GridProps;
   filtersList?: IFiltersList;
   accordionFiltersCatList?: string[];
   selectedFilters?: IKeyValueDictionary<boolean>;
   onSelectFilter?: IButtonClickEvent;
   onApplyFilter?: IButtonClickEvent;
   onCancelClick?: IButtonClickEvent;
   isChanged?: boolean;
   onAccordionFilterCatExpanded?: (
      panel: string,
   ) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => void;
   showAccordion?: boolean;
   expandedFiltersCat?: string;
}

const useStyle = makeStyles(filterDropdownStyles);

const FilterDropdown: React.FunctionComponent<IFilterDropdownProps> = (props) => {
   const {
      gridContainerProps,
      onSelectFilter,
      onApplyFilter,
      onCancelClick,
      filtersList,
      selectedFilters,
      onAccordionFilterCatExpanded,
      accordionFiltersCatList,
      isChanged,
      showAccordion,
      expandedFiltersCat,
      ...rest
   } = props;

   const classes = useStyle(props);

   const renderFiltersAccordion = () => {
      const accordionList: IAccordionList =
         accordionFiltersCatList?.map((cat) => ({
            id: cat,
            title: <Typography className={classes.accordionTitle}>{cat}</Typography>,
            body: (
               <Grid container>
                  <Grid item md={12} xs={12}>
                     <FiltersListButtons
                        item
                        filtersList={attachmentData[expandedFiltersCat || '']}
                        onFilterClicked={onSelectFilter}
                        selectedFilters={selectedFilters}
                     />
                  </Grid>
                  <Grid item md={12} xs={12} className={classes.accordionActions}>
                     <FilterDropdownActions
                        disableApply={!isChanged}
                        hideCancel={!isChanged}
                        onApplyClick={onApplyFilter}
                        onCancelClick={onCancelClick}
                     />
                  </Grid>
               </Grid>
            ),
         })) || [];

      return (
         <Accordion
            list={accordionList}
            expandedAccordionId={expandedFiltersCat}
            onChange={onAccordionFilterCatExpanded}
         />
      );
   };

   return (
      <FiltersPopover fullHeight={showAccordion} {...rest}>
         <Grid
            container
            justify="space-between"
            className={classNames(gridContainerProps?.className, classes.gridContainer)}
            {...gridContainerProps}
         >
            {showAccordion ? (
               renderFiltersAccordion()
            ) : (
               <>
                  <FiltersListButtons
                     item
                     className={classes.buttonsListContainer}
                     filtersList={filtersList}
                     onFilterClicked={onSelectFilter}
                     selectedFilters={selectedFilters}
                  />
                  <FilterDropdownActions
                     disableApply={!isChanged}
                     hideCancel={!isChanged}
                     onApplyClick={onApplyFilter}
                     onCancelClick={onCancelClick}
                  />
               </>
            )}
         </Grid>
      </FiltersPopover>
   );
};

export default FilterDropdown;
