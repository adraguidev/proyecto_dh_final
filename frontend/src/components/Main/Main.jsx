import React from 'react';
import './Main.css';

const Main = () => {
  return (
    <main className="main">
      <div className="container">
        <section className="search-container">
          <h2>Busca tu próxima reserva</h2>
          {/* Aquí irá el buscador en futuras implementaciones */}
        </section>

        <section className="categories-container">
          <h2>Categorías</h2>
          {/* Aquí irán las categorías de productos en futuras implementaciones */}
        </section>

        <section className="recommendations-container">
          <h2>Recomendaciones</h2>
          {/* Aquí irán las recomendaciones de productos en futuras implementaciones */}
        </section>
      </div>
    </main>
  );
};

export default Main;
