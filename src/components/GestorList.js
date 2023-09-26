import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importação adicional

function GestorList() {
  const [gestors, setGestors] = useState([]);
  const [selectedGestor, setSelectedGestor] = useState(null);
  const navigate = useNavigate();  // Hook de navegação

  useEffect(() => {
    const fetchGestors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/gestor/list/');
        setGestors(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar os gestores", error);
      }
    };
    fetchGestors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Deseja deletar este gestor?')) {
      try {
        await axios.delete(`http://localhost:8000/gestor/delete/${id}/`);
        setGestors(gestors.filter(g => g.id !== id));
      } catch (error) {
        console.error("Erro ao deletar o gestor", error);
      }
    }
  };

  const handleDetails = (gestor) => {
    setSelectedGestor(gestor);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); // Usando o hook para navegar para a página de edição
  };

  return (
    <div>
      {gestors.map(gestor => (
        <div key={gestor.id}>
          <span onClick={() => handleDetails(gestor)} style={{ cursor: 'pointer' }}>
            {gestor.nome}
          </span>
          <button onClick={() => handleEdit(gestor.id)}>Editar</button>
          <button onClick={() => handleDelete(gestor.id)}>Deletar</button>
        </div>
      ))}
      
      {selectedGestor && (
        <div>
          <h2>Detalhes do Gestor</h2>
          <p>Nome: {selectedGestor.nome}</p>
          <p>Email: {selectedGestor.email}</p>
        </div>
      )}
    </div>
  );
}

export default GestorList;
