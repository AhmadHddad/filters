import * as React from 'react';
import AppliedFiltersList, {
   IAppliedFiltersListProps,
} from './../AppliedFiltersList/AppliedFiltersList';

export interface IAppliedFiltersProps extends IAppliedFiltersListProps {}

export default function AppliedFilters(props: IAppliedFiltersProps) {
   const { ...rest } = props;
   return (
      <div>
         <span>Applied Filters:</span>
         <span>
            <AppliedFiltersList {...rest} />
         </span>
      </div>
   );
}
