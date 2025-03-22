import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Header logoSrc="/logo.svg" lema="Tu destino ideal para reservas" />
      <Main />
    </div>
  );
}

export default App;
