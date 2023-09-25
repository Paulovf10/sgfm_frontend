import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GestorEdit(props) {
  const { id } = useParams();
  const [gestor, setGestor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGestor = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/gestor/retrieve/${id}/`);
        setGestor(response.data);
        console.error(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar detalhes do gestor", error);
        if (error.response) {
          console.error('Detalhes do erro:', error.response.data);
        }
      }
    };
    fetchGestor();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGestor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const dataToSend = { ...gestor };
      delete dataToSend.foto;
      
      await axios.put(`http://localhost:8000/gestor/update/${id}/`, dataToSend); // Aqui estamos enviando dataToSend e não gestor

      alert('Gestor atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar o gestor", error);
    }
  };

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Gestor</h2>
      <form>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={gestor.nome} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={gestor.email} onChange={handleInputChange} />
        </div>
        {/* Adicione outros campos conforme necessário... */}
        <button type="button" onClick={handleSave}>Salvar</button>
      </form>
    </div>
  );
}

export default GestorEdit;
