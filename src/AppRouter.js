import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/home/Home'
import Gestor from './components/getor/Gestor';
import FormGestor from './components/getor/form-cadastro/FormGestor';

function AppRouter() {
  return (
    <Router>
        <Routes>
          <Route path="/*" element={<Home></Home>} />
          {/* Gestor */}
          <Route path="/gestor/" element={<Gestor />} />
          <Route path="/gestor/edit/:id" element={<FormGestor isEditMode={true} />} />
          <Route path="/gestor/create" element={<FormGestor isEditMode={false} />} />

        </Routes>
    </Router>
  );
}

export default AppRouter;
