import * as React from 'react';
import FiltersBarContainer from '../FiltersBarContainer/FiltersBarContainer';

interface IBodyProps {}

const Body: React.FunctionComponent<IBodyProps> = (props) => {
   return (
      <div className={'body'}>
         <FiltersBarContainer />
      </div>
   );
};

export default Body;
