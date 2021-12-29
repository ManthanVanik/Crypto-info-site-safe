import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';

import LineChart from './LineChart';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, settimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  if (isFetching) return <Loader />;

  // console.log(coinId);
  // console.log(cryptoDetails);

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails.totalSupply && millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails.circulatingSupply && millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
  ];

  // console.log(data);
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title className='coin-name' level={2}>
          {cryptoDetails.name} ({cryptoDetails.slug}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => settimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />
    
        <Row>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className='coin-details'>
            <Title level={3} className='coin-details-heading'>{cryptoDetails.name} Value Statistics</Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
            {stats.map(({ icon, title, value }) => (
              <Row className='coin-link'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>
                  {value}
                </Text>
              </Row>
            ))}
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} className='coin-details'>
            <Title level={3} className='coin-details-heading'>Other Statistics</Title>
            <p>An overview shoving the stats of all Cryptocurrrencies.</p>
            {genericStats.map(({ icon, title, value }) => (
              <Row className='coin-link'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>
                  {value}
                </Text>
              </Row>
            ))}
          </Col>
        </Row>

      {cryptoDetails.description && (
      <Row>
        <Title level={2} className='coin-details-heading'>{cryptoDetails.name}</Title>
        <Title level={5}>{HTMLReactParser(cryptoDetails.description)}</Title>
      </Row>)}

      <Title level={3} className='coin-details-heading'>
        {cryptoDetails.name} Links
      </Title>
      {cryptoDetails.links.map((link) => (
        <Row className='coin-link' key={link.name}>
          <Title level={5} className='link-name'>
            {link.type}
          </Title>
          <a href={link.url} target='_blank' rel="noreferrer">
            {link.name}
          </a>
        </Row>
      ))}

    </Col>
  )
}

export default CryptoDetails