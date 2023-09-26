import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './Gestor.css'

function Gestor() {
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
        navigate(`/gestor/edit/${id}`); // Usando o hook para navegar para a página de edição
    };

    const handleClickBotaoGestor = () => {
        navigate('/gestor/create')
    }

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="content">
                <div className="cadastrar-gestor">
                    <button className="botao-cadastra-gestor" onClick={handleClickBotaoGestor}>
                        Cadastrar Gestor
                    </button>
                </div>

                {gestors.length ? (
                    <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gestors.map((gestor) => (
                            <tr key={gestor.id}>
                                <td>
                                    <span onClick={() => handleDetails(gestor)} style={{ cursor: 'pointer' }}>
                                        {gestor.nome}
                                    </span>
                                </td>
                                <td>{gestor.email}</td>
                                <td>
                                    <button className='editar' onClick={() => handleEdit(gestor.id)}>Editar</button>
                                    <button className='deletar' onClick={() => handleDelete(gestor.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (<></>)}
                
                {selectedGestor && (
                    <div>
                        <h2>Detalhes do Gestor</h2>
                        <p>Nome: {selectedGestor.nome}</p>
                        <p>Email: {selectedGestor.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gestor;
