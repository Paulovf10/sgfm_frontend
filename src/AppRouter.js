import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/home/Home'
import Gestor from './components/getor/Gestor';
import FormGestor from './components/getor/form-cadastro/FormGestor';
import Metas from './components/metas/Metas';
import Equipe from './components/equipe/Equipe'
import Colaborador from './components/colaborador/Colaborador'
import FormColaborador from './components/colaborador/form-cadastro/FormColaborador';
import FormMeta from './components/metas/form-meta/FormMeta';
import FormEquipe from './components/equipe/form-cadastro/FormEquipe';
import AssignMeta from './components/metas/assign-meta/assigin-meta';
import TrackMeta from './components/metas/track-meta/track-meta';
import Relatorios from './components/relatorio/relatorio'
import GeraRelatorios from './components/relatorio/gera-relatorio/gera-relatorio'
import Login from './components/login';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Home></Home>} />
        <Route path="/login" element={<Login></Login>} />

        {/* Gestor */}
        <Route path="/gestor/" element={<Gestor />} />
        <Route path="/gestor/edit/:id" element={<FormGestor isEditMode={true} />} />
        <Route path="/gestor/create" element={<FormGestor isEditMode={false} />} />

        {/* Metas */}
        <Route path="/metas/" element={<Metas />} />
        <Route path="/metas/edit/:id" element={<FormMeta isEditMode={true} />} />
        <Route path="/metas/create" element={<FormMeta isEditMode={false} />} />
        <Route path="/metas/assign" element={<AssignMeta />} /> 
        <Route path="/metas/track" element={<TrackMeta />} /> 

        {/* Equipe */}
        <Route path="/equipe/" element={<Equipe />} />
        <Route path="/equipe/create" element={<FormEquipe isEditMode={false}/>}/>
        <Route path="/equipe/edit/:id" element={<FormEquipe isEditMode={true} />} />

        {/* Colaborador */}
        <Route path="/colaborador/" element={<Colaborador />} />
        <Route path="/colaborador/edit/:id" element={<FormColaborador isEditMode={true} />} />
        <Route path="/colaborador/create" element={<FormColaborador isEditMode={false} />} />

                {/* Relatorio */}
                <Route path="/relatorio/" element={<Relatorios />} />
                <Route path="/gera-relatorio/" element={<GeraRelatorios />} />


      </Routes>
    </Router>
  );
}

export default AppRouter;
