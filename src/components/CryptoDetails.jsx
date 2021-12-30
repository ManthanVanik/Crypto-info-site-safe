import React, { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select, Avatar } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import { useGetExchangesQuery } from '../services/cryptoApi';

import LineChart from './LineChart';
import Loader from './Loader';
// import Exchanges from './Exchanges';

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, settimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const { data: exchangeData, isFetching: isFetching2} = useGetExchangesQuery({coinId, count:10});
  const exchangesList = exchangeData?.data?.exchanges;

  const cryptoDetails = data?.data?.coin;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  if (isFetching || isFetching2) return <Loader />;

  // console.log(coinId);
  // console.log(cryptoDetails);

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails.supply.total && millify(cryptoDetails.supply.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails.supply.circulating && millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  // console.log(data);
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title className='coin-name' level={2}>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
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

      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 {cryptoDetails.name} exchanges</Title>
        <Title level={4} className='show-more'><Link to={`/exchanges/${coinId}`} className='show-more-in'>Show More</Link></Title>
      </div>
      <Row className='exchange-c'>
        <Col span={6} className='exchanges-heading'>Exchanges</Col>
        <Col span={6} className='exchanges-heading'>24h Trade Volume</Col>
        <Col span={6} className='exchanges-heading'>Markets</Col>
        <Col span={6} className='exchanges-heading'>Recommended</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Row key={exchange.id} className='exchange-c'>
              <Col span={6} className='exchange-detail'>
                <Row>
                  <Col xs={4} sm={4} md={4} lg={4} xl={4} className='exchange-detail'><Text><strong>{exchange.rank}.</strong></Text></Col>
                  <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                    <Row>
                      <Col xs={24} lg={8} className='exchange-detail'><Avatar className="exchange-image" src={exchange.iconUrl} /></Col>
                      <Col xs={24} lg={16} className='exchange-name'><Text><strong>{exchange.name}</strong></Text></Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col span={6} className='exchange-detail'>${millify(exchange["24hVolume"])}</Col>
              <Col span={6} className='exchange-detail'>{millify(exchange.numberOfMarkets)}</Col>
              <Col span={6} className='exchange-detail'>{exchange.recommended ? <CheckOutlined /> : <StopOutlined />}</Col>
            </Row>
          </Col>
        ))}
      </Row>

      <Title level={2} className='coin-details-heading'>
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