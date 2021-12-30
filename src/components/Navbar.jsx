import React, {useState, useEffect} from 'react';
import {Button, Menu, Typography, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import {HolderOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, HomeOutlined} from '@ant-design/icons';
import icon from '../images/cryptocurrency.png';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
  
    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      if (screenSize <= 768) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [screenSize]);

    return (
        <div className='nav-container'>
            <div className='logo-container'>
                <Typography.Title level={2} className='logo'>
                    <Link to={"/"} className='logo-name'>Cryptosite</Link>
                </Typography.Title>
                <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
                    <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (
                <Menu className='nav-menu'>
                <Menu.Item icon={<HomeOutlined className='icon'/>} className='menu-item'>
                    <Link to="/" className='name'>Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />} className='menu-item'>
                    <Link to="/cryptocurrencies" className='name'>Cryptocurrencies</Link>
                </Menu.Item>
                {/* <Menu.Item icon={<MoneyCollectOutlined />} className='menu-item'>
                    <Link to="/exchanges" className='name'>Exchanges</Link>
                </Menu.Item> */}
                <Menu.Item icon={<BulbOutlined />} className='menu-item'>
                    <Link to="/news" className='name'>News</Link>
                </Menu.Item>
            </Menu>
            )}
        </div>
    )
}

export default Navbar
