import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, InputLabel, TextField} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useAppDispatch, useAppSelector} from "../../store/store";
import style from "./Exchanger.module.css";
import {getDataThunk} from "../../store/reducer/currenciesReducer";
import {useNavigate} from "react-router-dom";

export const Exchanger = () => {
    const currency = useAppSelector(state => state.currency)
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
    const [sell, setSell] = useState('');
    const [buyValue, setBuyValue] = useState('');
    const [sellValue, setSellValue] = useState('0');
    const valueArr = currency.map(el => el.Cur_Abbreviation  )
    useEffect(() => {
        dispatch(getDataThunk())
    }, [])
    const handleSellChange = (event: SelectChangeEvent) => {
        setSell(event.target.value as string);
    };
    const onChaneBuyHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setBuyValue(e.currentTarget.value)
    }
    const valuePriceBuy= currency.map(t=> t.Cur_Abbreviation === sell ? t.Cur_OfficialRate: null)

    const newValue=()=>{
        const num = +buyValue * valuePriceBuy.find(p=>p)!
        const newNum= num.toFixed(2)
        setSellValue(newNum)
    }
    const onClickNavigate=()=>{
        navigate('/')
    }
    return (
        <div className={style.container}>
            <div className={style.container_box}>
                <div className={style.select_container}>
                    <span className={style.span_header}>In BYN</span>
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
                                return <MenuItem  value={t}>{t.toUpperCase()}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
                <div className={style.input_container}>
                    <TextField onChange={onChaneBuyHandler} className={style.input} label="Outlined" variant="outlined" />
                    <span className={style.span}>{sellValue}</span>
                    <Button onClick={newValue} variant="text">Exchange</Button>
                </div>

            </div>
            <Button onClick={onClickNavigate} className={style.button} sx={{borderRadius: '15px', marginTop:'30px'}} variant="contained">Back</Button>

        </div>

    );
};

