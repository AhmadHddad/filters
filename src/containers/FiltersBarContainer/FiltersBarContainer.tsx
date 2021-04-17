import { useMediaQuery, Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';
import attachmentData from '../../attachmentData';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import { IButtonClickEvent, IDivClickEvent, IKeyValueDictionary } from '../../shared/interfaces';
import { MORE_FILTERS_FILTER_CAT } from '../../shared/constants';
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

const useStyle = makeStyles(filtersBarContainerStyles);

const FiltersBarContainer: React.FunctionComponent<IFiltersBarContainerProps> = (props) => {
   //#region Other Hooks
   const classes = useStyle(props);
   const isMobile = useMediaQuery('(max-width:600px)');
   const { current: allFiltersCatList } = React.useRef<IFilterCat[]>(
      Object.keys(attachmentData).map((key) => ({
         label: key,
         appliedFilters: [] as string[],
      })),
   );
   //#endregion

   //#region State
   const [appliedFilters, setAppliedFilters] = React.useState<IAppliedFilter[]>([]);
   const [filterCatList, setFilterCatList] = React.useState<IFilterCat[]>([]);
   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
   const [selectedFilterCat, setSelectedFilterCat] = React.useState('');
   const [selectedFilters, setSelectedFilters] = React.useState<ISelectedFilters>({});
   const [
      changedSelectedFiltersCat,
      setChangedSelectedFiltersCat,
   ] = React.useState<IChangedSelectedFiltersCat>({});
   //#endregion

   //#region Other Functions
   const updateFiltersCatList = React.useCallback(
      (
         type: 'deleteFilter' | 'updateCatList',
         { labelToDelete, selectedFilterCat }: IUpdateFiltersCatListOptionalParameters,
      ) => (prev: IFilterCat[]) => {
         const updatedFiltersCatList = [...prev];
         const prevSelectedFilterCatIndex = prev.findIndex(
            (cat) => cat.label === selectedFilterCat,
         );

         if (prevSelectedFilterCatIndex === -1) return prev;

         const updatedFilter = { ...updatedFiltersCatList[prevSelectedFilterCatIndex] };

         switch (type) {
            case 'deleteFilter':
               updatedFilter.appliedFilters = updatedFilter.appliedFilters.filter(
                  (filterLabel) => filterLabel !== labelToDelete,
               );

               break;
            case 'updateCatList':
               updatedFilter.appliedFilters = Object.keys(selectedFilters);

               break;
            default:
               break;
         }

         updatedFiltersCatList[prevSelectedFilterCatIndex] = updatedFilter;

         return updatedFiltersCatList;
      },
      [selectedFilters],
   );

   const toggleChangedSelectedFiltersCat = React.useCallback(
      (state: boolean) => {
         return (prevState: IChangedSelectedFiltersCat) => ({
            ...prevState,
            [selectedFilterCat]: state,
         });
      },
      [selectedFilterCat],
   );

   //#endregion

   //#region Callbacks

   const onDeleteAppliedFilter = React.useCallback(
      (label: string, category: string) => {
         setFilterCatList(
            updateFiltersCatList('deleteFilter', {
               selectedFilterCat: category,
               labelToDelete: label,
            }),
         );
      },
      [updateFiltersCatList],
   );

   const onFilterCatSelected = React.useCallback<IDivClickEvent>(
      (event) => {
         const filterCatLabel: string = event.currentTarget.id;

         setSelectedFilterCat(filterCatLabel || '');
         setAnchorEl(event.currentTarget);
         const prevSelectedFilters: ISelectedFilters = {};

         const prevSelectedFiltersList: string[] =
            filterCatList.find((filterCat) => filterCat.label === filterCatLabel)?.appliedFilters ||
            [];

         prevSelectedFiltersList.forEach((label) => {
            prevSelectedFilters[label] = true;
         });

         setSelectedFilters(prevSelectedFilters);
      },
      [filterCatList],
   );

   const onCloseDropdown = React.useCallback(() => {
      setAnchorEl(null);
      setSelectedFilterCat('');
      setSelectedFilters({});
      setChangedSelectedFiltersCat(toggleChangedSelectedFiltersCat(false));
   }, [toggleChangedSelectedFiltersCat]);

   const onApplyFilter = React.useCallback<IButtonClickEvent>(
      (_) => {
         setFilterCatList(
            updateFiltersCatList('updateCatList', {
               selectedFilterCat: selectedFilterCat,
            }),
         );

         onCloseDropdown();
         setChangedSelectedFiltersCat(toggleChangedSelectedFiltersCat(false));
      },
      [selectedFilterCat, updateFiltersCatList, onCloseDropdown, toggleChangedSelectedFiltersCat],
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
         ? [
              ...allFiltersCatList.slice(0, 2),
              { label: MORE_FILTERS_FILTER_CAT, appliedFilters: [] },
           ]
         : allFiltersCatList;

      setFilterCatList(list);
   }, [isMobile, allFiltersCatList]);

   React.useEffect(() => {
      const list: IAppliedFilter[] = [];

      filterCatList.forEach((cat) => {
         list.push(...cat.appliedFilters.map((filter) => ({ category: cat.label, label: filter })));
      });

      setAppliedFilters(list);
   }, [filterCatList]);
   //#endregion

   return (
      <>
         <FilterDropdown
            anchorEl={anchorEl}
            isChanged={changedSelectedFiltersCat[selectedFilterCat]}
            onClose={onCloseDropdown}
            filtersList={attachmentData[selectedFilterCat]}
            selectedFilters={selectedFilters}
            isMobile={isMobile}
            onSelectFilter={onSelectFilter}
            onApplyFilter={onApplyFilter}
            onCancelClick={onCloseDropdown}
         />
         <Grid container justify={'center'} className={classes.gridContainer}>
            <Grid item md={12} xs={12} className={classes.filterBarGridContainer}>
               <FiltersBar
                  selectedFilterCat={selectedFilterCat}
                  filterCatList={filterCatList}
                  onFilterCatSelected={onFilterCatSelected}
                  isMobile={isMobile}
               />
            </Grid>
            <Grid item md={12} xs={12} className={classes.appliedFiltersGridContainer}>
               <AppliedFilters list={appliedFilters} onDelete={onDeleteAppliedFilter} />
            </Grid>
         </Grid>
      </>
   );
};

export default FiltersBarContainer;
