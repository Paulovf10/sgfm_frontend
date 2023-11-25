import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // Importe o componente ProtectedRoute


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
import LoginScreen from './components/login/Login';
import ExibirRelatorio from './components/relatorio/exibir-relatorio/exibir-relatorio';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        
        {/* Gestor */}
        <Route path="/gestor/" element={<ProtectedRoute><Gestor /></ProtectedRoute>} />
        <Route path="/gestor/edit/:id" element={<ProtectedRoute><FormGestor isEditMode={true} /></ProtectedRoute>} />
        <Route path="/gestor/create" element={<ProtectedRoute><FormGestor isEditMode={false} /></ProtectedRoute>} />

        {/* Metas */}
        <Route path="/metas/" element={<ProtectedRoute><Metas /></ProtectedRoute>} />
        <Route path="/metas/edit/:id" element={<ProtectedRoute><FormMeta isEditMode={true} /></ProtectedRoute>} />
        <Route path="/metas/create" element={<ProtectedRoute><FormMeta isEditMode={false} /></ProtectedRoute>} />
        <Route path="/metas/assign" element={<ProtectedRoute><AssignMeta /></ProtectedRoute>} />
        <Route path="/metas/track" element={<ProtectedRoute><TrackMeta /></ProtectedRoute>} />

        {/* Equipe */}
        <Route path="/equipe/" element={<ProtectedRoute><Equipe /></ProtectedRoute>} />
        <Route path="/equipe/create" element={<ProtectedRoute><FormEquipe isEditMode={false}/></ProtectedRoute>} />
        <Route path="/equipe/edit/:id" element={<ProtectedRoute><FormEquipe isEditMode={true} /></ProtectedRoute>} />

        {/* Colaborador */}
        <Route path="/colaborador/" element={<ProtectedRoute><Colaborador /></ProtectedRoute>} />
        <Route path="/colaborador/edit/:id" element={<ProtectedRoute><FormColaborador isEditMode={true} /></ProtectedRoute>} />
        <Route path="/colaborador/create" element={<ProtectedRoute><FormColaborador isEditMode={false} /></ProtectedRoute>} />

        {/* Relatorio */}
        <Route path="/relatorio/" element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
        <Route path="/gera-relatorio/" element={<ProtectedRoute><GeraRelatorios /></ProtectedRoute>} />
        <Route path="/exibe-relatorio/:id" element={<ProtectedRoute><ExibirRelatorio /></ProtectedRoute>} />

        {/* Redireciona para login se nenhuma rota corresponder */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
