import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GestorForm from './components/GestorForm';
import GestorList from './components/GestorList';
import GestorEdit from './components/GestorEdit';  // Importe o novo componente aqui

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/create" element={<GestorForm />} />
          <Route path="/list" element={<GestorList />} />
          <Route path="/edit/:id" element={<GestorEdit />} />  {/* Adicione esta nova rota */}
        </Routes>
        {/* Você pode adicionar um link ou navbar aqui para navegação, se desejar. */}
      </div>
    </Router>
  );
}

export default App;
