import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/home/Home'
import Gestor from './components/getor/Gestor';
import FormGestor from './components/getor/form-cadastro/FormGestor';
import Metas from './components/metas/Metas';
import Equipe from './components/equipe/Equipe'
import Colaborador from './components/colaborador/Colaborador'
import FormColaborador from './components/colaborador/form-cadastro/FormColaborador';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home></Home>} />

        {/* Gestor */}
        <Route path="/gestor/" element={<Gestor />} />
        <Route path="/gestor/edit/:id" element={<FormGestor isEditMode={true} />} />
        <Route path="/gestor/create" element={<FormGestor isEditMode={false} />} />

        {/* Metas */}
        <Route path="/metas/" element={<Metas />} />

        {/* Equipe */}
        <Route path="/equipe/" element={<Equipe />} />

        {/* Equipe */}
        <Route path="/colaborador/" element={<Colaborador />} />
        <Route path="/colaborador/edit/:id" element={<FormColaborador isEditMode={true} />} />
        <Route path="/colaborador/create" element={<FormColaborador isEditMode={false} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
