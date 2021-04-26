import * as React from 'react';
import { GridProps, makeStyles } from '@material-ui/core';
import attachmentData, { IFiltersList } from '../../attachmentData';

import { IButtonClickEvent, IKeyValueDictionary } from '../../shared/interfaces';
import filterDropdownStyles from './filterDropdownStyles';
import FilterDropdownLayout, { IFilterDropdownLayoutProps } from './FilterDropdownLayout';
import FiltersListButtons from '../FiltersListButtons/FiltersListButtons';
import { IFilterCat } from '../../containers/FiltersBarContainer/FiltersBarContainer';
import Accordion, { IAccordionList } from '../Accordion/Accordion';
import { Typography } from '@material-ui/core';

export interface IFilterDropdownProps extends IFilterDropdownLayoutProps {
   gridContainerProps?: GridProps;
   filtersList?: IFiltersList;
   accordionFiltersCatList?: IFilterCat[];
   selectedFilters?: IKeyValueDictionary<boolean>;
   onSelectFilter?: IButtonClickEvent;
   onApplyFilter?: IButtonClickEvent;
   onCancelClick?: IButtonClickEvent;
   isChanged?: boolean;
   showAccordion?: boolean;
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
      accordionFiltersCatList,
      isChanged,
      showAccordion,
      ...rest
   } = props;

   const classes = useStyle(props);

   const [expanded, setExpanded] = React.useState<string>();

   const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : '');
   };

   const renderFiltersAccordion = () => {
      const accordionList: IAccordionList =
         accordionFiltersCatList?.map((cat) => ({
            id: cat.label,
            title: <Typography className={classes.accordionTitle}>{cat.label}</Typography>,
            body: (
               <FiltersListButtons
                  item
                  filtersList={attachmentData[expanded || '']}
                  onFilterClicked={onSelectFilter}
                  selectedFilters={selectedFilters}
               />
            ),
         })) || [];

      return (
         <Accordion list={accordionList} expandedAccordionId={expanded} onChange={handleChange} />
      );
   };

   return (
      <FilterDropdownLayout fullHeight={showAccordion} {...rest}>
         {showAccordion ? (
            renderFiltersAccordion()
         ) : (
            <FiltersListButtons
               item
               className={classes.buttonsListContainer}
               filtersList={filtersList}
               onFilterClicked={onSelectFilter}
               selectedFilters={selectedFilters}
            />
         )}
      </FilterDropdownLayout>
   );
};

export default FilterDropdown;
