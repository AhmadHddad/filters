import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LogoPng from '../../assets/logo.png';
import logoStyles from './logoStyles';

const useStyles = makeStyles(logoStyles);

interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = (props) => {
   const classes = useStyles();

   return (
      <Box display="flex">
         <Box>
            <img className={classes.logo} src={LogoPng} alt="logo" width={38} height={38} />
         </Box>
         <Box className={classes.titleContainer}>
            <Typography variant="h6" className={classes.title}>
               Filters
            </Typography>
         </Box>
      </Box>
   );
};

export default Logo;
