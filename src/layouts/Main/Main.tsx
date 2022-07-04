import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from 'components/Container';


import { Topbar } from './components';

import pages from '../navigation';


//@ts-ignore
const Main = ({ children,  bgcolor = 'transparent' }) => {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            pages={pages}
          />
        </Container>
      </AppBar>
   
      <main>
        {children}
        <Divider />
      </main>
    
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
};

export default Main;
