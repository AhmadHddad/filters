import * as React from 'react';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../Logo/Logo';

interface IHeaderProps extends AppBarProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
   return (
      <AppBar position="static" {...props}>
         <Toolbar>
            <Logo />
         </Toolbar>
      </AppBar>
   );
};

export default Header;
