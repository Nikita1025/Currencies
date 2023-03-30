import React, { ChangeEvent, useEffect, useState } from 'react';

import { Button, InputLabel, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

import { getDataThunk } from '../../store/reducer/currenciesReducer';
import { useAppDispatch, useAppSelector } from '../../store/store';

import style from './Exchanger.module.css';

export const Exchanger = (): JSX.Element => {
  const currency = useAppSelector(state => state.currency);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sell, setSell] = useState('');
  const [buyValue, setBuyValue] = useState('');
  const [sellValue, setSellValue] = useState('0');
  const valueArr = currency.map(el => el.Cur_Abbreviation);

  useEffect(() => {
    dispatch(getDataThunk());
  }, [dispatch]);
  const handleSellChange = (event: SelectChangeEvent): void => {
    setSell(event.target.value as string);
  };
  const onChaneBuyHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setBuyValue(e.currentTarget.value);
  };
  const valuePriceBuy = currency.map(t =>
    t.Cur_Abbreviation === sell ? t.Cur_OfficialRate : null,
  );

  const newValue = (): void => {
    const num = +buyValue * valuePriceBuy.find(p => p)!;
    const newNum = num.toFixed(2);

    setSellValue(newNum);
  };
  const onClickNavigate = (): void => {
    navigate('/Currencies');
  };

  return (
    <div className={style.container}>
      <div className={style.container_box}>
        <div className={style.select_container}>
          <span className={style.span_header}>In BYN</span>
          <FormControl sx={{ width: '250px' }}>
            <InputLabel id="select-label">Select a currency</InputLabel>
            <Select
              labelId="select-label"
              label="Select a currency"
              id="select-two"
              value={sell}
              onChange={handleSellChange}
            >
              {valueArr.map((t, index) => {
                return (
                  <MenuItem key={index} value={t}>
                    {t.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className={style.input_container}>
          <TextField
            onChange={onChaneBuyHandler}
            className={style.input}
            label="Enter..."
            variant="outlined"
          />
          <span className={style.span}>{sellValue}</span>
          <Button onClick={newValue} variant="text">
            Exchange
          </Button>
        </div>
      </div>
      <Button
        onClick={onClickNavigate}
        className={style.button}
        sx={{ borderRadius: '15px', marginTop: '30px' }}
        variant="contained"
      >
        Back
      </Button>
    </div>
  );
};
