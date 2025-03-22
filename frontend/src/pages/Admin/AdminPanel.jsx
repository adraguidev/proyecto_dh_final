import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="admin-container">
        <h1>Panel de Administración</h1>

        <div className="admin-actions">
          <Link to="/admin/agregar-producto" className="admin-button">
            Agregar producto
          </Link>
          {/* Aquí se pueden agregar más botones para otras acciones administrativas */}
        </div>

        <div className="admin-content">
          {/* Aquí se puede mostrar contenido adicional del panel de administración */}
          <p>
            Bienvenido al panel de administración. Seleccione una acción para
            continuar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
