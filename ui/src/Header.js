import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
  <header className="App-header">
    <Link to='/'>
      <img src={process.env.PUBLIC_URL + '/img/grandstack.png'} className="App-logo" alt="logo" />
    </Link>
    <h1 className="App-title">Welcome to GRANDstack</h1>
  </header>
)

export default Header;
