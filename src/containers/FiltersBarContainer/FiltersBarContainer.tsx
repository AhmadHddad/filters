import { useMediaQuery } from '@material-ui/core';
import * as React from 'react';
import attachmentData from '../../attachmentData';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';

interface IFiltersBarContainerProps {}

export type IFilterCat = { label: string; appliedFilters: string[] };
export type ISelectedFilters = {
   [label: string]: boolean;
};
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
   //#endregion

   //#region Callbacks
   const onFilterCatSelected = React.useCallback(
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
   }, []);

   const onApplyFilter = React.useCallback(
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
      },
      [selectedFilterCat, updateFiltersCatList, onCloseDropdown],
   );

   const onSelectFilter = React.useCallback((e) => {
      const id = e.currentTarget.id;
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
   }, []);
   //#endregion

   return (
      <>
         <FilterDropdown
            anchorEl={anchorEl}
            onClose={onCloseDropdown}
            filtersList={attachmentData[selectedFilterCat]}
            selectedFilters={selectedFilters}
            onSelectFilter={onSelectFilter}
            onApplyFilter={onApplyFilter}
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
