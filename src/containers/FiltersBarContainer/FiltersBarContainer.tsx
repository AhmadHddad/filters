import { useMediaQuery, Grid } from '@material-ui/core';
import * as React from 'react';
import attachmentData from '../../attachmentData';
import FiltersBar from '../../components/FiltersBar/FiltersBar';
import FilterDropdown from '../../components/FilterDropdown/filterDropdown';
import { IButtonClickEvent, IKeyValueDictionary } from '../../shared/interfaces';
import { MORE_FILTERS_FILTER_CAT } from '../../hooks/contants';
import AppliedFilters from './../../components/AppliedFilters/AppliedFilters';

interface IFiltersBarContainerProps {}

export type IFilterCat = { label: string; appliedFilters: string[] };
export type ISelectedFilters = IKeyValueDictionary<boolean>;
export type IChangedSelectedFiltersCat = IKeyValueDictionary<boolean>;

const FiltersBarContainer: React.FunctionComponent<IFiltersBarContainerProps> = (props) => {
   //#region Other Hooks
   const isMobile = useMediaQuery('(max-width:600px)');
   const { current: allFiltersCatList } = React.useRef<IFilterCat[]>(
      Object.keys(attachmentData).map((key) => ({
         label: key,
         appliedFilters: [] as string[],
      })),
   );
   //#endregion

   //#region State
   const [appliedFilters, setAppliedFilters] = React.useState([]);
   const [filterCatList, setFilterCatList] = React.useState<IFilterCat[]>([]);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [selectedFilterCat, setSelectedFilterCat] = React.useState('');
   const [selectedFilters, setSelectedFilters] = React.useState<ISelectedFilters>({});
   const [
      changedSelectedFiltersCat,
      setChangedSelectedFiltersCat,
   ] = React.useState<IChangedSelectedFiltersCat>({});
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
         <FiltersBar
            selectedFilterCat={selectedFilterCat}
            filterCatList={filterCatList}
            onFilterCatSelected={onFilterCatSelected}
            isMobile={isMobile}
         />
         <Grid container justify={'center'} style={{ flexGrow: 1 }}>
            <Grid item md={12} xs={12}>
               <AppliedFilters />
            </Grid>
         </Grid>
      </>
   );
};

export default FiltersBarContainer;
