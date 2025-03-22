import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header logoSrc="/logo.svg" lema="Tu destino ideal para reservas" />
      <div className="content">
        <h1>Bienvenido a nuestro sistema de reservas</h1>
        <p>Aquí podrás encontrar las mejores opciones para tus necesidades.</p>
      </div>
    </div>
  );
}

export default App;
