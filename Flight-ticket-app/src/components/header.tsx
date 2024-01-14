import React from 'react';
import '../styles/header.scss'

const Header: React.FC = () => {
  return (
    <div className='header'>
        <img className='logo' src='../image/logo.png' alt='Logo' />
        <p className="title">Поиск авиабилетов</p>
    </div>
  );
};

export default Header;
