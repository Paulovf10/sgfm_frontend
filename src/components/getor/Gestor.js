import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../sidebar/Sidebar";
import './Gestor.css'

function Gestor() {
    const [gestors, setGestors] = useState([]);
    const [selectedGestor, setSelectedGestor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGestors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/list/');
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
                await axios.delete(`http://localhost:8000/user/delete/${id}/`);
                setGestors(gestors.filter(g => g.id !== id));
            } catch (error) {
                console.error("Erro ao deletar o gestor", error);
            }
        }
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="content">
                <div className="cadastrar-gestor">
                    <button className="botao-cadastra-gestor" onClick={() => {
                        navigate('/gestor/create');
                    }}>
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
                                        <span onClick={() => {
                                            setSelectedGestor(gestor);
                                        }} style={{ cursor: 'pointer' }}>
                                            {gestor.name}
                                        </span>
                                    </td>
                                    <td>{gestor.email}</td>
                                    <td>
                                        <button className='editar' onClick={() => {
                                            navigate(`/gestor/edit/${gestor.id}`);
                                        }}>Editar</button>
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
                        <p>Nome: {selectedGestor.name}</p>
                        <p>Email: {selectedGestor.email}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gestor;
