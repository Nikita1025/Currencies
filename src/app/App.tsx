import React from 'react';
import style from './App.module.css';
import {Currencies} from "../feachers/currencies/Сurrencies";
import {Route, Routes} from "react-router-dom";
import {Exchanger} from "../feachers/exchanger/Exchanger";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <div className={style.App}>
        <Box sx={{ width: '100%' }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div" textAlign='center'>
                        Currency converter
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
        <Routes>
            <Route path='/' element={<Currencies/>}/>
            <Route path='/exchanger' element={<Exchanger/>}/>

        </Routes>
    </div>
  );
}

export default App;
