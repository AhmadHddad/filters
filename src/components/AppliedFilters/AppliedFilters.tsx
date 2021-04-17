import * as React from 'react';
import AppliedFiltersList from './../AppliedFiltersList/AppliedFiltersList';

export interface IAppliedFiltersProps {}

export default function AppliedFilters(props: IAppliedFiltersProps) {
   return (
      <div>
         <span>Applied Filters:</span>
         <span>
            <AppliedFiltersList />
         </span>
      </div>
   );
}
