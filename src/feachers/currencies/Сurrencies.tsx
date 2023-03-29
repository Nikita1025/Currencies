import React, {useEffect, useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import style from './Currencies.module.css'
import {useAppDispatch, useAppSelector} from "../../store/store";
import {getDataThunk} from "../../store/reducer/currenciesReducer";
import {Button, InputLabel} from "@mui/material";
import {useNavigate} from "react-router-dom";
export const Currencies = () => {
    const currency = useAppSelector(state => state.currency)
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const [buy, setBuy] = useState('');
    const [sell, setSell] = useState('');
    useEffect(() => {
        dispatch(getDataThunk())
    }, [])
    const handleBuyChange = (event: SelectChangeEvent) => {
        setBuy(event.target.value as string);
    };
    const handleSellChange = (event: SelectChangeEvent) => {
        setSell(event.target.value as string);
    };
    const valueArr = currency.map(el => el.Cur_Abbreviation  )
    const valuePriceBuy= currency.map(t=> t.Cur_Abbreviation === buy ? t.Cur_OfficialRate: '')
    const valuePriceSell= currency.map(t=> t.Cur_Abbreviation === sell ? t.Cur_OfficialRate: '')

    const onClickNavigate=()=>{
        navigate('/exchanger')
    }
    return (
        <div className={style.container}>
            <div className={style.container_box}>
                <div className={style.select_container}>
                    <FormControl sx={{width: '250px'}}>
                        <InputLabel id="select-label">Select a currency</InputLabel>
                        <Select
                            labelId="select-label"
                            label="Select a currency"
                            id='select-one'
                            value={buy}
                            onChange={handleBuyChange}
                        >
                            {valueArr.map(t => {
                                return <MenuItem value={t}>{t.toUpperCase()}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <FormControl sx={{width: '250px'}}>
                        <InputLabel id="select-label">Select a currency</InputLabel>
                        <Select
                            labelId="select-label"
                            label="Select a currency"
                            id='select-two'
                            value={sell}
                            onChange={handleSellChange}
                        >
                            {valueArr.map(t => {
                                return <MenuItem value={t}>{t.toUpperCase()}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className={style.span_container}>
                    <span className={style.span} >BYN: {valuePriceBuy.map(p=>p)}</span>
                    <span className={style.span} >BYN: {valuePriceSell.map(p=>p)}</span>
                </div>
            </div>
            <Button onClick={onClickNavigate} className={style.button} sx={{borderRadius: '15px', marginTop:'30px'}} variant="contained">Exchange</Button>
        </div>

    );
};

