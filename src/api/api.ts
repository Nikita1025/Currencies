import axios from 'axios';
export const CurrenciesAPI = {
  getData() {
    return axios.get('https://www.nbrb.by/api/exrates/rates?periodicity=0');
  },
};
