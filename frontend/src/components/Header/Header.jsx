import React from 'react';
import './Header.css';

const Header = ({ logoSrc, lema }) => {
  return (
    <header className="header">
      <div className="header-left">
        <a href="/" className="logo-container">
          <img src={logoSrc} alt="Logo" className="logo" />
          <span className="lema">{lema}</span>
        </a>
      </div>
      <div className="header-right">
        <button className="btn-crear-cuenta">Crear cuenta</button>
        <button className="btn-iniciar-sesion">Iniciar sesión</button>
      </div>
    </header>
  );
};

export default Header;
