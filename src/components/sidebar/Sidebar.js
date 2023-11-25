import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userToken');
  const userName = localStorage.getItem('name');
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('name');
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <div className="sidebar">
      {userName && (
        <div className="user-info">
          <img src='/user.png' alt="User" className="user-icon" />
          <span className="user-name">{userName}</span>
        </div>
      )}

      <div className="sidebar-buttons">
        <button onClick={() => navigate('/home')}>Home</button>
        
        {userType === '2' && (
          <>
            <button onClick={() => navigate('/gestor')}>Gestor</button>
            <button onClick={() => navigate('/colaborador')}>Colaborador</button>
            <button onClick={() => navigate('/equipe')}>Equipe</button>
          </>
        )}

        <button onClick={() => navigate('/metas')}>Metas</button>
        <button onClick={() => navigate('/relatorio')}>Relatório</button>
      </div>

      <button className='sair' onClick={handleLogoutClick}>Sair</button>

      {showLogoutConfirmation && (
        <div className="logout-confirmation">
          <p>Tem certeza de que deseja sair?</p>
          <button onClick={confirmLogout}>Sim</button>
          <button onClick={cancelLogout}>Não</button>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
