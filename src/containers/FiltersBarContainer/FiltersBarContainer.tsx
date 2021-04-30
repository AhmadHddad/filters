import { useMediaQuery, Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import attachmentData from '../../attachmentData';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import { IButtonClickEvent, IDivClickEvent, IKeyValueDictionary } from '../../shared/interfaces';
import { CLEAR_FILTERS_BUTTON_LABEL, MORE_FILTERS_FILTER_CAT } from '../../shared/constants';
import AppliedFilters from './../../components/AppliedFilters/AppliedFilters';
import filtersBarContainerStyles from './filtersBarContainerStyles';

interface IFiltersBarContainerProps {}

export type IFilterCat = { label: string; appliedFilters: string[] };
export type ISelectedFilters = IKeyValueDictionary<boolean>;
export type IChangedSelectedFiltersCat = IKeyValueDictionary<boolean>;
export type IAppliedFilter = { label: string; category: string };
export type IUpdateFiltersCatListOptionalParameters = {
   labelToDelete?: string;
   selectedFilterCat: string;
};
export type IAppliedFilterCatDictionary = IKeyValueDictionary<string[]>;
const useStyle = makeStyles(filtersBarContainerStyles);

const FiltersBarContainer: React.FunctionComponent<IFiltersBarContainerProps> = (props) => {
   //#region Other Hooks
   const classes = useStyle(props);
   const isMobile = useMediaQuery('(max-width:600px)');
   const { current: allFiltersCatList } = React.useRef<string[]>(Object.keys(attachmentData));
   //#endregion

   //#region State
   const [allAppliedFilters, setAllAppliedFilters] = React.useState<IAppliedFilter[]>([]);
   const [filterCatList, setFilterCatList] = React.useState<string[]>([]);
   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
   const [selectedFilterCat, setSelectedFilterCat] = React.useState('');
   const [selectedFilters, setSelectedFilters] = React.useState<ISelectedFilters>({});
   const [expandedFiltersCat, setExpandedFiltersCat] = React.useState<string>('');
   const [
      appliedFiltersCatDictionary,
      setAppliedFiltersCatDictionary,
   ] = React.useState<IAppliedFilterCatDictionary>({});

   const [
      changedSelectedFiltersCat,
      setChangedSelectedFiltersCat,
   ] = React.useState<IChangedSelectedFiltersCat>({});
   const [accordionFiltersCatList] = React.useState<string[]>(allFiltersCatList.slice(2));
   const [showAccordionFiltersCatList, setShowAccordionFiltersCatList] = React.useState<boolean>(
      false,
   );
   //#endregion
   const currentSelectedFilterCat =
      isMobile && showAccordionFiltersCatList ? expandedFiltersCat : selectedFilterCat;

   //#region Other Functions

   const onAccordionFilterCatExpanded = (panel: string) => (
      event: React.ChangeEvent<{}>,
      newExpanded: boolean,
   ) => {
      setExpandedFiltersCat(newExpanded ? panel : '');

      if (newExpanded) {
         handleSelectedFilters(panel);
      }
   };

   const toggleChangedSelectedFiltersCat = React.useCallback(
      (state: boolean) => {
         return (prevState: IChangedSelectedFiltersCat) => ({
            ...prevState,
            [currentSelectedFilterCat]: state,
         });
      },
      [currentSelectedFilterCat],
   );

   //#endregion

   //#region Callbacks

   const onDeleteAppliedFilter = React.useCallback((label: string, category: string) => {
      if (label === CLEAR_FILTERS_BUTTON_LABEL) {
         setAppliedFiltersCatDictionary({});
      } else {
         setAppliedFiltersCatDictionary((prev) => {
            return { ...prev, [category]: prev[category].filter((filter) => filter !== label) };
         });
      }
   }, []);

   const handleSelectedFilters = React.useCallback(
      (filterCat: string) => {
         const prevSelectedFilters: ISelectedFilters = {};

         const prevSelectedFiltersList: string[] = appliedFiltersCatDictionary[filterCat] || [];

         prevSelectedFiltersList.forEach((label) => {
            prevSelectedFilters[label] = true;
         });

         setSelectedFilters(prevSelectedFilters);
      },
      [appliedFiltersCatDictionary],
   );

   const onFilterCatSelected = React.useCallback<IDivClickEvent>(
      (event) => {
         const filterCatLabel: string = event.currentTarget.id;

         setSelectedFilterCat(filterCatLabel || '');
         setAnchorEl(event.currentTarget);

         if (filterCatLabel === MORE_FILTERS_FILTER_CAT) {
            setShowAccordionFiltersCatList(true);
         } else {
            handleSelectedFilters(filterCatLabel);
         }
      },
      [handleSelectedFilters],
   );

   const onCloseDropdown = React.useCallback(() => {
      setAnchorEl(null);
      setSelectedFilterCat('');
      setShowAccordionFiltersCatList(false);
      setSelectedFilters({});
      setChangedSelectedFiltersCat(toggleChangedSelectedFiltersCat(false));
      setExpandedFiltersCat('');
   }, [toggleChangedSelectedFiltersCat]);

   const onApplyFilter = React.useCallback<IButtonClickEvent>(
      (_) => {
         setAppliedFiltersCatDictionary((prev) => {
            return {
               ...prev,
               [currentSelectedFilterCat]: Object.keys(selectedFilters),
            };
         });

         onCloseDropdown();
         setChangedSelectedFiltersCat(toggleChangedSelectedFiltersCat(false));
      },
      [onCloseDropdown, toggleChangedSelectedFiltersCat, currentSelectedFilterCat, selectedFilters],
   );

   const onSelectFilter = React.useCallback<IButtonClickEvent>(
      (e) => {
         const id: string = e.currentTarget.id;
         setSelectedFilters((prev) => {
            const updatedSelectedFilter = { ...prev };
            // wants to deselect so i will delete the key to filter obj
            if (Boolean(prev[id])) {
               delete updatedSelectedFilter[id];
            } else {
               updatedSelectedFilter[id] = true;
            }

            return updatedSelectedFilter;
         });

         setChangedSelectedFiltersCat(toggleChangedSelectedFiltersCat(true));
      },
      [toggleChangedSelectedFiltersCat],
   );
   //#endregion

   //#region LifeCycle
   React.useEffect(() => {
      const list = isMobile
         ? [...allFiltersCatList.slice(0, 2), MORE_FILTERS_FILTER_CAT]
         : allFiltersCatList;

      setFilterCatList(list);
   }, [isMobile, allFiltersCatList]);

   React.useEffect(() => {
      const list: IAppliedFilter[] = [];

      for (const key in appliedFiltersCatDictionary) {
         appliedFiltersCatDictionary[key].forEach((filter) => {
            list.push({ category: key, label: filter });
         });
      }

      setAllAppliedFilters(list);
   }, [appliedFiltersCatDictionary]);
   //#endregion

   return (
      <>
         <FilterDropdown
            anchorEl={anchorEl}
            isChanged={changedSelectedFiltersCat[currentSelectedFilterCat]}
            onClose={onCloseDropdown}
            filtersList={attachmentData[selectedFilterCat]}
            selectedFilters={selectedFilters}
            onSelectFilter={onSelectFilter}
            onApplyFilter={onApplyFilter}
            appliedFiltersCatDictionary={appliedFiltersCatDictionary}
            expandedFiltersCat={expandedFiltersCat}
            onCancelClick={onCloseDropdown}
            onAccordionFilterCatExpanded={onAccordionFilterCatExpanded}
            showAccordion={showAccordionFiltersCatList}
            accordionFiltersCatList={accordionFiltersCatList}
         />
         <Grid container justify={'center'} className={classes.gridContainer}>
            <Grid item md={12} xs={12} className={classes.filterBarGridContainer}>
               <FiltersBar
                  selectedFilterCat={selectedFilterCat}
                  appliedFiltersCatDictionary={appliedFiltersCatDictionary}
                  filterCatList={filterCatList}
                  onFilterCatSelected={onFilterCatSelected}
               />
            </Grid>
            <Grid item md={12} xs={12} className={classes.appliedFiltersGridContainer}>
               <AppliedFilters list={allAppliedFilters} onDelete={onDeleteAppliedFilter} />
            </Grid>
         </Grid>
      </>
   );
};

export default FiltersBarContainer;
