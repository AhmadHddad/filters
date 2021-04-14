import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../Logo/Logo";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
