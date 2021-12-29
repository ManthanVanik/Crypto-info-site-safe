import {configureStore} from '@reduxjs/toolkit'

import {cryptoApi} from '../services/cryptoApi';
// import {cryptoApi} from '../../public/cryptoApi';

export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]: cryptoApi.reducer
    },
});