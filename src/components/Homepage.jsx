import React from 'react';
import millify from 'millify';
import {Typography, Row, Col, Statistic} from 'antd';
import {Link} from 'react-router-dom';

import Loader from './Loader';

import {useGetCryptosQuery } from '../services/cryptoApi';

import { Cryptocurrencies, News} from '../components';

const {Title} = Typography;

const Homepage = () => {
    const {data, isFetching} = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    // console.log(data);
    
    if(isFetching) return <Loader />; 

    return (
        <>
            <Title level={2} className='heading'>Global Crypto Status</Title>
            <Row className='home-stat'>
                <Col xs={12} lg={8} className='stat'><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col xs={12} lg={8} className='stat'><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col xs={12} lg={8} className='stat'><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col xs={12} lg={8} className='stat'><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col xs={12} lg={8} className='stat'><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
                <Title level={4} className='show-more'><Link to="/cryptocurrencies" className='show-more-in'>Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            <div className='home-heading-container'>
                <Title level={2} className='home-title'>Latest Crypto News</Title>
                <Title level={4} className='show-more'><Link to="/news" className='show-more-in'>Show More</Link></Title>
            </div>
            <News simplified/>
        </>
    )
}

export default Homepage
