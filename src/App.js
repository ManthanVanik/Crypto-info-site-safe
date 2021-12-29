import React from 'react';
import { Routes, Route, Link, } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Exchanges, Homepage, Cryptocurrencies, CryptoDetails, News, NotFound} from './components';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout className='layout'>
          <div className='routes'>
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
              <Route element={<NotFound />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            CryptoSite <br />
            All rights reserved.
          </Typography.Title>
          <Space >
            <Link to="/" className='footer-link'>Home</Link>
            <Link to="/cryptocurrencies" className='footer-link'>Cryptocurrencies</Link>
            <Link to="/exchanges" className='footer-link'>Exchanges</Link>
            <Link to="/news" className='footer-link'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App;

