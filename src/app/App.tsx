import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Route, Routes } from 'react-router-dom';

import { Currencies } from '../feachers/currencies/Сurrencies';
import { Exchanger } from '../feachers/exchanger/Exchanger';

import style from './App.module.css';

const App = (): JSX.Element => {
  return (
    <div className={style.App}>
      <Box sx={{ width: '100%' }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div" textAlign="center">
              Currency converter
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route path="/Currencies" element={<Currencies />} />
        <Route path="/exchanger" element={<Exchanger />} />
      </Routes>
    </div>
  );
};

export default App;
