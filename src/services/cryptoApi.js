import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl = "";
const createRequest = (url) => (url)

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),    
    getExchanges: builder.query({
      query: ({coinId, count}) => createRequest(`/exchange?id=${coinId}&count=${count}`)
    }),    
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin?id=${coinId}`)
    }),    
    getCryptoHistory: builder.query({
      query: ({coinId, timeperiod}) => createRequest(`/history?id=${coinId}&time=${timeperiod}`)
    }),
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/cnews?q=${newsCategory}&count=${count}`)
    })    
  })
})

export const {
  useGetCryptosQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery,useGetCryptoNewsQuery,
} = cryptoApi;