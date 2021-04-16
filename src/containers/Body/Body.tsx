import * as React from "react";
import FiltersBarContainer from "../FiltersBarContainer/FiltersBarContainer";

interface IBodyProps {}

const Body: React.FunctionComponent<IBodyProps> = (props) => {
  return (
    <div>
      <FiltersBarContainer />
    </div>
  );
};

export default Body;
