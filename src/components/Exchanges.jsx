import React, {useState, useEffect} from 'react'
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { Collapse, Row, Col, Typography, Avatar, Pagination} from 'antd';
import { StopOutlined, CheckOutlined } from '@ant-design/icons';

import Loader from './Loader';

import { useGetCryptoDetailsQuery, useGetExchangesQuery} from '../services/cryptoApi';

const { Title, Text } = Typography;

const Exchanges = () => {
  const { coinId } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: exchangeData, isFetching: isFetching2} = useGetExchangesQuery({coinId, count:100});
  const cryptoDetails = data?.data?.coin;
  const exchangesList = exchangeData?.data?.exchanges;

  const pageSize = 10;
  const [dataExchange, setdataExchange] = useState()
  const [current, setcurrent] = useState(1)
  const [minIndex, setminIndex] = useState(0)
  const [maxIndex, setmaxIndex] = useState(0)  

  useEffect(() => {
      setdataExchange(exchangesList);
      setminIndex(0);
      setmaxIndex(pageSize);
  }, [exchangesList])

if (isFetching || isFetching2) return <Loader />;

  return (
    <>
      <Title level={2} className='exchanges-heading'>
        All {cryptoDetails.name} exchanges
      </Title>
      <Row className='exchange-c'>
        <Col span={6} className='exchanges-heading'>Exchanges</Col>
        <Col span={6} className='exchanges-heading'>24h Trade Volume</Col>
        <Col span={6} className='exchanges-heading'>Markets</Col>
        <Col span={6} className='exchanges-heading'>Recommended</Col>
      </Row>
      <Row>
        {dataExchange?.map((exchange,index) => (
          index >= minIndex &&
          index < maxIndex &&
          (<Col span={24}>
            <Row key={exchange.id} className='exchange-c'>
              <Col span={6} className='exchange-detail'>
                <Row>
                  <Col xs={7} sm={6} md={6} lg={4} xl={4} className='exchange-detail'><Text><strong>{exchange.rank}.</strong></Text></Col>
                  <Col xs={17} sm={18} md={18} lg={20} xl={20}>
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
          </Col>)
        ))}
      </Row>
      <Pagination
          className='pagination'
          pageSize={pageSize}
          current={current}
          total={exchangesList.length}
          showSizeChanger= {false}
          onChange={
            (page) => {
              setcurrent(page);
              setminIndex((page-1)*pageSize);
              setmaxIndex(page*pageSize);
            }
          }
        />
    </>
  );
};

export default Exchanges;



// import React from 'react';
// import millify from 'millify';
// import { Collapse, Row, Col, Typography, Avatar } from 'antd';
// import HTMLReactParser from 'html-react-parser';
// import { motion } from "framer-motion"

// import { useGetExchangesQuery } from '../services/cryptoApi';

// import Loader from './Loader';

// const { Text } = Typography;
// const { Panel } = Collapse;

// const Exchanges = () => {
//   const { data, isFetching } = useGetExchangesQuery();
//   const exchangesList = data?.data?.exchanges;

//   if (isFetching) return <Loader />;

//   return (
//     <>
//       <Row>
//         <Col span={6} className='exchanges-heading'>Exchanges</Col>
//         <Col span={6} className='exchanges-heading'>24h Trade Volume</Col>
//         <Col span={6} className='exchanges-heading'>Markets</Col>
//         <Col span={6} className='exchanges-heading'>Change</Col>
//       </Row>
//       <Row>
//         {exchangesList.map((exchange) => (
//           <Col span={24}>
//             <motion.div
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}>
//               <Collapse >
//                 <Panel
//                   className='collapse'
//                   key={exchange.id}
//                   showArrow={false}
//                   header={(
//                     <Row key={exchange.id} className='panel'>
//                       <Col span={6} className='exchange-detail'>
//                         <Row>
//                           <Col xs={4} sm={4} md={4} lg={4} xl={4} className='exchange-detail'><Text><strong>{exchange.rank}.</strong></Text></Col>
//                           <Col xs={20} sm={20} md={20} lg={20} xl={20}>
//                             <Row>
//                               <Col xs={24} lg={8} className='exchange-detail'><Avatar className="exchange-image" src={exchange.iconUrl} /></Col>
//                               <Col xs={24} lg={16} className='exchange-name'><Text><strong>{exchange.name}</strong></Text></Col>
//                             </Row>
//                           </Col>
//                         </Row>
//                       </Col>
//                       <Col span={6} className='exchange-detail'>${millify(exchange.volume)}</Col>
//                       <Col span={6} className='exchange-detail'>{millify(exchange.numberOfMarkets)}</Col>
//                       <Col span={6} className='exchange-detail'>{millify(exchange.marketShare)}%</Col>
//                     </Row>
//                   )}>
//                   <p className='panel-text'>{HTMLReactParser(exchange.description || '')}</p>
//                 </Panel>
//               </Collapse>
//             </motion.div>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default Exchanges;