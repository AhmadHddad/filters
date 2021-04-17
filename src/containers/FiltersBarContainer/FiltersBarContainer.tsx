import { useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import attachmentData from '../../attachmentData';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import { IButtonClickEvent, IKeyValueDictionary } from '../../shared/interfaces';

interface IFiltersBarContainerProps {}

export type IFilterCat = { label: string; appliedFilters: string[] };
export type ISelectedFilters = IKeyValueDictionary<boolean>;
export type IChangedSelectedFiltersCat = IKeyValueDictionary<boolean>;

const FiltersBarContainer: React.FunctionComponent<IFiltersBarContainerProps> = (props) => {
   //#region State
   const [appliedFilters, setAppliedFilters] = React.useState([]);
   const [filterCatList, setFilterCatList] = React.useState<IFilterCat[]>(
      Object.keys(attachmentData).map((key) => ({
         label: key,
         appliedFilters: [] as string[],
      })),
   );
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [selectedFilterCat, setSelectedFilterCat] = React.useState('');
   const [selectedFilters, setSelectedFilters] = React.useState<ISelectedFilters>({});
   const [
      changedSelectedFiltersCat,
      setChangedSelectedFiltersCat,
   ] = React.useState<IChangedSelectedFiltersCat>({});
   //#endregion

   //#region Other Hooks
   const isMobile = useMediaQuery('(max-width:600px)');
   //#endregion

   //#region Other Functions
   const updateFiltersCatList = React.useCallback(
      (filtersCatList: IFilterCat[], selectedFiltersCatIndex: number) => {
         const updatedFilter = { ...filtersCatList[selectedFiltersCatIndex] };
         updatedFilter.appliedFilters = Object.keys(selectedFilters);

         return updatedFilter;
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
   const onFilterCatSelected = React.useCallback<IButtonClickEvent>(
      (event: React.MouseEvent<any, MouseEvent>) => {
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
         setFilterCatList((prev) => {
            const updatedFiltersCatList = [...prev];
            const prevSelectedFilterCatIndex = prev.findIndex(
               (cat) => cat.label === selectedFilterCat,
            );

            if (prevSelectedFilterCatIndex !== -1) {
               updatedFiltersCatList[prevSelectedFilterCatIndex] = updateFiltersCatList(
                  updatedFiltersCatList,
                  prevSelectedFilterCatIndex,
               );
            }

            return updatedFiltersCatList;
         });

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

   return (
      <>
         <FilterDropdown
            anchorEl={anchorEl}
            isChanged={changedSelectedFiltersCat[selectedFilterCat]}
            onClose={onCloseDropdown}
            filtersList={attachmentData[selectedFilterCat]}
            selectedFilters={selectedFilters}
            onSelectFilter={onSelectFilter}
            onApplyFilter={onApplyFilter}
            onCancelClick={onCloseDropdown}
         />
         <FiltersBar
            selectedFilterCat={selectedFilterCat}
            filterCatList={filterCatList}
            onFilterCatSelected={onFilterCatSelected}
            isMobile={isMobile}
         />
      </>
   );
};

export default FiltersBarContainer;
